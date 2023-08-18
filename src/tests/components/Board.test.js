import React from "react";
import { shallow } from "enzyme";
import Board from "../../components/Board";
import BoardModel from "../../models/BoardModel";

test("should render Board with grid", () => {
  const board = new BoardModel(["A", "B"], ["A"]);
  const wrapper = shallow(<Board board={board} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render Board with win scenario", () => {
  const board = new BoardModel(["A", "B"], ["A"]);
  board.win = true;
  const wrapper = shallow(<Board board={board} />);
  expect(wrapper.find(".container").hasClass("board_no_pointer")).toBeTruthy();
});