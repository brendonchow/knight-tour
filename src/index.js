import "normalize.css";
import "./style.css";
import Display from "./display";
import Board from "./board";

const squares = document.querySelectorAll(".square");
const startTourButton = document.querySelector(".start");
const restartButton = document.querySelector(".restart");
// Allow ability to place knight randomly
// Press start to start tour. Once start, can only place new knight after clear.
// Press pause to pause tour
// Set delay for between movements
// Be able to pause and go back and forth
const delay = 250;

let tourOngoing = false;

Board.initializeBoard(squares);
const clickSquare = (event) => {
  if (tourOngoing || Board.tourStarted === true) return;
  Board.placeInitial(event.target.getAttribute("pos"));
  Display.placeInitial(event.target);
};

squares.forEach((square) => square.addEventListener("click", clickSquare));

const moveKnight = (pos) => {
  const square = Board.getSquare(pos);
  Display.moveKnight(square);
};

const startTour = () => {
  tourOngoing = true;
  if (!Board.initialPos || Board.tourStarted) return;
  const moves = Board.startTour();
  let count = 0;

  const delayMove = () => {
    setTimeout(() => {
      // if (paused)
      // if (restart)
      moveKnight(moves[count]);
      count += 1;
      if (count === 64) {
        tourOngoing = false;
        return;
      }
      delayMove();
    }, delay);
  };
  delayMove();
};

startTourButton.addEventListener("click", startTour);

restartButton.addEventListener("click", () => {
  if (!Board.initialPos || tourOngoing || !Board.tourStarted) return;

  Display.restartTour(Board.getSquare(Board.initialPos));
  Board.restartTour();
  squares.forEach((square) => {
    Display.removeVisited(square);
  });
});
