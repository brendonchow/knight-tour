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
let tourOngoing = false;
let restart = false;
let moves = null;
let index = 1;
let pausedOnMove = null;

const unpause = () => {
  paused = false;
  Display.unpause(pauseButton);
};

const pause = () => {
  paused = true;
  Display.pause(pauseButton);
};

const finishTour = () => {
  tourOngoing = false;
  restart = false;
  unpause();
};

const restartTour = () => {
  finishTour();
  moves = null;
  index = 1;
  tourStarted = false;
};

const restartAll = () => {
  if (!Board.initialPos || !tourStarted) return;

  if (paused || !tourOngoing) {
    restartTour();
  } else {
    restartTour();
    restart = true;
  }

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

const clickSquareEvent = (event) => {
  clickSquare(event.target);
};

squares.forEach((square) => square.addEventListener("click", clickSquareEvent));

const moveKnight = (pos) => {
  const square = Board.getSquare(pos);
  Display.moveKnight(square);
};

const startTour = () => {
  if (!Board.initialPos || (!paused && index !== 1)) return;

  unpause();
  tourStarted = true;
  tourOngoing = true;

  if (moves === null) moves = Board.startTour();

  const delayMove = () => {
    const move = () => {
      if (restart) {
        restart = false;
        return;
      }

      if (index === 64) {
        finishTour();
        return;
      }

      if (paused) {
        pausedOnMove = move;
        return;
      }

      moveKnight(moves[index]);
      index += 1;
      delayMove();
    };

    setTimeout(move, delay);
  };
  delayMove();
};

// Maybe pressing Start Tour while not paused makes index = 1 and restarts the tour.
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
  delay = parseFloat(event.target.value) * 1000;
});

pauseButton.addEventListener("click", () => {
  if (!tourOngoing) return;
  if (paused) {
    if (pausedOnMove) {
      setTimeout(() => {
        unpause();
        tourStarted = true;
        tourOngoing = true;
        pausedOnMove();
      }, delay);
    } else startTour();
  } else {
    pause();
  }
});

const navigateWithNextButton = () => {
  tourStarted = true;
  pause();
  tourOngoing = true;
};

nextButton.addEventListener("click", () => {
  if (Board.getInitial() && index === 1) {
    moves = Board.startTour();
  } else if (index >= 64) return;
  navigateWithNextButton();

  moveKnight(moves[index]);
  index += 1;

  if (index === 64) finishTour();
});

const unMoveKnight = () => {
  const square = Board.getSquare(moves[index - 2]);
  Display.placeInitial(square);
  Display.removeVisited(square);
};

previousButton.addEventListener("click", () => {
  if (index <= 1) return;
  navigateWithNextButton();
  unMoveKnight();
  index -= 1;
  if (index === 1) {
    unpause();
    tourStarted = false;
    tourOngoing = false;
  }
});

clickRandom();
