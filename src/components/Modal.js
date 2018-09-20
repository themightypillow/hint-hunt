import React from "react";
import { observer } from "mobx-react";
import Loader from "./Loader";

@observer
class Modal extends React.Component {
  render() {
    const store = this.props.store;
    return (
      <div className="modal">
        {
          store.modal.loading ?
            <div className="modal_text"><Loader /></div> :
            <div className="modal_text">
              {store.modal.text}
              {
                store.modal.button && 
                <button onClick={store.modal.hide}>{store.modal.buttonText}</button>
              }
            </div>
        }
      </div>
    );
  }
}

export default Modal;