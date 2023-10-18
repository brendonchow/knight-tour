import KnightsTour from "./knight_tour";

// const BOARD_SIZE = 8;

// const setKnightTourResult = (object, pos) => {
//   const objectCopy = object;
//   objectCopy[pos] = KnightsTour(pos);
//   if (!objectCopy[pos])
//     throw Error(
//       `Knight's Tour not find with starting position ${pos.split("")}`,
//     );
// };

// const generateKnightTours = () => {
//   const results = {};
//   for (let i = 0; i < BOARD_SIZE; i += 1) {
//     for (let j = 0; j < BOARD_SIZE; j += 1) {
//       setTimeout(() => setKnightTourResult(results, `${i}${j}`), 0);
//     }
//   }
//   return results;
// };

// const knightTours = generateKnightTours();
// const knightTours = {};
let startingPos = null;
let tourStarted = false;
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

// const initializeBoard = () => {
//   const array = [];
//   for (let i = 0; i < BOARD_SIZE; i += 1) {
//     array.push([]);
//     for (let j = 0; j < BOARD_SIZE; j += 1) {
//       array[i][j] = "";
//     }
//   }
//   return array;
// };

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

const restartTour = () => {
  tourStarted = false;
};

const resetInitial = () => {
  startingPos = null;
};

const clear = () => {
  resetInitial();
  restartTour();
};
// const moveKnight = (pos) => {

// }

const startTour = () => {
  tourStarted = true;
  return KnightsTour(startingPos);
  // knightMoves = knightTours[startingPos];
  // return knightMoves;
};

// const board = initializeBoard();
export default {
  placeInitial,
  startTour,
  initializeBoard,
  getSquare,
  getInitial,
  resetInitial,
  restartTour,
  clear,
  get initialPos() {
    return startingPos;
  },
  get tourStarted() {
    return tourStarted;
  },
  set tourStarted(val) {
    tourStarted = val;
  },
};
