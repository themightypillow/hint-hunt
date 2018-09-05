import React from "react";
import { shallow } from "enzyme";
import Board from "../../components/Board";

test("should render Board correctly", () => {
  const wrapper = shallow(<Board letters={["A"]} />);
  expect(wrapper).toMatchSnapshot();
});