import knightIcon from "./images/chess-knight.svg";
import moveSound from "./sound/move-self.mp3";
import vOn from "./images/volume-high.svg";

const volumeDiv = document.querySelector(".volume");
const volumeOff = document.querySelector(".volume-off");
const dialogTourEnd = document.querySelector(".tour-end");

const moveAudio = new Audio();
moveAudio.muted = true;
moveAudio.src = moveSound;
const volumeOn = new Image();
volumeOn.src = vOn;
const knight = new Image();
knight.src = knightIcon;
knight.addEventListener("click", (event) => event.stopPropagation());
knight.draggable = true;

let darkenPreviousSquare = null;

const openDialogTourEnd = () => {
  dialogTourEnd.show();
  knight.style.opacity = "0.2";
};
const closeDialogTourEnd = () => {
  dialogTourEnd.close();
  knight.style.opacity = "";
};

const turnVolumeOff = () => {
  volumeOn.remove();
  volumeDiv.appendChild(volumeOff);
  moveAudio.muted = true;
};

const turnVolumeOn = () => {
  volumeOff.remove();
  volumeDiv.appendChild(volumeOn);
  moveAudio.muted = false;
};

volumeOn.addEventListener("click", turnVolumeOff);
volumeOff.addEventListener("click", turnVolumeOn);

const playMoveAudio = () => {
  moveAudio.currentTime = 0;
  const promise = moveAudio.play();
  if (promise !== undefined) {
    promise.catch(() => {});
  }
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
  openDialogTourEnd,
  closeDialogTourEnd,
};
