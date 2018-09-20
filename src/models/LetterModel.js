import { configure, observable, action } from "mobx";

// state can only be changed inside @action methods
configure({ enforceActions: "observed" });

class LetterModel {
  @observable letter;
  @observable classes = [];
  @observable index;
  columns = 13;

  constructor(letter, index) {
    this.letter = letter;
    this.index = index;
  }

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