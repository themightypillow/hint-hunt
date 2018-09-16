// Derived from WordSearch Puzzle Generator by Jamis Buck
// https://github.com/jamis/wordsearch
class WordSearchGenerator {
  constructor(words, rows, columns, grid = []) {
    this.words = words;
    this.rows = rows;
    this.columns = columns;
    this.size = rows * columns;
    this.grid = grid;
    this.DIRS = {
      right: [0, 1],
      up: [-1, 0],
      down: [1, 0],
      rightdown: [1, 1],
      rightup: [-1, 1],
      leftdown: [1, -1],
      leftup: [-1, -1],
    };
  }

  index(row, column) {
    return row * this.columns + column;
  }

  coords(position) {
    return [Math.floor(position / this.columns), position % this.columns];
  }

  shuffle(a) {
    let b = [...a];
    for (let i = b.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let x = b[i];
      b[i] = b[j];
      b[j] = x;
    }
    return b;
  }

  tryWord(grid, word, position, direction) {
    let gridCopy = [...grid];
    let [row, column] = this.coords(position);
    let [dr, dc] = this.DIRS[direction];
    let letters = word.split("");
    while((row >= 0 && row < this.rows) && (column >= 0 && column < this.columns)) {
      let letter = letters.shift();
      if(!letter) {
        break;
      }
      if(!gridCopy[this.index(row, column)] || gridCopy[this.index(row, column)] === letter) {
        gridCopy[this.index(row, column)] = letter;
        row += dr;
        column += dc;
      }
      else {
        return null;
      }
    }
    return letters.length === 0 ? gridCopy : null;
  }

  generate() {
    let words = [...this.words];
    let directions = Object.keys(this.DIRS);
    let positions = [];
    for(let i = 0; i < this.size; i++) {
      positions.push(i);
    }
    let stack = [{
      grid: [...this.grid],
      word: words.shift(),
      dirs: this.shuffle(directions),
      positions: this.shuffle(positions)
    }];
    while(true) {
      let current = stack.slice(-1)[0];
      if(!current) {
        throw "No solution possible";
      }
      let dir = current.dirs.pop();
      if(!dir) {
        current.positions.pop();
        current.dirs = this.shuffle(directions);
        dir = current.dirs.pop();
      }
      let pos = current.positions.slice(-1)[0];
      if(!pos) {
        words.unshift(current.word);
        stack.pop();
      }
      else {
        let grid = this.tryWord(current.grid, current.word, pos, dir);
        if(grid) {
          if(words.length > 0) {
            stack.push({
              grid: grid,
              word: words.shift(),
              dirs: this.shuffle(directions),
              positions: this.shuffle(positions)
            });
          }
          else {
            this.grid = grid;
            break;
          }
        }
      }
    }
  }

  fillEmpty() {
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    for(let i = 0; i < this.size; i++) {
      if(!this.grid[i]) {
        this.grid[i] = letters[Math.floor(Math.random() * 26)];
      }
    }
  }

  create() {
    this.generate();
    this.fillEmpty();
  }
}

module.exports = WordSearchGenerator;