import React from "react";
import { observer } from "mobx-react";
import DayPicker from "react-day-picker";
import Loader from "./Loader";

@observer
class Modal extends React.Component {
  handleDayClick = (day) => {
    if(this.props.store.modal.date === null || 
    day.toDateString() !== this.props.store.modal.date.toDateString()) {
      const store = this.props.store;
      store.fetchPuzzle(day).then((snapshot) => {
        store.setPuzzle(snapshot);
        setTimeout(() => {
          store.modal.hideLoading();
        }, 1500);
      });
    }
  }

  render() {
    const store = this.props.store;
    return (
      <div className="modal">
        {
          store.modal.loading ? 
          <div><Loader /></div> :
          <div className="modal_heading">
            <h1>{store.modal.heading}</h1>
            <button
              className="modal_btn"
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