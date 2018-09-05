import React from "react";
import { shallow } from "enzyme";
import Modal from "../../components/Modal";

test("should render Modal correctly", () => {
  const wrapper = shallow(<Modal />);
  expect(wrapper).toMatchSnapshot();
});