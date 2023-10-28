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

const resetInitial = () => {
  startingPos = null;
};

const clear = () => {
  resetInitial();
};

const calculated = {};
const startTour = () => {
  const getMoves = calculated[startingPos];
  if (getMoves) {
    return getMoves;
  }

  const moves = KnightsTour(startingPos);
  calculated[startingPos] = moves;
  return moves;
};
export default {
  placeInitial,
  startTour,
  initializeBoard,
  getSquare,
  resetInitial,
  clear,
  get initialPos() {
    return startingPos;
  },
};
