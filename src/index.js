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
// Press start to start tour. Once start, can only place new knight after clear.
// Press pause to pause tour
// Be able to pause and go back and forth
let delay = 0;
let paused = false;
let tourOngoing = false;
let restart = false;

Board.initializeBoard(squares);
const clickSquare = (square) => {
  if (tourOngoing || Board.tourStarted) return;
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

const unpause = () => {
  paused = false;
  Display.unpause(pauseButton);
};

let pauseOnMove = null;

const restartGlobals = () => {
  unpause();
  restart = false;
  tourOngoing = false;
  pauseOnMove = null;
};

const startTour = () => {
  if (!Board.initialPos || Board.tourStarted) return;

  tourOngoing = true;
  const moves = Board.startTour();
  let count = 0;

  const delayMove = () => {
    setTimeout(() => {
      if (count === 64 || restart) {
        restartGlobals();
        return;
      }

      if (paused) {
        pauseOnMove = delayMove;
        return;
      }

      moveKnight(moves[count]);
      count += 1;
      delayMove();
    }, delay);
  };
  delayMove();
};

startTourButton.addEventListener("click", startTour);

restartButton.addEventListener("click", () => {
  if (!Board.initialPos || !Board.tourStarted) return;

  // restartGlobals makes paused === false
  if (paused || !tourOngoing) {
    restartGlobals();
  } else {
    restart = true;
  }

  Display.restartTour(Board.getSquare(Board.initialPos));
  Board.restartTour();
  squares.forEach((square) => {
    Display.removeVisited(square);
  });
});

randomButton.addEventListener("click", () => {
  if (tourOngoing || Board.tourStarted) return;
  const randomX = Math.floor(Math.random() * 8);
  const randomY = Math.floor(Math.random() * 8);
  const square = Board.getSquare(`${randomX}${randomY}`);
  clickSquare(square);
});

delayInput.addEventListener("input", (event) => {
  delay = parseFloat(event.target.value) * 1000;
});

pauseButton.addEventListener("click", () => {
  if (!tourOngoing) return;
  if (paused) {
    unpause();
    pauseOnMove();
  } else {
    paused = true;
    Display.pause(pauseButton);
  }
});
