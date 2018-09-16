import WordSearchGenerator from "../../generator/WordSearchGenerator";

test("should construct a word search generator object with size 1", () => {
  let puzzle = new WordSearchGenerator([], 1, 1);
  expect(puzzle.size).toBe(1);
});

test("should construct a word search generator object with an empty grid", () => {
  let puzzle = new WordSearchGenerator([], 1, 1);
  expect(puzzle.grid).toEqual([]);
});

test("should calculate correct index given row and column", () => {
  let puzzle = new WordSearchGenerator([], 4, 4);
  let index = puzzle.index(2, 1);
  expect(index).toBe(9);
});

test("should calculate correct coordinates given position on grid", () => {
  let puzzle = new WordSearchGenerator([], 4, 4);
  let coords = puzzle.coords(9);
  expect(coords).toEqual([2, 1]);
});

test("should successfully place a word on an empty grid horizontally", () => {
  let puzzle = new WordSearchGenerator(["CAT"], 3, 3);
  let success = puzzle.tryWord(puzzle.grid, "CAT", 0, "right");
  expect(success).toBeTruthy();
});

test("should successfully place a word on an empty grid vertically", () => {
  let puzzle = new WordSearchGenerator(["CAT"], 3, 3);
  let success = puzzle.tryWord(puzzle.grid, "CAT", 0, "down");
  expect(success).toBeTruthy();
});

test("should successfully place a word on an empty grid diagonally", () => {
  let puzzle = new WordSearchGenerator(["CAT"], 3, 3);
  let success = puzzle.tryWord(puzzle.grid, "CAT", 0, "rightdown");
  expect(success).toBeTruthy();
});

test("should fail to place a word on an occupied area", () => {
  let puzzle = new WordSearchGenerator(["CAT"], 3, 3, ["B","B","B","B","B","B","B","B","B"]);
  let success = puzzle.tryWord(puzzle.grid, "CAT", 0, "right");
  expect(success).toBeFalsy();
});

test("should succeed in placing a word in an area where the word is already filled", () => {
  let puzzle = new WordSearchGenerator(["CAT"], 3, 3, ["C","A","T","B","B","B","B","B","B"]);
  let success = puzzle.tryWord(puzzle.grid, "CAT", 0, "right");
  expect(success).toBeTruthy();
});

test("should succeed in placing a word in an area where the word is partially filled", () => {
  let puzzle = new WordSearchGenerator(["CAT"], 3, 3, ["C","A","","B","B","B","B","B","B"]);
  let success = puzzle.tryWord(puzzle.grid, "CAT", 0, "right");
  expect(success).toBeTruthy();
});

describe("creating grid containing CAT", () => {
  let puzzle = new WordSearchGenerator(["CAT"], 4, 4);
  puzzle.generate();

  test("should contain C", () => {
    expect(puzzle.grid).toContain("C");
  });

  test("should contain A", () => {
    expect(puzzle.grid).toContain("A");
  });

  test("should contain T", () => {
    expect(puzzle.grid).toContain("T");
  });

  test("should fill empty spots", () => {
    puzzle.fillEmpty();
    expect(puzzle.grid.length).toBe(puzzle.size);
  });
});
