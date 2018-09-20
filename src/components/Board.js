import React from "react";
import Square from "./Square";

class Board extends React.Component {
  render() {
    const board = this.props.board;
    return (
      <div className="container">
        <div className="board_grid">
          {
            board.grid.map((letter, index) => 
            <Square key={`${letter.letter}${index}`} letter={letter} board={board} />)
          }
        </div>
      </div>
    );
  }
}

export default Board;