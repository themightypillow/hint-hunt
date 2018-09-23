// handle environment variables for firebase
const env = require("dotenv").config();
if(env.error) throw env.error;

const fs = require("fs");
const firebaseDatabase = require("../firebase/firebase");
const WordSearchGenerator = require("./WordSearchGenerator");

/* files are expected to be in the following format:
      [TITLE]
      [CLUE DESCRIPTION]:[ANSWER...]
   with no empty lines
*/
function readFile(filename) {
  let data = fs.readFileSync(filename, "utf8");
  // for both windows and unix line endings
  const lines = data.split(/\r?\n/);
  const title = lines.shift();
  let words = [];
  const clues = lines.reduce((acc, cur) => {
    let [description, answer] = cur.split(":");
    answer = answer.split(" ");
    acc[description] = answer;
    words.push(...answer);
    return acc;
  }, {});
  let puzzle = new WordSearchGenerator(words, 14, 13); // all grids are 14x13 by default
  puzzle.create();
  return { puzzle, clues, title };
}

/*
  puzzle - a WordSearchGenerator object
  clues - an object with keys: description and values: answers
  title - title as string
  database - imported firebase database
*/
function addToDatabase(date, puzzle, clues, title, database) {
  return database.ref(date).set({
    title,
    clues,
    grid: puzzle.grid,
    rows: puzzle.rows,
    columns: puzzle.columns
  });
}

if(process.argv[2]) {
  if(process.argv[2] === "help") {
    console.log("Usage: npm run generate MM/DD/YYYY filename");
    process.exit();
  }
  else {
    let info = readFile(process.argv[3]);
    addToDatabase(process.argv[2], info.puzzle, info.clues, info.title, firebaseDatabase)
      .then(() => {
        console.log("Data saved successfully");
        process.exit();
      }).catch((e) => {
        console.log(
          `Failed to write to database
          ${e}`);
          process.exit(0);
      });
  }
}

module.exports = {
  readFile,
  addToDatabase
};