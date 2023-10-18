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
// Press start to start tour. Once start, can only place new knight after clear.
// Press pause to pause tour
// Be able to pause and go back and forth
let delay = 0;
let paused = false;
let tourOngoing = false;
let restart = false;
let moves = null;
let index = 1;
// let clickedNext = false;

Board.initializeBoard(squares);
const clickSquare = (square) => {
  if (Board.tourStarted) return;
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

// let pauseOnMove = null;

const finishTour = () => {
  tourOngoing = false;
  // pauseOnMove = null;
  restart = false;
};

const restartTour = () => {
  finishTour();
  moves = null;
  index = 1;
  unpause();
  // clickedNext = false;
};

const startTour = () => {
  if (!Board.initialPos || (!paused && index !== 1)) return;

  tourOngoing = true;
  if (moves === null) moves = Board.startTour();

  const delayMove = () => {
    setTimeout(() => {
      if (restart) {
        restart = false;
        return;
      }

      if (index === 64) {
        finishTour();
        paused = true;
        return;
      }

      // if (paused && clickedNext) {
      //   clickedNext = false;
      // }
      if (paused) {
        // pauseOnMove = delayMove;
        return;
      }

      moveKnight(moves[index]);
      index += 1;
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
    restartTour();
  } else {
    restartTour();
    restart = true;
  }

  Display.placeInitial(Board.getSquare(Board.initialPos));
  Board.restartTour();
  squares.forEach((square) => {
    Display.removeVisited(square);
  });
});

randomButton.addEventListener("click", () => {
  if (Board.tourStarted) return;
  const randomX = Math.floor(Math.random() * 8);
  const randomY = Math.floor(Math.random() * 8);
  const square = Board.getSquare(`${randomX}${randomY}`);
  clickSquare(square);
});

delayInput.addEventListener("input", (event) => {
  delay = parseFloat(event.target.value) * 1000;
});

const pause = () => {
  paused = true;
  Display.pause(pauseButton);
};

pauseButton.addEventListener("click", () => {
  if (!tourOngoing) return;
  if (paused) {
    startTour();
    unpause();
  } else {
    pause();
  }
});

const navigateWithNextButton = () => {
  Board.tourStarted = true;
  pause();
  tourOngoing = true;
};

// Be able to work even if not startTour is not pressed. Remove delay
nextButton.addEventListener("click", () => {
  if (index === 1) {
    moves = Board.startTour();
  } else if (!paused || index >= 64) return;
  moveKnight(moves[index]);
  index += 1;
  navigateWithNextButton();

  if (index === 64) finishTour();
});

const unMoveKnight = () => {
  const square = Board.getSquare(moves[index - 2]);
  Display.placeInitial(square);
  Display.removeVisited(square);
};

previousButton.addEventListener("click", () => {
  if (!paused || index <= 1) return;
  unMoveKnight();
  index -= 1;
  navigateWithNextButton();
});
