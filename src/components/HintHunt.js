import React from "react";
import { observer } from "mobx-react";
import Modal from "./Modal";
import SideInfo from "./SideInfo";
import Board from "./Board";

@observer
class HintHunt extends React.Component {
  handleMouseUp = () => {
    if(!this.props.store.showWin) {
      this.props.store.board.checkGuess();
      this.props.store.checkWin();
    }
  }

  render() {
    const store = this.props.store;
    return (      
      <div className="hinthunt" onMouseUp={this.handleMouseUp}>
        {
          store.modal.visible && <Modal store={store}/>
        }
        <h1 className="hinthunt_header">{store.title}</h1>
        <div className="hinthunt_main">
          <div className="hinthunt_icon"></div>
          <div className="hinthunt_sideinfo">
            <SideInfo store={store} />
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