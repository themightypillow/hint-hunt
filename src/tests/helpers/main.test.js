import { getIndex, randomColorClass, toggleClues, hideClues } from "../../helpers/main";

describe("returning correct index", () => {
  test("should return 0 given 0, 0", () => {
    expect(getIndex(0, 0)).toBe(0);
  });

  test("should return column number given row 0", () => {
    expect(getIndex(0, 10)).toBe(10);
  });

  test("should return 130 given 9, 13", () => {
    expect(getIndex(9, 13)).toBe(130);
  });
});

describe("returning className from list", () => {
  let classes = [
    "square-blue", "square-yellow", "square-green", "square-orange",
    "square-red", "square-pink", "square-purple", "square-rose",
    "square-steel", "square-sea"
  ];

  for(let i = 0; i < 10; i++) {
    test("should return element from classes", () => {
      expect(classes.includes(randomColorClass())).toBeTruthy();
    });
  }
});

// test toggleClues
// test hideClues