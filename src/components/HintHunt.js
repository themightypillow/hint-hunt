import React from "react";
import { observer } from "mobx-react";
import Modal from "./Modal";
import ClueList from "./ClueList";
import Board from "./Board";
import { toggleClues, hideClues } from "../helpers/main";

@observer
class HintHunt extends React.Component {
  handleMouseUp = () => {
    if(!this.props.store.showWin) {
      this.props.store.board.checkGuess();
      this.props.store.checkWin();
    }
  }

  handleClick = () => {
    hideClues();
    this.props.store.resetArrows();
    this.props.store.showAnimation(0);
  }

  handleArrowClick = () => {
    toggleClues();
    this.props.store.switchArrows();
  }

  render() {
    const store = this.props.store;
    return (      
      <div className="hinthunt" onMouseUp={this.handleMouseUp}>
        {
          store.modal.visible && <Modal store={store}/>
        }
        <div className="hinthunt_animate">
          {
            store.showWin &&
            <h1>You Win!</h1>
          }
        </div>
        <h1 className="hinthunt_title">{store.title}</h1>
        <div className="hinthunt_game">
          <div className="hinthunt_side">
            {
              !store.modal.visible &&
              <button onClick={this.handleArrowClick} className="hinthunt_leftright-arrow">
                {store.leftRightSymbol}
              </button>
            }
            {
              !store.modal.visible &&
              <button onClick={this.handleArrowClick} className="hinthunt_updown-arrow">
                {store.upDownSymbol}
              </button>
            }
            <ClueList store={store} />
            <div>
              <button onClick={store.toggleAnswers} className="hinthunt_btn">
                {store.showAnswers ? "Hide Words" : "Show Words"}
              </button>
              <button onClick={this.handleClick} className="hinthunt_btn">Select Hunt</button>
            </div>
          </div>
          <Board board={store.board} />
        </div>
      </div>
    );
  }
}

export default HintHunt;