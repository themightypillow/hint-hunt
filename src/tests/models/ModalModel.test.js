import ModalModel from "../../models/ModalModel";

describe("ModalModel testing", () => {
  const model = new ModalModel();

  test("should set visibility to false by default", () => {
    expect(model.visible).toBeFalsy();
  });

  test("should set text to empty by default", () => {
    expect(model.text).toBe("");
  });

  test("should set button to false by default", () => {
    expect(model.button).toBeFalsy();
  });

  test("should set button text to empty by default", () => {
    expect(model.buttonText).toBe("");
  });

  test("should set loading to false by default", () => {
    expect(model.loading).toBeFalsy();
  });

  test("should set visibility to false", () => {
    model.visible = true;
    model.hide();
    expect(model.visible).toBeFalsy();
  })

  test("should set loading to false", () => {
    model.loading = true;
    model.hideLoading();
    expect(model.loading).toBeFalsy();
  });
})