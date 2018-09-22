import HintHuntModel from "../../models/HintHuntModel";
import BoardModel from "../../models/BoardModel";
import ModalModel from "../../models/ModalModel";
import WordModel from "../../models/WordModel";
import database from "../../firebase/firebase";
import generator from "../../generator/main";

afterAll((done) => {
  database.ref("20180921").remove().then(() => {
    done();
  });
});

describe("testing HintHuntModel", () => {
  const model = new HintHuntModel();

  test("should set board to undefined by default", () => {
    expect(model.board).toBe(undefined);
  });

  test("should set clues to an empty object by default", () => {
    expect(model.clues).toEqual({});
  });

  test("should set words to an empty array by default", () => {
    expect(model.words).toEqual([]);
  });

  test("should set title to an empty string by default", () => {
    expect(model.title).toBe("");
  });

  test("should create ModalModel object", () => {
    expect(model.modal instanceof ModalModel).toBeTruthy();
  });

  test("should set showWin to false by default", () => {
    expect(model.showWin).toBeFalsy();
  });

  test("should setup clues correctly", () => {
    const cluesData = {
      A: ["B"],
      C: ["D"]
    };
    const clues = model.setClues(cluesData);
    expect(
      clues.A &&
      clues.A[0] instanceof WordModel &&
      clues.C &&
      clues.C[0] instanceof WordModel
    ).toBeTruthy();
  });

  test("should have set words while setting up clues", () => {
    expect(model.words.length > 0).toBeTruthy();
  });

  test("should handle win scenario", () => {
    model.board = new BoardModel(["A", "B", "C", "D"], model.words);
    model.board.win = true;
    model.checkWin();
    expect(model.showWin).toBeTruthy();
  });
});

describe("adding puzzle from database", () => {

  const model = new HintHuntModel();

  beforeAll((done) => {
    const data = generator.readFile("./puzzles/test2");
    generator.addToDatabase("20180921", data.puzzle, data.clues, data.title, database)
      .then(() => {
        done();
      });
  });

  test("should have set modal title", (done) => {
    model.fetchPuzzle("20180921").then((snapshot) => {
      model.setPuzzle(snapshot);
      expect(model.modal.text).toBe("Sep 21, 2018 - ABC");
      done();
    });
  });

  test("should have set modal button to be true", () => {
    expect(model.modal.button).toBeTruthy();
  });

  test("should have set modal button text", () => {
    expect(model.modal.buttonText).toBe("Play Now");
  });

  test("should have set the value of clues", () => {
    expect(Object.keys(model.clues).length > 0).toBeTruthy();
  });

  test("should have set the value of board", () => {
    expect(model.board instanceof BoardModel).toBeTruthy();
  });

  test("should have set title", () => {
    expect(model.title).toBe("ABC");
  });
});