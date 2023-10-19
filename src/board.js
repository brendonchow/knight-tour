import KnightsTour from "./knight_tour";

let startingPos = null;
let board = [];

const initializeBoard = (squares) => {
  let count = 0;
  let row = -1;
  board = [];
  squares.forEach((square) => {
    if (count % 8 === 0) {
      board.push([]);
      row += 1;
    }
    board[row].push(square);
    count += 1;
  });
};

const getSquare = (pos) => {
  const [x, y] = pos.split("").map((item) => parseInt(item, 10));
  const square = board[x][y];
  return square;
};

const placeInitial = (pos) => {
  startingPos = pos;
  return true;
};

const getInitial = () => startingPos;

const resetInitial = () => {
  startingPos = null;
};

const clear = () => {
  resetInitial();
};

const startTour = () => KnightsTour(startingPos);
export default {
  placeInitial,
  startTour,
  initializeBoard,
  getSquare,
  getInitial,
  resetInitial,
  clear,
  get initialPos() {
    return startingPos;
  },
};
