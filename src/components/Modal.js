import React from "react";
import { observer } from "mobx-react";
import Loader from "./Loader";

@observer
class Modal extends React.Component {
  render() {
    return (
      <div className="modal">
        {
          this.props.modal.loading ?
            <div className="modal_text"><Loader /></div> :
            <div className="modal_text">
              {this.props.modal.text}
              {
                this.props.modal.button && 
                <button onClick={this.props.modal.hide}>{this.props.modal.buttonText}</button>
              }
            </div>
        }
      </div>
    );
  }
}

export default Modal;