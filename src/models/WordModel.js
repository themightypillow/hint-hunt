import { configure, observable } from "mobx";

// state can only be changed inside @action methods
configure({ enforceActions: "observed" });

class WordModel {
  @observable word;
  @observable found = false;

  constructor(word) {
    this.word = word;
  }
}

export default WordModel;