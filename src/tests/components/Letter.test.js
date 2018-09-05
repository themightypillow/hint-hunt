import React from "react";
import { shallow } from "enzyme";
import Letter from "../../components/Letter";

test("should render Letter correctly", () => {
  const wrapper = shallow(<Letter />);
  expect(wrapper).toMatchSnapshot();
});