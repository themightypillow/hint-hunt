import database from "../../firebase/firebase";
import generator from "../../generator/main";

afterAll((done) => {
  database.ref("0000").remove()
    .then(() => done());
});

describe("reading file", () => {
  const data = generator.readFile("./puzzles/test");

  test("can read title from file", () => {
    expect(data.title).toBe("Test");
  });

  test("can read words from file", () => {
    expect(data.words).toEqual(["TEST", "TESTING"]);
  });

  test("can read clues from file", () => {
    expect(data.clues).toEqual({
      "this is": ["TEST"],
      "another": ["TESTING"]
    });
  });

  test("can create word search from file", () => {
    expect(data.puzzle.grid.length > 0).toBeTruthy();
  });
});

test("can add to database", (done) => {
  const data = generator.readFile("./puzzles/test");
  generator.addToDatabase("0000", data.puzzle, data.clues, data.words, data.title, database).then(() => {
    return database.ref("0000").once("value");
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual({
      clues: data.clues,
      columns: data.puzzle.columns,
      grid: data.puzzle.grid,
      rows: data.puzzle.rows,
      title: data.title,
      words: data.words
    });
    done();
  });
});