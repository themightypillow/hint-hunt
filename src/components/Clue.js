import React from "react";

const Clue = (props) => (
  <div className="clue">
    {props.text}
    <div className="clue_boxes">
      {
        props.answers.map((answer) => 
        <div key={answer} data-answer={answer} className="clue_checkbox"></div> )
      }
    </div>
  </div>
);

export default Clue;