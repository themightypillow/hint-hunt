import React from "react";
import ReactDOM from "react-dom";
import HintHunt from "./components/HintHunt";
import HintHuntModel from "./models/HintHuntModel";
import "./style.css";

const store = new HintHuntModel();

store.fetchPuzzle("20180914").then((snapshot) => {
  store.setPuzzle(snapshot);
  ReactDOM.render(<HintHunt store={store} />, document.getElementById("index"));
  setTimeout(() => {
    store.modal.hideLoading();
  }, 1000);
}).catch((e) => {
  throw e;
});