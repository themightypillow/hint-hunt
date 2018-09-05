import React from "react";
import { shallow } from "enzyme";
import SideInfo from "../../components/SideInfo";

test("should render SideInfo correctly", () => {
  const wrapper = shallow(<SideInfo clues={["A"]} />);
  expect(wrapper).toMatchSnapshot();
});