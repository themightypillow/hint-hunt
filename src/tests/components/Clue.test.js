import React from "react";
import { shallow } from "enzyme";
import Clue from "../../components/Clue";

test("should render Clue correctly", () => {
  const wrapper = shallow(<Clue answers={["A"]} />);
  expect(wrapper).toMatchSnapshot();
});