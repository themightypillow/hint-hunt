import { configure, action, observable } from "mobx";
import LetterModel from "./LetterModel";

// state can only be changed inside @action methods
configure({ enforceActions: "observed" });

class BoardModel {
  @observable grid = [];
  @observable guess = [];
  @observable initial;
  @observable hover;
  @observable isMouseDown = false;
  columns = 13;

  constructor(grid) {
    this.grid = grid.map((letter, index) => new LetterModel(letter, index));
  }

  getIndex(row, column) {
    return row * this.columns + column;
  }

  @action startGuess = (letter) => {
    this.isMouseDown = true;
    this.initial = letter;
  }

  @action startChain = (letter) => {
    if(this.isMouseDown) {
      this.hover = letter;
      this.popChainClasses();
      this.guess.length = 0;
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
      console.log(this.guess.map(char => char.letter));
    }
  }

  @action makeSingleChain = () => {
    this.guess.push(this.initial);
    this.initial.pushClass("square_circle");
  }

  @action makeChain = (same, diff1, diff2, vertical) => {
    let first = diff1 < diff2 ? this.initial : this.hover;
    let last = diff1 < diff2 ? this.hover : this.initial;
    this.guess.push(first);
    first.pushClass(vertical ? "square_top" : "square_left");
    for(let i = Math.min(diff1, diff2) + 1; i < Math.max(diff1, diff2); i++) {
      const coords = vertical ? [i, same] : [same, i];
      const next = this.grid[this.getIndex(...coords)];
      this.guess.push(next);
      next.pushClass(vertical ? "square_topBottom" : "square_leftRight");
    }
    this.guess.push(last);
    last.pushClass(vertical ? "square_bottom" : "square_right");
  }

  @action makeDiagonalChain = (row1, row2, forward) => {
    let first = row1 < row2 ? this.initial : this.hover;
    let last = row1 < row2 ? this.hover : this.initial;
    this.guess.push(first);
    first.pushClass(forward ? "square_topRight" : "square_topLeft");
    let firstCoords = first.coords();
    for(let i = 1; i < Math.max(row1, row2) - Math.min(row1, row2); i++) {
      const next = this.grid[
        this.getIndex(firstCoords[0] + i, forward ? firstCoords[1] - i : firstCoords[1] + i)
      ];
      this.guess.push(next);
      next.pushClass(forward ? "square_forwardSlash" : "square_backSlash");
    }
    this.guess.push(last);
    last.pushClass(forward ? "square_bottomLeft" : "square_bottomRight");
  }

  popChainClasses = () => {
    for(let i = 0; i < this.guess.length; i++) {
      this.guess[i].popClass();
    }
  }

  @action mouseUp = () => {
    this.isMouseDown = false;
    this.popChainClasses();
    this.guess.length = 0;
  }
}

export default BoardModel;