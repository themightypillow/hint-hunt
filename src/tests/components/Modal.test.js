import React from "react";
import { shallow } from "enzyme";
import Modal from "../../components/Modal";
import HintHuntModel from "../../models/HintHuntModel";

test("should render Modal with loading icon", () => {
  const store = new HintHuntModel();
  store.modal.visible = true;
  store.modal.loading = true;
  const wrapper = shallow(<Modal store={store} />);
  expect(wrapper).toMatchSnapshot();  
});

describe("Modal with button enabled", () => {
  const store = new HintHuntModel();
  store.modal.visible = true;
  store.modal.heading = "Heading";
  const wrapper = shallow(<Modal store={store} />);

  test("should render Modal with heading and button enabled", () => {
    expect(wrapper).toMatchSnapshot();  
  });

  test("should hide Modal on button click", () => {
    wrapper.find("button").simulate("click");
    expect(store.modal.visible).toBeFalsy();
  });
});

test("should render Modal with heading and button disabled", () => {
  const store = new HintHuntModel();
  store.modal.visible = true;
  store.modal.heading = "Heading";
  store.modal.buttonDisabled = true;
  const wrapper = shallow(<Modal store={store} />);
  expect(wrapper).toMatchSnapshot();  
});

test("should render Modal with selected day", () => {
  const store = new HintHuntModel();
  store.modal.visible = true;
  store.modal.heading = "Heading";
  store.modal.date = new Date();
  const wrapper = shallow(<Modal store={store} />);
  expect(wrapper).toMatchSnapshot(); 
});

// test handleDayClick()