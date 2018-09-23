import React from "react";
import { observer } from "mobx-react";
import DayPicker from "react-day-picker";
import Loader from "./Loader";

@observer
class Modal extends React.Component {
  handleDayClick = (day) => {
    const store = this.props.store;
    store.fetchPuzzle(day).then((snapshot) => {
      store.setPuzzle(snapshot);
      setTimeout(() => {
        store.modal.hideLoading();
      }, 1500);
    });
  }

  render() {
    const store = this.props.store;
    return (
      <div className="modal">
        {
          store.modal.loading ? 
          <div className="modal_info"><Loader /></div> :
          <div className="modal_info">
            <h1 className="modal_heading">{store.modal.heading}</h1>
            <button
              className="modal_button"
              onClick={store.modal.hide}
              disabled={store.modal.buttonDisabled}
            >Play Now</button>
          </div>
        }
        <DayPicker
          selectedDays={store.modal.date}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}

export default Modal;