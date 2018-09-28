import React from "react";
import { shallow } from "enzyme";
import Modal from "../../components/Modal";
import HintHuntModel from "../../models/HintHuntModel";

/*
  No snapshot tests of Modal because react-day-picker uses current date
  and time at render
*/

describe("Modal with button enabled", () => {
  const store = new HintHuntModel();
  store.modal.visible = true;
  store.modal.heading = "Heading";
  const wrapper = shallow(<Modal store={store} />);

  test("should hide Modal on button click", () => {
    wrapper.find("button").simulate("click");
    expect(store.modal.visible).toBeFalsy();
  });
});

test("Modal handles clicking on same day", () => {
  const store = new HintHuntModel();
  store.modal.date = new Date("8/1/2018");
  let fetchSpy = jest.spyOn(store, "fetchPuzzle");
  const modal = new Modal();
  modal.props = {
    store
  };
  modal.handleDayClick(new Date("8/1/2018"));
  expect(fetchSpy).toHaveBeenCalledTimes(0);
});

test("Modal handles clicking on new or different day", () => {
  const store = new HintHuntModel();
  store.modal.date = new Date("8/1/2018");
  let fetchSpy = jest.spyOn(store, "fetchPuzzle");
  const modal = new Modal();
  modal.props = {
    store
  };
  modal.handleDayClick(new Date("8/2/2018"));
  expect(fetchSpy).toHaveBeenCalledTimes(1);
});