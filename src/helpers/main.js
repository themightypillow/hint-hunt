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