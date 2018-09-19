import React from "react";
import { observer } from "mobx-react";
import Clue from "./Clue";

@observer
class SideInfo extends React.Component {
  render() {
    const store = this.props.store;
    return (
      <div>
       {
         Object.keys(store.clues).map(clue =>
         <Clue key={clue} text={clue} answers={store.clues[clue]} /> )
       }
      </div>
    );
  }
}

export default SideInfo;