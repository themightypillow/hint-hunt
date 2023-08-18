# Hint Hunt

Based on the game Word Roundup&#8482;, Hint Hunt is a hybrid between a word search and a crossword. Solve the clues given in order to figure out what words to search for in the grid.

## URL



## Local Setup

Clone the repo where you want the folder to live
```
$ git clone https://github.com/themightypillow/hint-hunt
```
Change the directory
```
$ cd hint-hunt
```
Install all packages
```
$ npm install
```
Run the start script to start the dev server
```
$ npm start
```
The server watches any changes to files and reloads automatically

## Building

Building will import and minify all js/css files referenced in `src/index.js` and `src/style.css`, resulting in site ready files inside the `docs/` directory. Once you are ready to build, create bundle files with the following command:
```
$ npm run build
```

## Generating Puzzles

Included is a generator script that will read an input file, generate a word search grid, and write everything to a firebase database.

### Usage

```
$ npm run generate [M]M-[D]D-YYYY filename
```
The script takes two arguments:
1. The date you want associated with this puzzle
2. The filename containing the title and clues

Files are expected to be in the following format with no empty lines:
```
TITLE
CLUE DESCRIPTION: ANSWER [ANSWER...]
```

### Configuration

In order to read from/write to a firebase database, the following environment variables are required inside of `./.env`:
* `FIREBASE_APIKEY`
* `FIREBASE_AUTHDOMAIN`
* `FIREBASE_DATABASEURL`
* `FIREBASE_PROJECTID`
* `FIREBASE_STORAGEBUCKET`
* `FIREBASE_MESSAGINGSENDERID`

## Testing

Tests are written for all React components, generator functions, helper functions, and MobX models

Run tests
```
$ npm test
```

Run tests with coverage table
```
$ npm run coverage
```

#### Requirements
* It is assumed there is file for generating a word search located in `./puzzles/test`. This filename is replaceable inside of `src/tests/generator/main.test.js`
* An optional separate database is used for testing. The environment variables are set up inside the file `./.env.test`

## Built Using

* React
* Firebase
* MobX
* Babel
* PostCSS
* Webpack 

## Author

* Cheri Anne - [themightypillow](https://github.com/themightypillow/)

## Acknowledgements

* Word-Search Puzzle Generator - [github](https://github.com/jamis/wordsearch)

## License
Hint Hunt by [Cheri Anne](https://github.com/themightypillow/) is licensed under a [Creative Commons Attribution 4.0 International License.](https://creativecommons.org/licenses/by/4.0/)