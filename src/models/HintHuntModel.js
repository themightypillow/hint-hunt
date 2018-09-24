import { configure, observable, action } from "mobx";
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
  @observable showAnswers = false;

  @action fetchPuzzle = (date) => {
    this.modal.visible = true;
    this.modal.loading = true;
    this.modal.date = date;
    const dateString = date.toLocaleDateString("en-US").replace(/\//g, "-");
    return database.ref(dateString).once("value");
  }

  @action setPuzzle = (snapshot) => {
    this.modal.date = new Date(snapshot.key.replace(/-/g, "/"));
    if(snapshot.exists()) {
      this.showAnswers = false;
      const data = snapshot.val();
      this.modal.setHeading(data.title);
      this.modal.buttonDisabled = false;
      this.clues = this.setClues(data.clues);
      this.board = new BoardModel(data.grid, this.words);
      this.title = data.title;
      this.showWin = false;
    }
    else {
      this.modal.setHeading("No Puzzle");
      this.modal.buttonDisabled = true;
    }
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
    if(this.board.win && !this.showWin) {
      this.showWin = true;
      this.showAnimation(1500);
    }
  }

  @action showAnimation = (ms) => {
    let animateScreen = document.querySelector(".hinthunt_animate");
    animateScreen.classList.add("hinthunt_animate-on", "animated", "zoomIn", "hinthunt_animate-visible");
    setTimeout(() => {
      animateScreen.classList.remove("animated", "zoomIn");
      animateScreen.classList.add("animated", "fadeOut");
      this.modal.showCalendar();
    }, ms);
  }

  @action toggleAnswers = () => {
    this.showAnswers = !this.showAnswers;
  }
}

export default HintHuntModel;