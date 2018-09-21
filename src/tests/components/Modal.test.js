import React from "react";
import { shallow } from "enzyme";
import Modal from "../../components/Modal";
import ModalModel from "../../models/ModalModel";

test("should render Modal with loading screen", () => {
  const model = new ModalModel();
  model.visible = true;
  model.loading = true;
  const wrapper = shallow(<Modal modal={model} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render Modal with only text", () => {
  const model = new ModalModel();
  model.visible = true;
  model.text = "Title";
  const wrapper = shallow(<Modal modal={model} />);
  expect(wrapper).toMatchSnapshot();
});

describe("Modal with text and button", () => {
  const model = new ModalModel();
  model.visible = true;
  model.text = "Title";
  model.button = true;
  model.buttonText = "Click";
  const wrapper = shallow(<Modal modal={model} />);

  test("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should hide Modal on button click", () => {
    wrapper.find("button").simulate("click");
    expect(model.visible).toBeFalsy();
  });
});