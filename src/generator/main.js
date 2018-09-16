if(process.argv.length < 4) {
  console.log("Usage: npm run generate YYYYMMDD filename");
  process.exit();
}

// handle environment variables for firebase
const env = require("dotenv").config();
if(env.error) throw env.error;

const fs = require("fs");
const database = require("../firebase/firebase");
const WordSearchGenerator = require("./WordSearchGenerator");

/* files are expected to be in the following format:
      [TITLE]
      [CLUE DESCRIPTION]:[ANSWER...]
      ...      
*/
fs.readFile(process.argv[3], "utf8", (err, data) => {
  if(err) throw err;
  const lines = data.split(/\r?\n/).slice(0, -1); // for both windows and unix line endings, also gets rid of empty last line
  const title = lines.shift();
  let words = [];
  const clues = lines.reduce((acc, cur) => {
    let [description, answer] = cur.split(":");
    answer = answer.split(" ");
    acc[description] = answer;
    words.push(...answer);
    return acc;
  }, {});
  const puzzle = new WordSearchGenerator(words, 14, 13); // all grids are 14x13 by default
  puzzle.create();
  addToDatabase(title, clues, words, puzzle.grid, puzzle.rows, puzzle.columns);
});

function addToDatabase(title, clues, words, grid, rows, columns) {
  database.ref(process.argv[2]).set({
    title,
    clues,
    words,
    grid,
    rows,
    columns
  }).then(() => {
      console.log("Data saved successfully");
      process.exit();
  }).catch((e) => {
      console.log(
        `Failed to write to database
        ${e}`);
      process.exit();
  });
}