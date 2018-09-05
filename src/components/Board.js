import React from "react";
import Letter from "./Letter";

class Board extends React.Component {
  state = {
    first: "",
    chain: [],
    classes: []
  };
  removeChild = (childSelector) => {
    let child = document.querySelector(childSelector);
    child.parentNode.removeChild(child);
  };
  removeChainClasses = () => {
    if(this.state.first !== "") {
      this.removeChild(`[data-coords="${this.state.chain[0]}"] div.${this.state.classes[0]}`);
      let length = this.state.chain.length;
      for(let i = 1; i < length; i++) {
        this.removeChild(`[data-coords="${this.state.chain[i]}"] div.${i === length - 1 ? this.state.classes[2] : this.state.classes[1]}`);
      }
    }
  };
  outlineWord = (first, firstClass, initValue, maxValue, middle, middleClass, last, lastClass) => {
    let chain = [first];
    this.props.addChild(`[data-coords="${first}"]`, firstClass);
    for(let i = initValue; i < maxValue; i++) {
      let evalMiddle = eval(middle);
      chain.push(evalMiddle);
      this.props.addChild(`[data-coords="${evalMiddle}"]`, middleClass);
    }
    chain.push(last);
    this.props.addChild(`[data-coords="${last}"]`, lastClass);
    this.setState(() => ({
      chain: chain,
      classes: [firstClass, middleClass, lastClass]
    }));
  };
  handleClick = (coords) => {
    this.props.addChild(`[data-coords="${coords}"]`, "Letter_circle");
    this.setState(() => ({ 
      first: coords,
      chain: [coords],
      classes: ["Letter_circle"]
    }));
  };
  handleMouseOver = (coords) => {
    this.removeChainClasses();
    if(this.state.first !== "") {
      if(this.state.first === coords) {
        this.props.addChild(`[data-coords="${this.state.first}"]`, "letter_circle");
        this.setState((prev) => ({ 
          chain: [prev.first],
          classes: ["letter_circle"]
        }));
      }
      else {
        let [row1, col1] = this.state.first.split("-");
        let [row2, col2] = coords.split("-");
        if(row1 === row2) {
          this.outlineWord(`${row1}-${Math.min(col1, col2)}`, 
                          "letter_left", 
                          Math.min(col1, col2) + 1, 
                          Math.max(col1, col2), 
                          "`${first.split('-')[0]}-${i}`", 
                          "letter_leftRight", 
                          `${row1}-${Math.max(col1, col2)}`, 
                          "letter_right"
          );
        }
        else if(col1 === col2) {
          this.outlineWord(`${Math.min(row1, row2)}-${col1}`, 
                          "letter_top", 
                          Math.min(row1, row2) + 1, 
                          Math.max(row1, row2), 
                          "`${i}-${first.split('-')[1]}`", 
                          "letter_topBottom", 
                          `${Math.max(row1, row2)}-${col1}`, 
                          "letter_bottom"
          );
        }
        else if((row2 - row1) === (col2 - col1)) {
          this.outlineWord(`${Math.min(row1, row2)}-${Math.min(col1, col2)}`, 
                          "letter_topLeft",
                          1,
                          Math.max(row1, row2) - Math.min(row1, row2),
                          "`${Number(first.split('-')[0]) + i}-${Number(first.split('-')[1]) + i}`",
                          "letter_backSlash",
                          `${Math.max(row1, row2)}-${Math.max(col1, col2)}`,
                          "letter_bottomRight"
          );
        }
        else if((row2 - row1) === -(col2 - col1)) {
          this.outlineWord(`${Math.min(row1, row2)}-${Math.max(col1, col2)}`,
                          "letter_topRight",
                          1,
                          Math.max(row1, row2) - Math.min(row1, row2),
                          "`${Number(first.split('-')[0]) + i}-${Number(first.split('-')[1]) - i}`",
                          "letter_forwardSlash",
                          `${Math.max(row1, row2)}-${Math.min(col1, col2)}`,
                          "letter_bottomLeft"
          );
        }
        else {
          this.props.addChild(`[data-coords="${this.state.first}"]`, "letter_circle");
          this.setState((prev) => ({ 
            chain: [prev.first],
            classes: ["letter_circle"]
          }));
        }
      }
    }
  };
  handleMouseUp = () => {
    let guess = this.state.chain.map((coords) => {
      let [row, column] = coords.split("-");
      let index = this.getIndex(Number(row), Number(column));
      return this.props.letters[index];
    }).join("");
    if(!this.props.handleGuess(guess)) {
      this.removeChainClasses();
    }
    this.setState((prev) => ({ 
      first: "",
      chain: [],
      classes: []
    }));
  };
  getCoords(index) {
    return [Math.floor(index / this.props.columns), index % this.props.columns];
  }
  getIndex(row, column) {
    return row * this.props.columns + column;
  }
  render() {
    return (
      <div className="container">
        <div className="board_grid">
          {
            this.props.letters.map((letter, index) => 
              <Letter 
                char={letter} 
                coords={`${this.getCoords(index)[0]}-${this.getCoords(index)[1]}`} 
                handleClick={this.handleClick}
                handleMouseOver={this.handleMouseOver}
                handleMouseUp={this.handleMouseUp}
                key={`${this.getCoords(index)[0]}-${this.getCoords(index)[1]}`}
              />
            )
          }
        </div>
      </div>
    );
  }
}

export default Board;