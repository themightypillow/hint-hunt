import React from "react";
import ReactDOM from "react-dom";
import HintHunt from "./components/HintHunt";
import HintHuntModel from "./models/HintHuntModel";
import "react-day-picker/lib/style.css";
import "./style.css";

const store = new HintHuntModel();

store.fetchPuzzle(new Date("9/14/2018")).then((snapshot) => {
  store.setPuzzle(snapshot);
  ReactDOM.render(<HintHunt store={store} />, document.getElementById("index"));
  setTimeout(() => {
    store.modal.hideLoading();
  }, 1500);
});