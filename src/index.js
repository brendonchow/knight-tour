import "normalize.css";
import "./style.css";
import Display from "./display";
import Board from "./board";

const squares = document.querySelectorAll(".square");
const startTourButton = document.querySelector(".start");
const restartButton = document.querySelector(".restart");
const randomButton = document.querySelector(".random");
const delayInput = document.querySelector(".delay");
const pauseButton = document.querySelector(".pause");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

let delay = 0;
let paused = false;
let tourStarted = false;
let moves = null;
let movesIndex = 1;
let currentMove;

const unpause = () => {
  paused = false;
  currentMove = null;
  Display.unpause(pauseButton);
};

const pause = () => {
  paused = true;
  currentMove = null;
  Display.pause(pauseButton);
  Display.closeDialogTourEnd();
  tourStarted = true;
  restartButton.disabled = false;
  previousButton.disabled = false;
  nextButton.disabled = false;
  pauseButton.disabled = false;
};

const finishTour = () => {
  Display.openDialogTourEnd();
  unpause();
  nextButton.disabled = true;
  pauseButton.disabled = true;
};

const restartTour = () => {
  unpause();
  Display.closeDialogTourEnd();
  movesIndex = 1;
  moves = null;
  tourStarted = false;
  previousButton.disabled = true;
  restartButton.disabled = true;
  nextButton.disabled = false;
  pauseButton.disabled = true;
};

const restartAll = () => {
  if (!Board.initialPos || !tourStarted) return;

  restartTour();

  Display.placeInitial(Board.getSquare(Board.initialPos));
  squares.forEach((square) => {
    Display.removeVisited(square);
  });
};

Board.initializeBoard(squares);
const clickSquare = (square) => {
  restartAll();
  Board.placeInitial(square.getAttribute("pos"));
  Display.placeInitial(square);
};

const clickSquareEvent = (event) => clickSquare(event.target);

squares.forEach((square) => {
  square.addEventListener("click", clickSquareEvent);

  const preventDefault = (event) => event.preventDefault();
  square.addEventListener("dragover", preventDefault);

  const dropKnight = (event) => {
    event.preventDefault();
    clickSquare(square);
  };
  square.addEventListener("drop", dropKnight);
});

const moveKnight = (pos) => {
  const square = Board.getSquare(pos);
  Display.moveKnight(square);
};

const delayMove = () => {
  const move = () => {
    if (currentMove !== move) {
      return;
    }
    moveKnight(moves[movesIndex]);
    movesIndex += 1;
    if (movesIndex >= 64) {
      finishTour();
    } else {
      delayMove();
    }
  };
  currentMove = move;
  setTimeout(move, delay);
};

// Returns false if next move should not happen else true
const clickNext = () => {
  if (movesIndex >= 64 || !Board.initialPos) return false;
  if (moves === null) moves = Board.startTour();
  pause();
  moveKnight(moves[movesIndex]);
  movesIndex += 1;

  if (movesIndex === 64) {
    finishTour();
    return false;
  }
  return true;
};

const startTour = () => {
  if (!clickNext()) return;
  unpause();
  delayMove();
};

startTourButton.addEventListener("click", () => {
  if (tourStarted) {
    restartAll();
  }

  startTour();
});

restartButton.addEventListener("click", restartAll);

const clickRandom = () => {
  restartAll();
  let randomX = Math.floor(Math.random() * 8);
  let randomY = Math.floor(Math.random() * 8);

  const initial = Board.initialPos;
  if (initial) {
    const [x, y] = initial.split("").map((item) => Number(item));
    while (randomX === x && randomY === y) {
      randomX = Math.floor(Math.random() * 8);
      randomY = Math.floor(Math.random() * 8);
    }
  }
  clickSquare(Board.getSquare(`${randomX}${randomY}`));
};

randomButton.addEventListener("click", clickRandom);

delayInput.addEventListener("input", (event) => {
  const value = parseFloat(event.target.value);
  if (value > 1000) {
    delayInput.reportValidity();
    delay = 1000;
  } else {
    delay = value;
  }
});

pauseButton.addEventListener("click", () => {
  if (movesIndex <= 1 || movesIndex >= 64) return;
  if (paused) {
    startTour();
  } else {
    pause();
  }
});

nextButton.addEventListener("click", clickNext);

const unMoveKnight = () => {
  const square = Board.getSquare(moves[movesIndex - 2]);
  Display.placeInitial(square);
  Display.removeVisited(square);
};

previousButton.addEventListener("click", () => {
  if (movesIndex <= 1 || !Board.initialPos) return;
  pause();
  unMoveKnight();
  movesIndex -= 1;
  if (movesIndex === 1) {
    restartTour();
  }
});

clickRandom();

// Index === 1
// yes no
// no yes
// no yes

// Mid: All yes

// Index === 64
// yes yes
// no yes
// yes no
