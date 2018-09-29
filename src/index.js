import React from "react";
import { render } from "react-dom";
import HintHunt from "./components/HintHunt";
import HintHuntModel from "./models/HintHuntModel";
import "./style.css";

const store = new HintHuntModel();

store.fetchPuzzle(new Date("9/15/2018")).then((snapshot) => {
  store.setPuzzle(snapshot);
  render(<HintHunt store={store} />, document.getElementById("index"));
  setTimeout(() => {
    store.modal.hideLoading();
  }, 750);
});