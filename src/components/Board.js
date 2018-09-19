import React from "react";
import Square from "./Square";

class Board extends React.Component {
  render() {
    const store = this.props.store;
    return (
      <div className="container">
        <div className="board_grid">
          {
            store.grid.map((letter, index) => 
            <Square key={`${letter.letter}${index}`} letter={letter} />)
          }
        </div>
      </div>
    );
  }
}

export default Board;