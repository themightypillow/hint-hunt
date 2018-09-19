import { observable } from "mobx";

class LetterModel {
  @observable letter;
  @observable classes = [];

  constructor(letter) {
    this.letter = letter;
  }
}

export default LetterModel;