import knightIcon from "./images/chess-knight.svg";

const knight = new Image();
knight.src = knightIcon;
knight.addEventListener("click", (event) => event.stopPropagation());

let darkenPreviousSquare = null;

const placeInitial = (square) => {
  knight.remove();
  square.appendChild(knight);
  darkenPreviousSquare = null;
  darkenPreviousSquare = () => square.classList.add("visited");
};

const moveKnight = (square) => {
  knight.remove();
  square.appendChild(knight);
  if (darkenPreviousSquare) darkenPreviousSquare();

  darkenPreviousSquare = () => square.classList.add("visited");
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
  pause,
  unpause,
};
