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
// Add sound when knight moves

let delay = 0;
let paused = false;
let tourStarted = false;
let tourOngoing = false;
let moves = null;
let index = 1;
let count = 0;

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

  restartTour();
  count += 1;

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
    clickSquareEvent(event);
  };
  square.addEventListener("drop", dropKnight);
});

const moveKnight = (pos) => {
  const square = Board.getSquare(pos);
  Display.moveKnight(square);
};

const delayMove = async () => {
  try {
    await new Promise((resolve, reject) => {
      count += 1;
      const current = count;
      setTimeout(() => {
        if (count === current) resolve();
        else reject();
      }, delay);
    });
  } catch {
    return;
  }

  if (index === 64) {
    finishTour();
  } else if (!paused) {
    moveKnight(moves[index]);
    index += 1;
    delayMove();
  }
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
  delay = parseFloat(event.target.value) * 1000;
});

const navigateWithNextButton = () => {
  tourStarted = true;
  pause();
  tourOngoing = true;
};

const clickNext = () => {
  if (Board.getInitial() && index === 1) {
    moves = Board.startTour();
  } else if (index >= 64) return;
  navigateWithNextButton();

  moveKnight(moves[index]);
  index += 1;

  if (index === 64) finishTour();
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
    // To reject promise in delayMove
    count += 1;
  }
});

clickRandom();
