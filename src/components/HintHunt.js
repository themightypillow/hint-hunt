import React from "react";
import { observer } from "mobx-react";
import Modal from "./Modal";
import SideInfo from "./SideInfo";
import Board from "./Board";
import Loader from "./Loader";

@observer
class HintHunt extends React.Component {
  handleMouseUp = () => {
    if(!this.props.store.showWin) {
      this.props.store.board.checkGuess();
      this.props.store.checkWin();
    }
  }

  handleClick = () => {
    this.props.store.showAnimation(0);
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
            store.showWin ?
            <h1 className="hinthunt-center">You Win!</h1> :
            <div className="hinthunt-center"><Loader /></div>
          }
        </div>
        <h1 className="hinthunt_header">{store.title}</h1>
        <div className="hinthunt_main">
          <div className="hinthunt_icon"></div>
          <div className="hinthunt_sideinfo">
            <SideInfo store={store} />
            <div>
              <button onClick={store.toggleAnswers}>Show Words</button>
              <button onClick={this.handleClick} className="hinthunt_btn">Select Hunt</button>
            </div>
          </div>
          <div className="hinthunt_board">
            <Board board={store.board} />
          </div>
        </div>
      </div>
    );
  }
}

export default HintHunt;