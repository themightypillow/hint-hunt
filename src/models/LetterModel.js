import { configure, observable, action } from "mobx";

// state can only be changed inside @action methods
configure({ enforceActions: "observed" });

class LetterModel {
  
  // a string representing the letter
  @observable letter;

  // the list of classes for highlighting this letter has part of it
  @observable classes = [];

  // the position of this letter on the grid
  @observable index;

  columns = 13;

  constructor(letter, index) {
    this.letter = letter;
    this.index = index;
  }

  // converts the index to [row, column]
  coords() {
    return [Math.floor(this.index / this.columns), this.index % this.columns];
  }

  @action pushClass = (name) => {
    this.classes.push(name);
  }

  @action popClass = () => {
    this.classes.pop();
  }
}

export default LetterModel;