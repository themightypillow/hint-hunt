import React from "react";
import Clue from "./Clue";

const SideInfo = (props) => (
  <div>
    {
      Object.keys(props.clues).map((clue) => 
      <Clue text={clue} answers={props.clues[clue]} key={clue} />)
    }
  </div>
);

export default SideInfo;