import React from "react";
import { observer } from "mobx-react";

@observer
class Square extends React.Component {
  handleMouseDown = () => {
    this.props.board.setInitial(this.props.letter);
  }

  handleMouseOver = () => {
    this.props.board.startChain(this.props.letter);
  }
  
  render() {
    return (
      <div 
        className="square"
        onMouseDown={this.handleMouseDown}
        onMouseOver={this.handleMouseOver}
      >
        {
          this.props.letter.classes.map(
            (name, index) => <div key={`${this.props.letter.letter}${index}`} className={name}></div>
          )
        }
        {this.props.letter.letter}
      </div>
    );
  }
}

export default Square;