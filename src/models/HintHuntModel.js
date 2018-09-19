import { configure, observable, action } from "mobx";
import moment from "moment";
import database from "../firebase/firebase";
import ModalModel from "./ModalModel";
import WordModel from "./WordModel";
import LetterModel from "./LetterModel";

// state can only be changed inside @action methods
// configure({ enforceActions: "observed" });

class HintHuntModel {
  @observable grid = [];
  @observable clues = {};
  @observable title = "";
  // @observable guess = [];
  // @observable isMouseDown = false;
  @observable modal = new ModalModel(); 

  @action fetchPuzzle = (date) => {
    this.modal.visible = true;
    this.modal.loading = true;
    this.modal.button = false;
    return database.ref(date).once("value");
  }

  @action setPuzzle = (snapshot) => {
    const data = snapshot.val();
    this.modal.text = `${moment(snapshot.key).format("MMM DD, YYYY")} - ${data.title}`;
    this.modal.button = true;
    this.modal.buttonText = "Play Now";
    this.grid = data.grid.map(letter => new LetterModel(letter));
    this.clues = this.setClues(data.clues);
    this.title = data.title;
    this.modal.loading = false;
  }

  @action setClues = (clues) => {
    return Object.keys(clues).reduce((acc, key) => {
      acc[key] = clues[key].map(answer => new WordModel(answer));
      return acc;
    }, {});
  }

  @action hideModal = () => {
    this.modal.visible = false;
  }
}

export default HintHuntModel;