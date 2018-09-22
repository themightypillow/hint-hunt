import WordModel from "../../models/WordModel";

describe("testing WordModel", () => {
  const model = new WordModel("word");

  test("should set word to given value", () => {
    expect(model.word).toBe("word");
  });

  test("should set found to false by default", () => {
    expect(model.found).toBeFalsy();
  });
});