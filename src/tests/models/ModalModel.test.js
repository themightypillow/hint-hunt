import ModalModel from "../../models/ModalModel";

describe("ModalModel testing", () => {
  const model = new ModalModel();

  test("should set visibility to false by default", () => {
    expect(model.visible).toBeFalsy();
  });

  test("should set heading to empty by default", () => {
    expect(model.heading).toBe("");
  });

  test("should set loading to false by default", () => {
    expect(model.loading).toBeFalsy();
  });

  test("should set date to null by default", () => {
    expect(model.date).toBeNull();
  });
  
  test("should set buttonDisabled to false by default", () => {
    expect(model.buttonDisabled).toBeFalsy();
  });

  test("should set visibility to true", () => {
    model.visible = true;
    expect(model.visible).toBeTruthy();
  });

  test("should set visibility to false", () => {
    model.hide();
    expect(model.visible).toBeFalsy();
  })

  test("should set loading to true", () => {
    model.loading = true;
    expect(model.loading).toBeTruthy();
  });

  test("should set loading to false", () => {
    model.hideLoading();
    expect(model.loading).toBeFalsy();
  });

  test("should set date to be a Date object", () => {
    model.date = new Date("9/25/2018");
    expect(model.date.toLocaleDateString("en-US")).toBe("9/25/2018");
  });

  test("should set heading based on date and given title", () => {
    model.setHeading("A Title");
    expect(model.heading).toBe("Tue Sep 25 2018 - A Title");
  });
});

describe("testing showCalendar", () => {
  let model, removeSpy;

  beforeAll(() => {
    const newDiv = document.createElement("div");
    newDiv.className = "hinthunt_animate";
    document.body.appendChild(newDiv);
    removeSpy = jest.spyOn(newDiv.classList, "remove");
    model = new ModalModel();
  });

  test("should have called remove once", (done) => {
    model.showCalendar().then(() => {
      expect(removeSpy).toHaveBeenCalled();
      done();
    });
  });

  test("visible is true", () => {
    expect(model.visible).toBeTruthy();
  });

  test("heading is correct", () => {
    expect(model.heading).toBe("Choose a Date");
  });

  test("loading is false", () => {
    expect(model.loading).toBeFalsy();
  });

  test("date is null", () => {
    expect(model.date).toBeNull();
  });

  test("button is disabled", () => {
    expect(model.buttonDisabled).toBeTruthy();
  });
});