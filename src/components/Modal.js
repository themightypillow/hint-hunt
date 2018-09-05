import React from "react";

const Modal = (props) => (
  <div className="modal">
    <div className="modal_text">
      {props.text}
      <button onClick={props.hideModal}>{props.buttonText}</button>
    </div>
  </div>
);

export default Modal;