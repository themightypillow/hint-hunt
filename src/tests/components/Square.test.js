import React from "react";
import { shallow } from "enzyme";
import Square from "../../components/Square";

test("should render Square correctly", () => {
  const wrapper = shallow(<Square />);
  expect(wrapper).toMatchSnapshot();
});