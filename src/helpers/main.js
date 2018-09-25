export const getIndex = (row, column) => {
  return row * 13 + column;
};

export const randomColorClass = () => {
  let classes = [
    "square-blue", "square-yellow", "square-green", "square-orange",
    "square-red", "square-pink", "square-purple", "square-rose",
    "square-steel", "square-sea"
  ];
  return classes[Math.floor(Math.random() * 10)];
};

export const toggleClues = () => {
  let cluesList = document.querySelector(".hinthunt_side");
  cluesList.classList.toggle("hinthunt_side-show");
};

export const hideClues = () => {
  let cluesList = document.querySelector(".hinthunt_side");
  cluesList.classList.remove("hinthunt_side-show");
};