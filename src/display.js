import knightIcon from "./images/chess-knight.svg";
import moveSound from "./sound/move-self.mp3";

const moveAudio = new Audio();
moveAudio.src = moveSound;
const knight = new Image();
knight.src = knightIcon;
knight.addEventListener("click", (event) => event.stopPropagation());
knight.draggable = true;

let darkenPreviousSquare = null;

const playMoveAudio = () => {
  moveAudio.currentTime = 0;
  moveAudio.play();
};

const placeInitial = (square) => {
  knight.remove();
  square.appendChild(knight);
  darkenPreviousSquare = null;
  darkenPreviousSquare = () => square.classList.add("visited");
  playMoveAudio();
};

const moveKnight = (square) => {
  knight.remove();
  square.appendChild(knight);
  if (darkenPreviousSquare) darkenPreviousSquare();

  darkenPreviousSquare = () => square.classList.add("visited");
  playMoveAudio();
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
