import React from "react";
import { shallow } from "enzyme";
import CluesList from "../../components/CluesList";
import HintHuntModel from "../../models/HintHuntModel";

test("should render CluesList with one clue", () => {
  const cluesData = {
    A: ["B"]
  };
  const store = new HintHuntModel();
  const clues = store.setClues(cluesData);
  store.clues = clues;
  const wrapper = shallow(<CluesList store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render CluesList with one clue, answers shown", () => {
  const cluesData = {
    A: ["B"]
  };
  const store = new HintHuntModel();
  const clues = store.setClues(cluesData);
  store.clues = clues;
  store.showAnswers = true;
  const wrapper = shallow(<CluesList store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render CluesList with two clues", () => {
  const cluesData = {
    A: ["B"],
    C: ["D"]
  };
  const store = new HintHuntModel();
  const clues = store.setClues(cluesData);
  store.clues = clues;
  const wrapper = shallow(<CluesList store={store} />);
  expect(wrapper).toMatchSnapshot();
});