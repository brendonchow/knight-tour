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

// Add dialog when tour finishes

let delay = 0;
let paused = false;
let tourStarted = false;
let tourOngoing = false;
let moves = null;
let movesIndex = 1;
let delayMoveCount = 0;

const unpause = () => {
  paused = false;
  delayMoveCount += 1;
  Display.unpause(pauseButton);
};

const pause = () => {
  paused = true;
  delayMoveCount += 1;
  Display.pause(pauseButton);
};

const finishTour = () => {
  tourOngoing = false;
  unpause();
};

const restartTour = () => {
  finishTour();
  movesIndex = 1;
  tourStarted = false;
};

const restartAll = () => {
  if (!Board.initialPos || !tourStarted) return;

  restartTour();
  delayMoveCount += 1;

  Display.placeInitial(Board.getSquare(Board.initialPos));
  squares.forEach((square) => {
    Display.removeVisited(square);
  });
};

Board.initializeBoard(squares);
const clickSquare = (square) => {
  restartAll();
  moves = null;
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
  delayMoveCount += 1;
  const current = delayMoveCount;
  const move = () => {
    if (current !== delayMoveCount) return;
    if (movesIndex === 64) {
      finishTour();
    } else {
      moveKnight(moves[movesIndex]);
      movesIndex += 1;
      delayMove();
    }
  };
  setTimeout(move, delay);
};

const startTour = () => {
  if (!Board.initialPos) return;

  unpause();
  tourStarted = true;
  tourOngoing = true;

  if (moves === null) moves = Board.startTour();
  delayMove();
};

startTourButton.addEventListener("click", () => {
  if (tourStarted) {
    const movesCopy = moves;
    restartAll();
    moves = movesCopy;
  } else {
    restartAll();
  }

  startTour();
});

restartButton.addEventListener("click", restartAll);

const clickRandom = () => {
  restartAll();
  const randomX = Math.floor(Math.random() * 8);
  const randomY = Math.floor(Math.random() * 8);
  const square = Board.getSquare(`${randomX}${randomY}`);
  clickSquare(square);
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

const navigateWithNextButton = () => {
  tourStarted = true;
  pause();
  tourOngoing = true;
};

const clickNext = () => {
  if (movesIndex >= 64 || !Board.getInitial()) return;
  if (movesIndex === 1) moves = Board.startTour();

  moveKnight(moves[movesIndex]);
  movesIndex += 1;

  if (movesIndex === 64) finishTour();
};

pauseButton.addEventListener("click", () => {
  if (!tourOngoing) return;
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
  if (movesIndex <= 1 || !Board.getInitial()) return;
  navigateWithNextButton();
  unMoveKnight();
  movesIndex -= 1;
  if (movesIndex === 1) {
    unpause();
    tourStarted = false;
    tourOngoing = false;
  }
});

clickRandom();
