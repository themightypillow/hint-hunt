import { configure, observable, action } from "mobx";
import moment from "moment";
import database from "../firebase/firebase";
import ModalModel from "./ModalModel";
import WordModel from "./WordModel";
import BoardModel from "./BoardModel";

// state can only be changed inside @action methods
configure({ enforceActions: "observed" });

class HintHuntModel {
  @observable board;
  @observable clues = {};
  @observable words = [];
  @observable title = "";
  @observable modal = new ModalModel();
  @observable showWin = false;

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
    this.clues = this.setClues(data.clues);
    this.board = new BoardModel(data.grid, this.words);
    this.title = data.title;
    this.showWin = false;
  }

  @action setClues = (clues) => {
    return Object.keys(clues).reduce((acc, key) => {
      acc[key] = clues[key].map(answer => {
        let word = new WordModel(answer);
        this.words.push(word);
        return word;
      });
      return acc;
    }, {});
  }

  @action checkWin = () => {
    if(this.board.win) {
      this.modal.visible = true;
      this.modal.text = "You Win!";
      this.modal.button = true;
      this.modal.buttonText = "Close";
      this.showWin = true;
    }
  }
}

export default HintHuntModel;