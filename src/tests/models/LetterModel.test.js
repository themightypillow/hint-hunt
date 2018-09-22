import LetterModel from "../../models/LetterModel";

describe("testing LetterModel", () => {
  const model = new LetterModel("A", 1);

  test("should have set letter to given value", () => {
    expect(model.letter).toBe("A");
  });

  test("should have set index to given value", () => {
    expect(model.index).toBe(1);
  })

  test("should have set classes to be empty by default", () => {
    expect(model.classes).toEqual([]);
  });

  test("should return correct coordinates", () => {
    expect(model.coords()).toEqual([0, 1]);
  });

  test("should push class", () => {
    model.pushClass("one");
    expect(model.classes).toContain("one");
  });

  test("should pop class off array", () => {
    model.popClass();
    expect(model.classes.includes("one")).toBeFalsy();
  });
});