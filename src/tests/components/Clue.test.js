import React from "react";
import { shallow } from "enzyme";
import Clue from "../../components/Clue";
import WordModel from "../../models/WordModel";

test("should render Clue with one unfound answer", () => {
  const answers = [
    new WordModel("one")
  ];
  const wrapper = shallow(<Clue text="First" answers={answers} show={false} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render Clue with two unfound answers", () => {
  const answers = [
    new WordModel("one"),
    new WordModel("two")
  ];
  const wrapper = shallow(<Clue text="First" answers={answers} show={false} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render Clue with one found answer, one unfound answer", () => {
  const answers = [
    new WordModel("one"),
    new WordModel("two")
  ];
  answers[0].found = true;
  const wrapper = shallow(<Clue text="First" answers={answers} show={false} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render Clue with answers visible, none found", () => {
  const answers = [
    new WordModel("one"),
    new WordModel("two")
  ];
  const wrapper = shallow(<Clue text="First" answers={answers} show={true} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render Clue with answers visible, one found", () => {
  const answers = [
    new WordModel("one"),
    new WordModel("two")
  ];
  answers[0].found = true;
  const wrapper = shallow(<Clue text="First" answers={answers} show={true} />);
  expect(wrapper).toMatchSnapshot();
});