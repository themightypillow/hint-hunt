import React from "react";
import { shallow } from "enzyme";
import HintHunt from "../../components/HintHunt";

test("should render HintHunt correctly", () => {
  const wrapper = shallow(<HintHunt />);
  expect(wrapper).toMatchSnapshot();
});