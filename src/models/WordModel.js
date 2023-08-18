import { configure, observable } from "mobx";

// state can only be changed inside @action methods
configure({ enforceActions: "observed" });

class WordModel {

  // string representing the word
  @observable word;

  // found becomes true only after the user locates and
  // highlights the word in the grid
  @observable found = false;

  constructor(word) {
    this.word = word;
  }
}

export default WordModel;