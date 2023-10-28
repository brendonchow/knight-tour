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
  unpause();
};

const restartTour = () => {
  finishTour();
  movesIndex = 1;
  moves = null;
  tourStarted = false;
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

const navigateWithNextButton = () => {
  tourStarted = true;
  pause();
};

const clickNext = () => {
  if (movesIndex >= 64 || !Board.initialPos) return false;
  if (moves === null) moves = Board.startTour();
  navigateWithNextButton();
  moveKnight(moves[movesIndex]);
  movesIndex += 1;

  if (movesIndex === 64) {
    finishTour();
    return false;
  }
  return true;
};

const startTour = () => {
  if (!Board.initialPos) return;

  unpause();
  tourStarted = true;

  if (clickNext()) delayMove();
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
  navigateWithNextButton();
  unMoveKnight();
  movesIndex -= 1;
  if (movesIndex === 1) {
    restartTour();
  }
});

clickRandom();
