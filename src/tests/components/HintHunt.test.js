import React from "react";
import { shallow } from "enzyme";
import { action } from "mobx";
import HintHunt from "../../components/HintHunt";
import HintHuntModel from "../../models/HintHuntModel";

describe("rendering HintHunt", () => {
  const store = new HintHuntModel();

  beforeAll((done) => {
    store.fetchPuzzle(new Date("9/1/2018")).then((snapshot) => {
      store.setPuzzle(snapshot);
      done();
    });
  });

  test("should render HintHunt with visible modal", () => {
    store.modal.visible = true;
    const wrapper = shallow(<HintHunt store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render HintHunt with visible win", () => {
    store.modal.hide();
    action(() => {
      store.showWin = true;
    });
    const wrapper = shallow(<HintHunt store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should show 'Show Words' button", () => {
    action(() => {
      store.showWin = false;
      store.showAnswers = true;
    });
    const wrapper = shallow(<HintHunt store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("mouse events", () => {
  const store = new HintHuntModel();
  store.checkWin = jest.fn();
  store.toggleAnswers = jest.fn();
  store.board = {
    checkGuess: jest.fn()
  };
  const wrapper = shallow(<HintHunt store={store} />);

  test("should run checkGuess on mouseup event", () => {
    wrapper.find(".hinthunt").simulate("mouseup");
    expect(store.board.checkGuess).toHaveBeenCalled();
  });

  test("should have run checkWin on mouseup event", () => {
    expect(store.checkWin).toHaveBeenCalled();
  });

  test("should run toggleAnswers on click", () => {
    wrapper.find(".hinthunt_btn").at(0).simulate("click");
    expect(store.toggleAnswers).toHaveBeenCalled();
  });

  // test handleClick and handleArrowClick
});