import BoardModel from "../../models/BoardModel";
import WordModel from "../../models/WordModel";
import LetterModel from "../../models/LetterModel";

describe("testing BoardModel", () => {
  const word = new WordModel("A");
  const letter = new LetterModel("A", 0);
  const model = new BoardModel(["A", "B"], [word]);

  test("should construct grid given array", () => {
    expect(model.grid[0].letter === "A" && model.grid[1].letter === "B").toBeTruthy();
  });

  test("should have set words to be given value", () => {
    expect(model.words).toEqual([word]);
  });

  test("should have set win to be false by default", () => {
    expect(model.win).toBeFalsy();
  });

  test("should set the initial letter", () => {
    model.setInitial(letter);
    expect(model.initial).toEqual(letter);
  });

  test("should set mousedown to true on setting initial", () => {
    expect(model.isMouseDown).toBeTruthy();
  });

  test("should create a single letter chain", () => {
    model.startChain(letter);
    expect(model.chain).toEqual([letter]);
  })

  test("should pop class from letter in chain", () => {
    model.popChainClasses();
    expect(letter.classes.length).toBe(0);
  });

  test("should remove letter from chain", () => {
    model.checkGuess();
    expect(model.chain).toEqual([]);
  });

  test("should have removed letter from words list", () => {
    expect(model.words).toEqual([]);
  });

  test("should have set win to true", () => {
    expect(model.win).toBeTruthy();
  });
});

test("should create horizontal letter chain", () => {
  const word = new WordModel("ABC");
  const model = new BoardModel(["A", "B", "C", "D"], [word]);

  model.setInitial(new LetterModel("A", 0));
  model.startChain(new LetterModel("C", 2));

  expect(model.chain.map(letter => letter.letter)).toEqual(["A", "B", "C"]);
});

test("should create vertical letter chain", () => {
  const word = new WordModel("ABC");
  const model = new BoardModel([
    "A", "Q", "E", "R", "S", "A", "Q", "E", "R", "S", "T", "Y", "P",
    "B", "Q", "E", "R", "S", "A", "Q", "E", "R", "S", "T", "Y", "P",
    "C"
  ], [word]);

  model.setInitial(new LetterModel("A", 0));
  model.startChain(new LetterModel("C", 26));

  expect(model.chain.map(letter => letter.letter)).toEqual(["A", "B", "C"]);
});

test("should create forward diagonal chain", () => {
  const word = new WordModel("ABC");
  const model = new BoardModel([
    "N", "Q", "A", "R", "S", "A", "Q", "E", "R", "S", "T", "Y", "P",
    "M", "B", "E", "R", "S", "A", "Q", "E", "R", "S", "T", "Y", "P",
    "C"
  ], [word]);

  model.setInitial(new LetterModel("A", 2));
  model.startChain(new LetterModel("C", 26));

  expect(model.chain.map(letter => letter.letter)).toEqual(["A", "B", "C"]);
});

test("should create backward diagonal chain", () => {
  const word = new WordModel("ABC");
  const model = new BoardModel([
    "A", "Q", "P", "R", "S", "A", "Q", "E", "R", "S", "T", "Y", "P",
    "M", "B", "E", "R", "S", "A", "Q", "E", "R", "S", "T", "Y", "P",
    "L", "X", "C"
  ], [word]);

  model.setInitial(new LetterModel("A", 0));
  model.startChain(new LetterModel("C", 28));

  expect(model.chain.map(letter => letter.letter)).toEqual(["A", "B", "C"]);
});