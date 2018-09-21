import React from "react";
import { shallow } from "enzyme";
import Square from "../../components/Square";
import LetterModel from "../../models/LetterModel";
import BoardModel from "../../models/BoardModel";

test("should render Square with no classes", () => {
  const letter = new LetterModel("A", 0);
  const wrapper = shallow(<Square letter={letter} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render Square with one class", () => {
  const letter = new LetterModel("A", 0);
  letter.pushClass("one");
  const wrapper = shallow(<Square letter={letter} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render Square with two classes", () => {
  const letter = new LetterModel("A", 0);
  letter.pushClass("one");
  letter.pushClass("two");
  const wrapper = shallow(<Square letter={letter} />);
  expect(wrapper).toMatchSnapshot();
});

describe("mouse events", () => {
  const letter = new LetterModel("A", 0);
  const board = new BoardModel(["A", "B"], ["A"]);
  const wrapper = shallow(<Square board={board} letter={letter} />);

  test("should run function on mousedown event", () => {
    wrapper.find(".square").simulate("mousedown");
    expect(board.isMouseDown).toBeTruthy();
  });

  test("should run function on mouseover event", () => {
    wrapper.find(".square").simulate("mouseover");
    expect(board.initial).toEqual(board.hover);
  });
});