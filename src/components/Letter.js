import React from "react";

const Letter = (props) => (
  <div 
    className="letter_box"
    onMouseDown={(e) => props.handleClick(props.coords)}
    onMouseOver={(e) => props.handleMouseOver(props.coords)}
    onMouseUp={props.handleMouseUp}
    data-coords={props.coords}
  >
    {props.char}
  </div>
);

export default Letter;