import { configure, action, observable } from "mobx";
import LetterModel from "./LetterModel";
import { getIndex, randomColorClass } from "../helpers/main";

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

  constructor(grid, words) {
    this.grid = grid.map((letter, index) => new LetterModel(letter, index));
    this.words = words;
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
      const colorClass = randomColorClass();
      if(row1 === row2 && col1 === col2) { // hovering over initial letter
        this.makeSingleChain(colorClass);
      }
      else if(row1 === row2) { // horizontal
        this.makeChain(row1, col1, col2, false, colorClass);
      }
      else if(col1 === col2) { // vertical
        this.makeChain(col1, row1, row2, true, colorClass);
      }
      else if((row2 - row1) === (col2 - col1)) { // backward diagonal
        this.makeDiagonalChain(row1, row2, false, colorClass);
      }
      else if((row2 - row1) === -(col2 - col1)) { // forward diagonal
        this.makeDiagonalChain(row1, row2, true, colorClass);
      }
      else { // chain not possible
        this.makeSingleChain(colorClass);
      }
    }
  }

  @action makeSingleChain = (colorClass) => {
    this.chain.push(this.initial);
    this.initial.pushClass(`square_circle ${colorClass}`);
  }

  @action makeChain = (same, diff1, diff2, vertical, colorClass) => {
    for(let i = Math.min(diff1, diff2); i <= Math.max(diff1, diff2); i++) {
      const coords = vertical ? [i, same] : [same, i];
      const next = this.grid[getIndex(...coords)];
      this.chain.push(next);
      next.pushClass(`${vertical ? "square_vertical" : "square_horizontal"} ${colorClass}`);
    }
  }

  @action makeDiagonalChain = (row1, row2, forward, colorClass) => {
    let first = row1 < row2 ? this.initial : this.hover;
    let firstCoords = first.coords();
    for(let i = 0; i <= Math.max(row1, row2) - Math.min(row1, row2); i++) {
      const next = this.grid[
        getIndex(firstCoords[0] + i, forward ? firstCoords[1] - i : firstCoords[1] + i)
      ];
      this.chain.push(next);
      next.pushClass(`${forward ? "square_forwardSlash" : "square_backSlash"} ${colorClass}`);
    }
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