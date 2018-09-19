import React from "react";
import { observer } from "mobx-react";

@observer
class Square extends React.Component {
  render() {
    return (
      <div className="square">
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