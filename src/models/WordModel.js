import { observable } from "mobx";

class WordModel {
  @observable word;
  @observable found = false;

  constructor(word) {
    this.word = word;
  }
}

export default WordModel;