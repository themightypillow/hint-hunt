import { configure, observable, action } from "mobx";
import database from "../firebase/firebase";
import ModalModel from "./ModalModel";
import WordModel from "./WordModel";
import BoardModel from "./BoardModel";
import { hideClues } from "../helpers/main";

// state can only be changed inside @action methods
configure({ enforceActions: "observed" });

class HintHuntModel {

  // the BoardModel object responsible for handling user interactions
  // with the grid
  @observable board;

  // object with keys as clue descriptions and values as answers to the description as
  // WordModel objects
  @observable clues = {};

  // the array of answers for the word search as WordModel objects
  @observable words = [];

  @observable title = "";

  // the ModalModel object responsible for displaying correct information
  // during endgame and when the user is selecting a new word search
  @observable modal = new ModalModel();

  @observable showWin = false;

  @observable showAnswers = false;

  // symbol for small to medium screen sizes, shown at the left of the screen
  // for collasping/showing the clues box
  @observable leftRightSymbol = "⟫";

  // symbol for x-small to small screen sizes, shown at the bottom of the screen
  // for collapsing/showing the clues box
  @observable upDownSymbol = "∧";

  /*
    Looks in the database for a word search with the given date
    Returns a promise
      date - a Date object
  */
  @action fetchPuzzle = (date) => {
    this.modal.visible = true;
    this.modal.loading = true;
    this.modal.date = date;
    // dates in the database are in the format [M]M-[D]D-YYYY
    const dateString = date.toLocaleDateString("en-US").replace(/\//g, "-");
    return database.ref(dateString).once("value");
  }

  /*
    Sets the word search based on what was returned from the database if anything
      snapshot - the object returned from firebase
  */
  @action setPuzzle = (snapshot) => {
    this.modal.date = new Date(snapshot.key.replace(/-/g, "/"));
    if(snapshot.exists()) {
      this.showAnswers = false;
      const data = snapshot.val();
      this.modal.setHeading(data.title);
      this.modal.buttonDisabled = false;
      this.words.length = 0;
      this.clues = this.setClues(data.clues);
      this.board = new BoardModel(data.grid, this.words);
      this.title = data.title;
      this.showWin = false;
    }
    else { // nothing in the database with the original date given
      this.modal.setHeading("No Puzzle");
      this.modal.buttonDisabled = true;
    }
  }

  // Converts the clues data received from firebase into something
  // trackable by mobx
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
    // makes sure the win screen isn't shown after the user already won
    if(this.board.win && !this.showWin) {
      this.showWin = true;
      hideClues();
      this.resetArrows();
      this.showAnimation(1500);
    }
  }

  /* 
    Animates the win screen and then shows the modal to the user after a set
    time passes
      ms - the number of milliseconds until the modal shows up
  */
  @action showAnimation = (ms) => {
    let animateScreen = document.querySelector(".hinthunt_animate");
    animateScreen.classList.add("hinthunt_animate-on", "animated", "zoomIn", "hinthunt_animate-visible");
    setTimeout(() => {
      animateScreen.classList.remove("animated", "zoomIn");
      animateScreen.classList.add("animated", "fadeOut");
      this.modal.showCalendar();
    }, ms);
  }

  // Fires when the user clicks the Show Words/Hide Words button
  @action toggleAnswers = () => {
    this.showAnswers = !this.showAnswers;
  }

  // Only fires on small screens
  @action switchArrows = () => {
    this.leftRightSymbol === "⟫"? this.leftRightSymbol = "⟪" : this.leftRightSymbol = "⟫";
    this.upDownSymbol === "∧"? this.upDownSymbol = "∨" : this.upDownSymbol = "∧";
  }

  // Fires when the user completes word search
  @action resetArrows = () => {
    this.leftRightSymbol = "⟫";
    this.upDownSymbol = "∧";
  }
}

export default HintHuntModel;