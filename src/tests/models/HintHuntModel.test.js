import HintHuntModel from "../../models/HintHuntModel";
import BoardModel from "../../models/BoardModel";
import ModalModel from "../../models/ModalModel";
import WordModel from "../../models/WordModel";
import database from "../../firebase/firebase";
import generator from "../../generator/main";

afterAll((done) => {
  database.ref("9-2-2018").remove().then(() => {
    done();
  });
});

describe("testing HintHuntModel", () => {
  const model = new HintHuntModel();
  const animationSpy = jest.spyOn(model, "showAnimation");

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

  test("should set showAnswers to false by default", () => {
    expect(model.showAnswers).toBeFalsy();
  });

  test("should set leftRightSymbol to be right symbol by default", () => {
    expect(model.leftRightSymbol).toBe("⟫");
  });

  test("should set upDownSymbol to be up symbol by default", () => {
    expect(model.upDownSymbol).toBe("∧");
  });

  test("should set showAnswers to true", () => {
    model.toggleAnswers();
    expect(model.showAnswers).toBeTruthy();
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

  test("should switch leftRightSymbol to left and upDownSymbol to down", () => {
    model.switchArrows();
    expect(
      model.leftRightSymbol === "⟪" &&
      model.upDownSymbol === "∨"
    ).toBeTruthy();
  });

  test("should reset both leftRight and upDown symbols", () => {
    model.resetArrows();
    expect(
      model.leftRightSymbol === "⟫" &&
      model.upDownSymbol === "∧"
    ).toBeTruthy();
  });

});

describe("testing show animation", () => {
  let model, modalSpy, newDiv, addSpy, removeSpy;

  beforeAll(() => {
    model = new HintHuntModel();
    modalSpy = spyOn(model.modal, "showCalendar");
    newDiv = document.createElement("div");
    newDiv.className = "hinthunt_animate";
    document.body.appendChild(newDiv);
    addSpy = spyOn(newDiv.classList, "add");
    removeSpy = spyOn(newDiv.classList, "remove");
  });

  test("should have called add twice", (done) => {
    model.showAnimation(0).then(() => {
      expect(addSpy).toHaveBeenCalledTimes(2);
      done();
    });
  });

  test("should have called remove", () => {
    expect(removeSpy).toHaveBeenCalled();
  });

  test("should have called showCalendar", () => {
    expect(modalSpy).toHaveBeenCalled();
  });
});

describe("testing checkWin", () => {
  let model, resetSpy, animationSpy;

  beforeAll(() => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("hinthunt_side", "hinthunt_side-show");
    document.body.appendChild(newDiv);
    model = new HintHuntModel();
    resetSpy = spyOn(model, "resetArrows");
    animationSpy = spyOn(model, "showAnimation");
  });

  test("should handle win scenario", () => {
    model.board = new BoardModel(["A", "B", "C", "D"], model.words);
    model.board.win = true;
    model.checkWin();
    expect(model.showWin).toBeTruthy();
  });

  test("should have called resetArrows", () => {
    expect(resetSpy).toHaveBeenCalled();
  });

  test("should have called showAnimation with argument", () => {
    expect(animationSpy).toHaveBeenCalledWith(1500);
  });

});

describe("adding puzzle from database", () => {

  const model = new HintHuntModel();

  beforeAll((done) => {
    const data = generator.readFile("./puzzles/test2");
    generator.addToDatabase("9-2-2018", data.puzzle, data.clues, data.title, database)
      .then(() => {
        done();
      });
  });

  test("should have set modal heading", (done) => {
    model.fetchPuzzle(new Date("9/2/2018")).then((snapshot) => {
      model.setPuzzle(snapshot);
      expect(model.modal.heading).toBe("Sun Sep 02 2018 - ABC");
      done();
    });
  });

  test("should have set modal button to not be disabled", () => {
    expect(model.modal.buttonDisabled).toBeFalsy();
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

describe("fetching nonexistent puzzle from database", () => {
  const model = new HintHuntModel();

  test("should have set modal heading correctly", (done) => {
    model.fetchPuzzle(new Date("8/1/2018")).then((snapshot) => {
      model.setPuzzle(snapshot);
      expect(model.modal.heading).toBe("Wed Aug 01 2018 - No Puzzle");
      done();
    });
  });

  test("should have set modal button to be disabled", () => {
    expect(model.modal.buttonDisabled).toBeTruthy();
  });
});