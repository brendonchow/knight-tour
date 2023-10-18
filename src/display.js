import knightIcon from "./images/chess-knight.svg";

const knight = new Image();
knight.src = knightIcon;
knight.addEventListener("click", (event) => event.stopPropagation());

let darkenPreviousSquare = null;

const placeInitial = (square) => {
  knight.remove();
  square.appendChild(knight);
};

const restartTour = (square) => {
  placeInitial(square);
  darkenPreviousSquare = null;
};

const moveKnight = (square) => {
  placeInitial(square);
  if (darkenPreviousSquare) darkenPreviousSquare();

  darkenPreviousSquare = () => {
    square.classList.add("visited");
  };
};

const removeVisited = (square) => {
  square.classList.remove("visited");
};

const removeKnight = () => {
  darkenPreviousSquare = null;
  knight.remove();
};

const pause = (button) => {
  const buttonCopy = button;
  buttonCopy.textContent = "Continue";
};

const unpause = (button) => {
  const buttonCopy = button;
  buttonCopy.textContent = "Pause";
};

export default {
  placeInitial,
  removeVisited,
  removeKnight,
  moveKnight,
  restartTour,
  pause,
  unpause,
};
