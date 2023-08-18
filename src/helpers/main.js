/*
  Returns the index or position inside an array of length 182
  All grids are 13x14 and are represented as a one dimensional array
*/
export const getIndex = (row, column) => {
  return row * 13 + column;
};

/*
  Each word gets highlighted as a random color from a choice of 10
*/
export const randomColorClass = () => {
  let classes = [
    "square-blue", "square-yellow", "square-green", "square-orange",
    "square-red", "square-pink", "square-purple", "square-rose",
    "square-steel", "square-sea"
  ];
  return classes[Math.floor(Math.random() * 10)];
};

/*
  Ran on small screens only
  Hides or shows the box of clues/words on the side or bottom of the screen
*/
export const toggleClues = () => {
  let cluesList = document.querySelector(".hinthunt_side");
  cluesList.classList.toggle("hinthunt_side-show");
};

/*
  Ran on small screens only
  Hides the box clues/word on the side or bottom of the screen when the word
  search is completed or switched
*/
export const hideClues = () => {
  let cluesList = document.querySelector(".hinthunt_side");
  cluesList.classList.remove("hinthunt_side-show");
};