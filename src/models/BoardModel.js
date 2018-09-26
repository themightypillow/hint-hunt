import { configure, action, observable } from "mobx";
import LetterModel from "./LetterModel";
import { getIndex, randomColorClass } from "../helpers/main";

// state can only be changed inside @action methods
configure({ enforceActions: "observed" });

class BoardModel {
  // the grid of letters making up the word search comprised of a 1D array
  @observable grid;

  // the array of answers for the word search as WordModel objects
  @observable words;

  // the 'chain' of letters that represents the user's current guess
  // comprised of LetterModel objects
  @observable chain = [];

  // the first letter the user clicked on, LetterModel object
  @observable initial;

  // the letter the user is hovering over currently if an initial
  // letter was clicked on, LetterModel object
  @observable hover;

  @observable isMouseDown = false;

  @observable win = false;

  constructor(grid, words) {
    this.grid = grid.map((letter, index) => new LetterModel(letter, index));
    this.words = words;
  }

  // fires once the user clicks on a letter inside the grid
  @action setInitial = (letter) => {
    this.isMouseDown = true;
    this.initial = letter;
  }

  // only fires after the initial letter is set up after the user clicks on a letter
  @action startChain = (letter) => {
    if(this.isMouseDown) {
      this.hover = letter;
      this.popChainClasses(); // undo the previous chain implemented during a mouseover
      this.chain.length = 0;
      const [row1, col1] = this.initial.coords();
      const [row2, col2] = letter.coords();
      const colorClass = randomColorClass();
      if(row1 === row2 && col1 === col2) { // hovering over initial letter
        this.makeSingleChain(colorClass);
      }
      else if(row1 === row2) { // make a horizontal chain
        this.makeChain(row1, col1, col2, false, colorClass);
      }
      else if(col1 === col2) { // make a vertical chain
        this.makeChain(col1, row1, row2, true, colorClass);
      }
      else if((row2 - row1) === (col2 - col1)) { // make a backward diagonal chain
        this.makeDiagonalChain(row1, row2, false, colorClass);
      }
      else if((row2 - row1) === -(col2 - col1)) { // make a forward diagonal chain
        this.makeDiagonalChain(row1, row2, true, colorClass);
      }
      else { // chain not possible with current letter hovered over
        this.makeSingleChain(colorClass);
      }
    }
  }

  @action makeSingleChain = (colorClass) => {
    this.chain.push(this.initial);
    this.initial.pushClass(`square_circle ${colorClass}`);
  }

  /*
    makes a chain for horizontal and vertical letter chains
      same       - the coordinate that all letters in the chain share
      diff1      - the changing coordinate for one end of the chain
      diff2      - the changing coordinate for the other end of the chain
      vertical   - true for vertical chains, false for horizontal chains
      colorClass - the random color chosen for this chain
  */
  @action makeChain = (same, diff1, diff2, vertical, colorClass) => {
    for(let i = Math.min(diff1, diff2); i <= Math.max(diff1, diff2); i++) {
      const coords = vertical ? [i, same] : [same, i];
      const next = this.grid[getIndex(...coords)];
      this.chain.push(next);
      next.pushClass(`${vertical ? "square_vertical" : "square_horizontal"} ${colorClass}`);
    }
  }

  /*
    makes a chain for both diagonal letter chains
      row1       - the row coordinate for one end of the chain
      row2       - the row coordinate for the other end of the chain
      forward    - true for forward diagonals, false for backward diagonals
      colorClass - the random color chosen for this chain
  */
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

  // Removes the last class given to all letters in the current chain
  popChainClasses = () => {
    for(let i = 0; i < this.chain.length; i++) {
      this.chain[i].popClass();
    }
  }

  // Fires when the user lets go of the mouse button, i.e. finishing their
  // current guess
  @action checkGuess = () => {
    this.isMouseDown = false;
    const guess = this.chain.map(letterModel => letterModel.letter).join("");
    const reverseGuess = guess.split("").reverse().join(""); // a word highlighted in reverse order is still valid
    const index = this.words.findIndex(
      wordModel => wordModel.word === guess || wordModel.word === reverseGuess
    );
    if(index !== -1) { // the word is an answer to a clue
      this.words[index].found = true;
      this.words.splice(index, 1);
    }
    else {  // the word is not an answer to any clue
      this.popChainClasses();
    }
    this.chain.length = 0; // reset the chain
    this.win = this.words.length === 0; // the word search is finished when there are no more words to be found
  }

}

export default BoardModel;