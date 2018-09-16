import React from "react";
import SideInfo from "./SideInfo";
import Board from "./Board";
import Modal from "./Modal";
import Generator from "../helpers/WordSearchGenerator";

class HintHunt extends React.Component {
  state = {
    unfound: [
      "BULBASAUR","CHARMANDER", "SQUIRTLE",
      "CHEERFUL", "GLAD", "MERRY", "SPIDERMAN", "DAREDEVIL", "WOLVERINE", "SUNRISE",
      "SUNSET", "MIDNIGHT", "BLUES", "METAL", "DISCO"
    ],
    letters: [],
    columns: 0,
    modal: true,
    modalText: "Today's Date - Theme of Puzzle",
    modalButtonText: "Play Now"
  };
  clues = {
    "3 Starter Pokemon": ["BULBASAUR", "CHARMANDER", "SQUIRTLE"],
    "3 Synonyms for Happy": ["CHEERFUL", "GLAD", "MERRY"],
    "3 Marvel Superheroes": ["SPIDERMAN", "DAREDEVIL", "WOLVERINE"],
    "3 'Before' Movie Titles": ["SUNRISE", "SUNSET", "MIDNIGHT"],
    "3 Music Genres": ["BLUES", "METAL", "DISCO"]
  };
  addChild = (parentSelector, className) => {
    let box = document.querySelector(parentSelector);
    let childDiv = document.createElement("div");
    childDiv.className = className;
    box.appendChild(childDiv);
  };
  handleGuess = (guess) => {
    const reverseGuess = guess.split("").reverse().join("");
    const index = this.state.unfound.indexOf(guess);
    const reverseIndex = this.state.unfound.indexOf(reverseGuess);
    if(index !== -1 || reverseIndex !== -1) {
      let checkbox = `[data-answer='${index !== -1 ? guess : reverseGuess}']`;
      this.addChild(checkbox, "clue_checkmark");
      document.querySelector(checkbox).classList.add("clue_checkbox_green");
      this.setState((prev) => {
        let unfound = [...prev.unfound];
        unfound.splice(index !== -1 ? index : reverseIndex, 1);
        let modal = false, modalText = "", modalButtonText = "";
        if(unfound.length === 0) {
          modal = true;
          modalText = "You Win";
          modalButtonText = "Go Back";
        }
        return { 
          unfound: unfound,
          modal: modal,
          modalText: modalText,
          modalButtonText: modalButtonText
        };
      });
      return true;
    }
    else {
      return false;
    }
  };
  hideModal = () => {
    this.setState(() => ({
      modal: false
    }));
  };
  componentWillMount() {
    let columns = 13;
    let generator = new Generator(this.state.unfound, 14, columns);
    generator.create();
    this.setState(() => ({
      letters: generator.grid,
      columns: columns
    }));
  }
  render() {
    return (      
      <div className="hinthunt">
        {
          this.state.modal && 
          <Modal 
            text={this.state.modalText} 
            hideModal={this.hideModal}
            buttonText={this.state.modalButtonText} 
          />
        }
        <h1 className="hinthunt_header">Hint Hunt</h1>
        <div className="hinthunt_main">
          <div className="hinthunt_icon"></div>
          <div className="hinthunt_sideinfo">
            <SideInfo clues={this.clues} />
          </div>
          <div className="hinthunt_board">
            <Board 
              addChild={this.addChild}
              handleGuess={this.handleGuess} 
              letters={this.state.letters} 
              columns={this.state.columns} 
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HintHunt;