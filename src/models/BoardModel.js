import { configure, action, observable } from "mobx";
import LetterModel from "./LetterModel";

// state can only be changed inside @action methods
configure({ enforceActions: "observed" });

class BoardModel {
  @observable grid;
  @observable words;
  @observable chain = [];
  @observable initial;
  @observable hover;
  @observable isMouseDown = false;
  @observable win = false;
  columns = 13;

  constructor(grid, words) {
    this.grid = grid.map((letter, index) => new LetterModel(letter, index));
    this.words = words;
  }

  getIndex(row, column) {
    return row * this.columns + column;
  }

  @action setInitial = (letter) => {
    this.isMouseDown = true;
    this.initial = letter;
  }

  @action startChain = (letter) => {
    if(this.isMouseDown) {
      this.hover = letter;
      this.popChainClasses();
      this.chain.length = 0;
      const [row1, col1] = this.initial.coords();
      const [row2, col2] = letter.coords();
      if(row1 === row2 && col1 === col2) { // hovering over initial letter
        this.makeSingleChain();
      }
      else if(row1 === row2) { // horizontal
        this.makeChain(row1, col1, col2, false);
      }
      else if(col1 === col2) { // vertical
        this.makeChain(col1, row1, row2, true);
      }
      else if((row2 - row1) === (col2 - col1)) { // backward diagonal
        this.makeDiagonalChain(row1, row2, false);
      }
      else if((row2 - row1) === -(col2 - col1)) { // forward diagonal
        this.makeDiagonalChain(row1, row2, true);
      }
      else { // chain not possible
        this.makeSingleChain();
      }
    }
  }

  @action makeSingleChain = () => {
    this.chain.push(this.initial);
    this.initial.pushClass("square_circle");
  }

  @action makeChain = (same, diff1, diff2, vertical) => {
    let first = diff1 < diff2 ? this.initial : this.hover;
    let last = diff1 < diff2 ? this.hover : this.initial;
    this.chain.push(first);
    first.pushClass(vertical ? "square_top" : "square_left");
    for(let i = Math.min(diff1, diff2) + 1; i < Math.max(diff1, diff2); i++) {
      const coords = vertical ? [i, same] : [same, i];
      const next = this.grid[this.getIndex(...coords)];
      this.chain.push(next);
      next.pushClass(vertical ? "square_topBottom" : "square_leftRight");
    }
    this.chain.push(last);
    last.pushClass(vertical ? "square_bottom" : "square_right");
  }

  @action makeDiagonalChain = (row1, row2, forward) => {
    let first = row1 < row2 ? this.initial : this.hover;
    let last = row1 < row2 ? this.hover : this.initial;
    this.chain.push(first);
    first.pushClass(forward ? "square_topRight" : "square_topLeft");
    let firstCoords = first.coords();
    for(let i = 1; i < Math.max(row1, row2) - Math.min(row1, row2); i++) {
      const next = this.grid[
        this.getIndex(firstCoords[0] + i, forward ? firstCoords[1] - i : firstCoords[1] + i)
      ];
      this.chain.push(next);
      next.pushClass(forward ? "square_forwardSlash" : "square_backSlash");
    }
    this.chain.push(last);
    last.pushClass(forward ? "square_bottomLeft" : "square_bottomRight");
  }

  popChainClasses = () => {
    for(let i = 0; i < this.chain.length; i++) {
      this.chain[i].popClass();
    }
  }

  @action checkGuess = () => {
    this.isMouseDown = false;
    const guess = this.chain.map(letterModel => letterModel.letter).join("");
    const reverseGuess = guess.split("").reverse().join("");
    const index = this.words.findIndex(
      wordModel => wordModel.word === guess || wordModel.word === reverseGuess
    );
    if(index !== -1) {
      this.words[index].found = true;
      this.words.splice(index, 1);
    }
    else {
      this.popChainClasses();
    }
    this.chain.length = 0;
    this.win = this.words.length === 0;
  }

}

export default BoardModel;