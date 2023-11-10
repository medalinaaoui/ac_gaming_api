import matchHandler from "./assets/matchesHandler.js";

const players = [
  "Player 1",
  "Player 2",
  "Player 3",
  "Player 4",
  "Player 5",
  "Player 6",
  "Player 7",
  "Player 8",
  "Player 9",
  "Player 10",
];
const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
// console.log(day);
console.log(matchHandler(players, Number(day)));
