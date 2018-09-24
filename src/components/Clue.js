import React from "react";
import { observer } from "mobx-react";

@observer
class Clue extends React.Component {
  render() {
    return (
      <div className="clue">
        {this.props.text}
        <div className="clue_boxes">
          {
            this.props.answers.map((answer) => 
              (
                <div key={answer.word} className={`clue_checkbox ${answer.found ? "clue_checkbox_green" : ""}`}>
                  { answer.found && <div className="clue_checkmark"></div>}
                </div>
              )
            )
          }
          {
            this.props.show &&
            this.props.answers.map((answer) => 
              (
                <div key={answer.word} className={answer.found ? "clue_strike" : ""}>
                  {answer.word}
                </div>
              )
            )
          }
        </div>
      </div>
    );
  }
}

export default Clue;