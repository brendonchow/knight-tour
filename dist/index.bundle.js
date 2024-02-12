"use strict";
(self["webpackChunkknight_tour"] = self["webpackChunkknight_tour"] || []).push([["index"],{

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _knight_tour__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./knight_tour */ "./src/knight_tour.js");

let startingPos = null;
let board = [];
const initializeBoard = squares => {
  let count = 0;
  let row = -1;
  board = [];
  squares.forEach(square => {
    if (count % 8 === 0) {
      board.push([]);
      row += 1;
    }
    board[row].push(square);
    count += 1;
  });
};
const getSquare = pos => {
  const [x, y] = pos.split("").map(item => parseInt(item, 10));
  const square = board[x][y];
  return square;
};
const placeInitial = pos => {
  startingPos = pos;
  return true;
};
const resetInitial = () => {
  startingPos = null;
};
const clear = () => {
  resetInitial();
};
const calculated = {};
const startTour = () => {
  const getMoves = calculated[startingPos];
  if (getMoves) {
    return getMoves;
  }
  const moves = (0,_knight_tour__WEBPACK_IMPORTED_MODULE_0__["default"])(startingPos);
  calculated[startingPos] = moves;
  return moves;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  placeInitial,
  startTour,
  initializeBoard,
  getSquare,
  resetInitial,
  clear,
  get initialPos() {
    return startingPos;
  }
});

/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _images_chess_knight_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/chess-knight.svg */ "./src/images/chess-knight.svg");
/* harmony import */ var _sound_move_self_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sound/move-self.mp3 */ "./src/sound/move-self.mp3");
/* harmony import */ var _images_volume_off_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/volume-off.svg */ "./src/images/volume-off.svg");



const volumeDiv = document.querySelector(".volume");
const volumeOn = document.querySelector(".volume-on");
const dialogTourEnd = document.querySelector(".tour-end");
const moveAudio = new Audio();
moveAudio.muted = false;
moveAudio.src = _sound_move_self_mp3__WEBPACK_IMPORTED_MODULE_1__;
const volumeOff = new Image();
volumeOff.src = _images_volume_off_svg__WEBPACK_IMPORTED_MODULE_2__;
const knight = new Image();
knight.src = _images_chess_knight_svg__WEBPACK_IMPORTED_MODULE_0__;
knight.alt = "Knight Icon";
knight.style.width = "100%";
knight.style.height = "100%";
knight.addEventListener("click", event => event.stopPropagation());
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
const placeInitial = square => {
  knight.remove();
  square.appendChild(knight);
  darkenPreviousSquare = null;
  darkenPreviousSquare = () => square.classList.add("visited");
  playMoveAudio();
};
const moveKnight = square => {
  knight.remove();
  square.appendChild(knight);
  if (darkenPreviousSquare) darkenPreviousSquare();
  darkenPreviousSquare = () => square.classList.add("visited");
  playMoveAudio();
};
const removeVisited = square => {
  square.classList.remove("visited");
};
const removeKnight = () => {
  darkenPreviousSquare = null;
  knight.remove();
};
const pause = button => {
  const buttonCopy = button;
  buttonCopy.textContent = "Continue";
};
const unpause = button => {
  const buttonCopy = button;
  buttonCopy.textContent = "Pause";
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  placeInitial,
  removeVisited,
  removeKnight,
  moveKnight,
  pause,
  unpause,
  openDialogTourEnd,
  closeDialogTourEnd
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./board */ "./src/board.js");




const squares = document.querySelectorAll(".square");
const startTourButton = document.querySelector(".start");
const restartButton = document.querySelector(".restart");
const randomButton = document.querySelector(".random");
const delayInput = document.querySelector(".delay");
const pauseButton = document.querySelector(".pause");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
let delay = parseInt(delayInput.value, 10);
let paused = false;
let tourStarted = false;
let moves = null;
let movesIndex = 1;
let currentMove;
const unpause = () => {
  paused = false;
  currentMove = null;
  _display__WEBPACK_IMPORTED_MODULE_2__["default"].unpause(pauseButton);
};
const pause = () => {
  paused = true;
  currentMove = null;
  _display__WEBPACK_IMPORTED_MODULE_2__["default"].pause(pauseButton);
  _display__WEBPACK_IMPORTED_MODULE_2__["default"].closeDialogTourEnd();
  tourStarted = true;
  restartButton.disabled = false;
  previousButton.disabled = false;
  nextButton.disabled = false;
  pauseButton.disabled = false;
};
const finishTour = () => {
  _display__WEBPACK_IMPORTED_MODULE_2__["default"].openDialogTourEnd();
  unpause();
  nextButton.disabled = true;
  pauseButton.disabled = true;
};
const restartTour = () => {
  unpause();
  _display__WEBPACK_IMPORTED_MODULE_2__["default"].closeDialogTourEnd();
  movesIndex = 1;
  moves = null;
  tourStarted = false;
  previousButton.disabled = true;
  restartButton.disabled = true;
  nextButton.disabled = false;
  pauseButton.disabled = true;
};
const restartAll = () => {
  if (!_board__WEBPACK_IMPORTED_MODULE_3__["default"].initialPos || !tourStarted) return;
  restartTour();
  _display__WEBPACK_IMPORTED_MODULE_2__["default"].placeInitial(_board__WEBPACK_IMPORTED_MODULE_3__["default"].getSquare(_board__WEBPACK_IMPORTED_MODULE_3__["default"].initialPos));
  squares.forEach(square => {
    _display__WEBPACK_IMPORTED_MODULE_2__["default"].removeVisited(square);
  });
};
_board__WEBPACK_IMPORTED_MODULE_3__["default"].initializeBoard(squares);
const clickSquare = square => {
  restartAll();
  _board__WEBPACK_IMPORTED_MODULE_3__["default"].placeInitial(square.getAttribute("pos"));
  _display__WEBPACK_IMPORTED_MODULE_2__["default"].placeInitial(square);
};
const clickSquareEvent = event => clickSquare(event.target);
squares.forEach(square => {
  square.addEventListener("click", clickSquareEvent);
  const preventDefault = event => event.preventDefault();
  square.addEventListener("dragover", preventDefault);
  const dropKnight = event => {
    event.preventDefault();
    clickSquare(square);
  };
  square.addEventListener("drop", dropKnight);
});
const moveKnight = pos => {
  const square = _board__WEBPACK_IMPORTED_MODULE_3__["default"].getSquare(pos);
  _display__WEBPACK_IMPORTED_MODULE_2__["default"].moveKnight(square);
};
const delayMove = () => {
  const move = () => {
    if (currentMove !== move) {
      return;
    }
    moveKnight(moves[movesIndex]);
    movesIndex += 1;
    if (movesIndex >= 64) {
      finishTour();
    } else {
      delayMove();
    }
  };
  currentMove = move;
  setTimeout(move, delay);
};

// Returns false if next move should not happen else true
const clickNext = () => {
  if (movesIndex >= 64 || !_board__WEBPACK_IMPORTED_MODULE_3__["default"].initialPos) return false;
  if (moves === null) moves = _board__WEBPACK_IMPORTED_MODULE_3__["default"].startTour();
  pause();
  moveKnight(moves[movesIndex]);
  movesIndex += 1;
  if (movesIndex === 64) {
    finishTour();
    return false;
  }
  return true;
};
const startTour = () => {
  if (!clickNext()) return;
  unpause();
  delayMove();
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
  let randomX = Math.floor(Math.random() * 8);
  let randomY = Math.floor(Math.random() * 8);
  const initial = _board__WEBPACK_IMPORTED_MODULE_3__["default"].initialPos;
  if (initial) {
    const [x, y] = initial.split("").map(item => Number(item));
    while (randomX === x && randomY === y) {
      randomX = Math.floor(Math.random() * 8);
      randomY = Math.floor(Math.random() * 8);
    }
  }
  clickSquare(_board__WEBPACK_IMPORTED_MODULE_3__["default"].getSquare(`${randomX}${randomY}`));
};
randomButton.addEventListener("click", clickRandom);
delayInput.addEventListener("input", event => {
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
  const square = _board__WEBPACK_IMPORTED_MODULE_3__["default"].getSquare(moves[movesIndex - 2]);
  _display__WEBPACK_IMPORTED_MODULE_2__["default"].placeInitial(square);
  _display__WEBPACK_IMPORTED_MODULE_2__["default"].removeVisited(square);
};
previousButton.addEventListener("click", () => {
  if (movesIndex <= 1 || !_board__WEBPACK_IMPORTED_MODULE_3__["default"].initialPos) return;
  pause();
  unMoveKnight();
  movesIndex -= 1;
  if (movesIndex === 1) {
    restartTour();
  }
});
clickRandom();

/***/ }),

/***/ "./src/knight_tour.js":
/*!****************************!*\
  !*** ./src/knight_tour.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getAllPossibleMoves = pos => {
  const position = pos.split("").map(item => parseInt(item, 10));
  const set = new Set();
  const moveKnight = (start, x, y) => {
    const newPosition = [start[0] + x, start[1] + y];
    if (newPosition[0] <= 7 && newPosition[0] >= 0 && newPosition[1] <= 7 && newPosition[1] >= 0) set.add(`${newPosition[0]}${newPosition[1]}`);
  };
  moveKnight(position, 2, 1);
  moveKnight(position, 2, -1);
  moveKnight(position, -2, 1);
  moveKnight(position, -2, -1);
  moveKnight(position, 1, 2);
  moveKnight(position, 1, -2);
  moveKnight(position, -1, 2);
  moveKnight(position, -1, -2);
  return set;
};
const initializeGraph = () => {
  const graph = {};
  for (let i = 0; i <= 7; i += 1) {
    for (let j = 0; j <= 7; j += 1) {
      graph[`${i}${j}`] = getAllPossibleMoves(`${i}${j}`);
    }
  }
  return {
    size: 64,
    graph
  };
};
const removeNode = (pos, graph) => {
  const graphClone = graph;
  const edges = graphClone.graph[pos];
  edges.forEach(edge => {
    const neighbourEdges = graphClone.graph[edge];
    neighbourEdges.delete(pos);
  });
  delete graphClone.graph[pos];
  graphClone.size -= 1;
  return edges;
};
const resetGraph = (pos, graph, edges) => {
  const graphClone = graph;
  graphClone.size += 1;
  graphClone.graph[pos] = edges;
  edges.forEach(edge => {
    const neighbourEdges = graphClone.graph[edge];
    neighbourEdges.add(pos);
  });
};
const knightMoves = function (pos) {
  let graph = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : initializeGraph();
  let moves = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  const edges = removeNode(pos, graph);
  moves.push(pos);
  if (graph.size === 0) {
    return moves;
  }
  if (edges.size === 0) {
    resetGraph(pos, graph, edges);
    moves.pop();
    return null;
  }
  let bestMoves = [];
  let minSize = Infinity;
  edges.forEach(edge => {
    const {
      size
    } = graph.graph[edge];
    if (bestMoves.length === 0) {
      bestMoves = [edge];
      minSize = size;
    } else if (size < minSize) {
      bestMoves = [edge];
      minSize = size;
    } else if (size === minSize) {
      bestMoves.push(edge);
    }
  });
  for (let i = 0; i < bestMoves.length; i += 1) {
    const result = knightMoves(bestMoves[i], graph, moves);
    if (result) return result;
  }
  resetGraph(pos, graph, edges);
  moves.pop();
  return null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (knightMoves);
// TESTING
// const test = () => {
//   let max = -Infinity;
//   let average = 0;
//   for (let i = 0; i <= 7; i += 1) {
//     for (let j = 0; j <= 7; j += 1) {
//       const start = performance.now();
//       const result = knightMoves(`${i}${j}`);
//       const end = performance.now();
//       if (result) {
//         if (result.length !== 64)
//           throw Error(`Failed on ${i}${j}. Route has too many moves.`);
//         const graph = initializeGraph();
//         result.forEach((pos) => {
//           if (!graph.graph[pos]) {
//             throw Error(`Failed on ${i}${j}. Square visited more than once.`);
//           }
//           delete graph.graph[pos];
//         });
//         Object.keys(graph.graph).forEach(() => {
//           throw Error(`Failed on ${i}${j}. Not all squares visited.`);
//         });
//         const time = end - start;
//         if (time > max) max = time;
//         average += time;
//       } else {
//         throw Error(`Failed on ${i}${j}. Could not find a route.`);
//       }
//     }
//   }
//   console.log(`Max time taken: ${max} ms`);
//   console.log(`Average time taken: ${average / 64} ms`);
// };
// test();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css ***!
  \****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */

main {
  display: block;
}

/**
 * Correct the font size and margin on \`h1\` elements within \`section\` and
 * \`article\` contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from \`fieldset\` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    \`fieldset\` elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to \`inherit\` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}
`, "",{"version":3,"sources":["webpack://./node_modules/normalize.css/normalize.css"],"names":[],"mappings":"AAAA,2EAA2E;;AAE3E;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,iBAAiB,EAAE,MAAM;EACzB,8BAA8B,EAAE,MAAM;AACxC;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,SAAS;AACX;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,uBAAuB,EAAE,MAAM;EAC/B,SAAS,EAAE,MAAM;EACjB,iBAAiB,EAAE,MAAM;AAC3B;;AAEA;;;EAGE;;AAEF;EACE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,6BAA6B;AAC/B;;AAEA;;;EAGE;;AAEF;EACE,mBAAmB,EAAE,MAAM;EAC3B,0BAA0B,EAAE,MAAM;EAClC,iCAAiC,EAAE,MAAM;AAC3C;;AAEA;;EAEE;;AAEF;;EAEE,mBAAmB;AACrB;;AAEA;;;EAGE;;AAEF;;;EAGE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,cAAc;EACd,cAAc;EACd,kBAAkB;EAClB,wBAAwB;AAC1B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,WAAW;AACb;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;;;;;EAKE,oBAAoB,EAAE,MAAM;EAC5B,eAAe,EAAE,MAAM;EACvB,iBAAiB,EAAE,MAAM;EACzB,SAAS,EAAE,MAAM;AACnB;;AAEA;;;EAGE;;AAEF;QACQ,MAAM;EACZ,iBAAiB;AACnB;;AAEA;;;EAGE;;AAEF;SACS,MAAM;EACb,oBAAoB;AACtB;;AAEA;;EAEE;;AAEF;;;;EAIE,0BAA0B;AAC5B;;AAEA;;EAEE;;AAEF;;;;EAIE,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE;;AAEF;;;;EAIE,8BAA8B;AAChC;;AAEA;;EAEE;;AAEF;EACE,8BAA8B;AAChC;;AAEA;;;;;EAKE;;AAEF;EACE,sBAAsB,EAAE,MAAM;EAC9B,cAAc,EAAE,MAAM;EACtB,cAAc,EAAE,MAAM;EACtB,eAAe,EAAE,MAAM;EACvB,UAAU,EAAE,MAAM;EAClB,mBAAmB,EAAE,MAAM;AAC7B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,sBAAsB,EAAE,MAAM;EAC9B,UAAU,EAAE,MAAM;AACpB;;AAEA;;EAEE;;AAEF;;EAEE,YAAY;AACd;;AAEA;;;EAGE;;AAEF;EACE,6BAA6B,EAAE,MAAM;EACrC,oBAAoB,EAAE,MAAM;AAC9B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;;EAGE;;AAEF;EACE,0BAA0B,EAAE,MAAM;EAClC,aAAa,EAAE,MAAM;AACvB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,aAAa;AACf;;AAEA;;EAEE;;AAEF;EACE,aAAa;AACf","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  --hover-brightness: 90%;
  --active-brightness: 80%;
}

html {
  box-sizing: border-box;
  font-family: Roboto, system-ui, "Segoe UI", Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: white;
}

*,
*::before,
*::after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
  border: none;
}

h1 {
  /* To override Normalize.css h1 margin */
  margin: 0;
}

body {
  display: grid;
  grid-template-columns: auto max-content;
  overflow: hidden;
}

.board {
  height: 100vh;
  aspect-ratio: 1;
  display: grid;
  grid-auto-rows: minmax(0, 1fr);
  position: relative;
  user-select: none;
}

.board-row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.square {
  background-color: rgb(240, 217, 181);
}

.black {
  background-color: rgb(181, 136, 99);
}

.user {
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 2vw;
  display: grid;
  align-content: start;
  gap: 50px;
  justify-items: center;
  position: relative;
}

button:not([disabled]) {
  cursor: pointer;
}

button {
  background-color: white;
  padding: 10px 20px;
  width: calc(100% - 5vw);
}

.title {
  font-size: 50px;
  text-align: center;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 25px;
  width: 100%;
  justify-items: center;
}

button:hover:not([disabled]) {
  filter: brightness(var(--hover-brightness));
}
button:active:not([disabled]) {
  filter: brightness(var(--active-brightness));
}

.delay-wrapper {
  display: grid;
  justify-items: center;
  font-size: 20px;
  text-align: center;
}

.delay {
  padding: 5px 10px;
  margin-top: 25px;
  width: 50%;
}

.visited {
  background-color: red;
}

.button-wrapper {
  width: 100%;
  text-align: center;
}

.volume {
  text-align: right;
  position: absolute;
  right: 1vw;
  bottom: 1vw;
}

.volume > img {
  cursor: pointer;
  width: 5vw;
  aspect-ratio: 1;
  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(36deg)
    brightness(105%) contrast(101%);
}

.volume > img:hover {
  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(36deg)
    brightness(90%) contrast(101%);
}

.volume > img:active {
  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(36deg)
    brightness(80%) contrast(101%);
}

.tour-end[open] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  font-size: calc(28px + 0.1vw);
  color: rgb(20, 20, 20);
  pointer-events: none;
}

.tour-end:focus {
  outline: none;
}

.tour-end > h1 {
  font-weight: 1000;
}

.description {
  text-align: center;
  line-height: 2rem;
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,uBAAuB;EACvB,wBAAwB;AAC1B;;AAEA;EACE,sBAAsB;EACtB;4DAC0D;EAC1D,YAAY;AACd;;AAEA;;;EAGE,mBAAmB;EACnB,UAAU;EACV,SAAS;EACT,YAAY;AACd;;AAEA;EACE,wCAAwC;EACxC,SAAS;AACX;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,aAAa;EACb,8BAA8B;EAC9B,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,qCAAqC;AACvC;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,oCAAoC;EACpC,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,SAAS;EACT,qBAAqB;EACrB,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,uBAAuB;AACzB;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,aAAa;EACb,WAAW;EACX,qBAAqB;AACvB;;AAEA;EACE,2CAA2C;AAC7C;AACA;EACE,4CAA4C;AAC9C;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,UAAU;AACZ;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,UAAU;EACV,WAAW;AACb;;AAEA;EACE,eAAe;EACf,UAAU;EACV,eAAe;EACf;mCACiC;AACnC;;AAEA;EACE;kCACgC;AAClC;;AAEA;EACE;kCACgC;AAClC;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,6BAA6B;EAC7B,6BAA6B;EAC7B,sBAAsB;EACtB,oBAAoB;AACtB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;AACnB","sourcesContent":[":root {\n  --hover-brightness: 90%;\n  --active-brightness: 80%;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-family: Roboto, system-ui, \"Segoe UI\", Helvetica, Arial, sans-serif,\n    \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  color: white;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit;\n  padding: 0;\n  margin: 0;\n  border: none;\n}\n\nh1 {\n  /* To override Normalize.css h1 margin */\n  margin: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-columns: auto max-content;\n  overflow: hidden;\n}\n\n.board {\n  height: 100vh;\n  aspect-ratio: 1;\n  display: grid;\n  grid-auto-rows: minmax(0, 1fr);\n  position: relative;\n  user-select: none;\n}\n\n.board-row {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n}\n\n.square {\n  background-color: rgb(240, 217, 181);\n}\n\n.black {\n  background-color: rgb(181, 136, 99);\n}\n\n.user {\n  background-color: rgba(0, 0, 0, 0.9);\n  color: white;\n  padding: 2vw;\n  display: grid;\n  align-content: start;\n  gap: 50px;\n  justify-items: center;\n  position: relative;\n}\n\nbutton:not([disabled]) {\n  cursor: pointer;\n}\n\nbutton {\n  background-color: white;\n  padding: 10px 20px;\n  width: calc(100% - 5vw);\n}\n\n.title {\n  font-size: 50px;\n  text-align: center;\n}\n\n.buttons {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  row-gap: 25px;\n  width: 100%;\n  justify-items: center;\n}\n\nbutton:hover:not([disabled]) {\n  filter: brightness(var(--hover-brightness));\n}\nbutton:active:not([disabled]) {\n  filter: brightness(var(--active-brightness));\n}\n\n.delay-wrapper {\n  display: grid;\n  justify-items: center;\n  font-size: 20px;\n  text-align: center;\n}\n\n.delay {\n  padding: 5px 10px;\n  margin-top: 25px;\n  width: 50%;\n}\n\n.visited {\n  background-color: red;\n}\n\n.button-wrapper {\n  width: 100%;\n  text-align: center;\n}\n\n.volume {\n  text-align: right;\n  position: absolute;\n  right: 1vw;\n  bottom: 1vw;\n}\n\n.volume > img {\n  cursor: pointer;\n  width: 5vw;\n  aspect-ratio: 1;\n  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(36deg)\n    brightness(105%) contrast(101%);\n}\n\n.volume > img:hover {\n  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(36deg)\n    brightness(90%) contrast(101%);\n}\n\n.volume > img:active {\n  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(36deg)\n    brightness(80%) contrast(101%);\n}\n\n.tour-end[open] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: transparent;\n  font-size: calc(28px + 0.1vw);\n  color: rgb(20, 20, 20);\n  pointer-events: none;\n}\n\n.tour-end:focus {\n  outline: none;\n}\n\n.tour-end > h1 {\n  font-weight: 1000;\n}\n\n.description {\n  text-align: center;\n  line-height: 2rem;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/normalize.css/normalize.css":
/*!**************************************************!*\
  !*** ./node_modules/normalize.css/normalize.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../css-loader/dist/cjs.js!./normalize.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/images/chess-knight.svg":
/*!*************************************!*\
  !*** ./src/images/chess-knight.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "src/images/chess-knight..svg";

/***/ }),

/***/ "./src/images/volume-off.svg":
/*!***********************************!*\
  !*** ./src/images/volume-off.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "src/images/volume-off..svg";

/***/ }),

/***/ "./src/sound/move-self.mp3":
/*!*********************************!*\
  !*** ./src/sound/move-self.mp3 ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "src/images/move-self..mp3";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxnRkFBZ0YsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE1BQU0sT0FBTyxXQUFXLE1BQU0sT0FBTyxZQUFZLFdBQVcsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsS0FBSyxPQUFPLE9BQU8sS0FBSyxLQUFLLE9BQU8sT0FBTyxLQUFLLEtBQUssT0FBTyxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsaUNBQWlDLDRCQUE0Qiw2QkFBNkIsR0FBRyxVQUFVLDJCQUEyQixvSkFBb0osaUJBQWlCLEdBQUcsOEJBQThCLHdCQUF3QixlQUFlLGNBQWMsaUJBQWlCLEdBQUcsUUFBUSwyREFBMkQsR0FBRyxVQUFVLGtCQUFrQiw0Q0FBNEMscUJBQXFCLEdBQUcsWUFBWSxrQkFBa0Isb0JBQW9CLGtCQUFrQixtQ0FBbUMsdUJBQXVCLHNCQUFzQixHQUFHLGdCQUFnQixrQkFBa0IsMENBQTBDLEdBQUcsYUFBYSx5Q0FBeUMsR0FBRyxZQUFZLHdDQUF3QyxHQUFHLFdBQVcseUNBQXlDLGlCQUFpQixpQkFBaUIsa0JBQWtCLHlCQUF5QixjQUFjLDBCQUEwQix1QkFBdUIsR0FBRyw0QkFBNEIsb0JBQW9CLEdBQUcsWUFBWSw0QkFBNEIsdUJBQXVCLDRCQUE0QixHQUFHLFlBQVksb0JBQW9CLHVCQUF1QixHQUFHLGNBQWMsa0JBQWtCLG1DQUFtQyxrQkFBa0IsZ0JBQWdCLDBCQUEwQixHQUFHLGtDQUFrQyxnREFBZ0QsR0FBRyxpQ0FBaUMsaURBQWlELEdBQUcsb0JBQW9CLGtCQUFrQiwwQkFBMEIsb0JBQW9CLHVCQUF1QixHQUFHLFlBQVksc0JBQXNCLHFCQUFxQixlQUFlLEdBQUcsY0FBYywwQkFBMEIsR0FBRyxxQkFBcUIsZ0JBQWdCLHVCQUF1QixHQUFHLGFBQWEsc0JBQXNCLHVCQUF1QixlQUFlLGdCQUFnQixHQUFHLG1CQUFtQixvQkFBb0IsZUFBZSxvQkFBb0IseUdBQXlHLEdBQUcseUJBQXlCLHdHQUF3RyxHQUFHLDBCQUEwQix3R0FBd0csR0FBRyxxQkFBcUIsdUJBQXVCLGFBQWEsY0FBYyxxQ0FBcUMsa0NBQWtDLGtDQUFrQywyQkFBMkIseUJBQXlCLEdBQUcscUJBQXFCLGtCQUFrQixHQUFHLG9CQUFvQixzQkFBc0IsR0FBRyxrQkFBa0IsdUJBQXVCLHNCQUFzQixHQUFHLHFCQUFxQjtBQUNyaUk7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUM1SzFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUFrRjtBQUNsRixNQUF3RTtBQUN4RSxNQUErRTtBQUMvRSxNQUFrRztBQUNsRyxNQUEyRjtBQUMzRixNQUEyRjtBQUMzRixNQUEwRjtBQUMxRjtBQUNBOztBQUVBOztBQUVBLDRCQUE0Qix3RkFBbUI7QUFDL0Msd0JBQXdCLHFHQUFhOztBQUVyQyx1QkFBdUIsMEZBQWE7QUFDcEM7QUFDQSxpQkFBaUIsa0ZBQU07QUFDdkIsNkJBQTZCLHlGQUFrQjs7QUFFL0MsYUFBYSw2RkFBRyxDQUFDLDZFQUFPOzs7O0FBSW9DO0FBQzVELE9BQU8saUVBQWUsNkVBQU8sSUFBSSw2RUFBTyxVQUFVLDZFQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCN0UsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksc0ZBQU8sVUFBVSxzRkFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2tuaWdodC10b3VyLy4vc3JjL2JvYXJkLmpzIiwid2VicGFjazovL2tuaWdodC10b3VyLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9zcmMva25pZ2h0X3RvdXIuanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL2tuaWdodC10b3VyLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9rbmlnaHQtdG91ci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9rbmlnaHQtdG91ci8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3M/MzQyZiIsIndlYnBhY2s6Ly9rbmlnaHQtdG91ci8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9rbmlnaHQtdG91ci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9rbmlnaHQtdG91ci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9rbmlnaHQtdG91ci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBLbmlnaHRzVG91ciBmcm9tIFwiLi9rbmlnaHRfdG91clwiO1xuXG5sZXQgc3RhcnRpbmdQb3MgPSBudWxsO1xubGV0IGJvYXJkID0gW107XG5cbmNvbnN0IGluaXRpYWxpemVCb2FyZCA9IChzcXVhcmVzKSA9PiB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGxldCByb3cgPSAtMTtcbiAgYm9hcmQgPSBbXTtcbiAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBpZiAoY291bnQgJSA4ID09PSAwKSB7XG4gICAgICBib2FyZC5wdXNoKFtdKTtcbiAgICAgIHJvdyArPSAxO1xuICAgIH1cbiAgICBib2FyZFtyb3ddLnB1c2goc3F1YXJlKTtcbiAgICBjb3VudCArPSAxO1xuICB9KTtcbn07XG5cbmNvbnN0IGdldFNxdWFyZSA9IChwb3MpID0+IHtcbiAgY29uc3QgW3gsIHldID0gcG9zLnNwbGl0KFwiXCIpLm1hcCgoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgY29uc3Qgc3F1YXJlID0gYm9hcmRbeF1beV07XG4gIHJldHVybiBzcXVhcmU7XG59O1xuXG5jb25zdCBwbGFjZUluaXRpYWwgPSAocG9zKSA9PiB7XG4gIHN0YXJ0aW5nUG9zID0gcG9zO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IHJlc2V0SW5pdGlhbCA9ICgpID0+IHtcbiAgc3RhcnRpbmdQb3MgPSBudWxsO1xufTtcblxuY29uc3QgY2xlYXIgPSAoKSA9PiB7XG4gIHJlc2V0SW5pdGlhbCgpO1xufTtcblxuY29uc3QgY2FsY3VsYXRlZCA9IHt9O1xuY29uc3Qgc3RhcnRUb3VyID0gKCkgPT4ge1xuICBjb25zdCBnZXRNb3ZlcyA9IGNhbGN1bGF0ZWRbc3RhcnRpbmdQb3NdO1xuICBpZiAoZ2V0TW92ZXMpIHtcbiAgICByZXR1cm4gZ2V0TW92ZXM7XG4gIH1cblxuICBjb25zdCBtb3ZlcyA9IEtuaWdodHNUb3VyKHN0YXJ0aW5nUG9zKTtcbiAgY2FsY3VsYXRlZFtzdGFydGluZ1Bvc10gPSBtb3ZlcztcbiAgcmV0dXJuIG1vdmVzO1xufTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcGxhY2VJbml0aWFsLFxuICBzdGFydFRvdXIsXG4gIGluaXRpYWxpemVCb2FyZCxcbiAgZ2V0U3F1YXJlLFxuICByZXNldEluaXRpYWwsXG4gIGNsZWFyLFxuICBnZXQgaW5pdGlhbFBvcygpIHtcbiAgICByZXR1cm4gc3RhcnRpbmdQb3M7XG4gIH0sXG59O1xuIiwiaW1wb3J0IGtuaWdodEljb24gZnJvbSBcIi4vaW1hZ2VzL2NoZXNzLWtuaWdodC5zdmdcIjtcbmltcG9ydCBtb3ZlU291bmQgZnJvbSBcIi4vc291bmQvbW92ZS1zZWxmLm1wM1wiO1xuaW1wb3J0IHZvbHVtZU9mZkltYWdlIGZyb20gXCIuL2ltYWdlcy92b2x1bWUtb2ZmLnN2Z1wiO1xuXG5jb25zdCB2b2x1bWVEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZvbHVtZVwiKTtcbmNvbnN0IHZvbHVtZU9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52b2x1bWUtb25cIik7XG5jb25zdCBkaWFsb2dUb3VyRW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b3VyLWVuZFwiKTtcblxuY29uc3QgbW92ZUF1ZGlvID0gbmV3IEF1ZGlvKCk7XG5tb3ZlQXVkaW8ubXV0ZWQgPSBmYWxzZTtcbm1vdmVBdWRpby5zcmMgPSBtb3ZlU291bmQ7XG5jb25zdCB2b2x1bWVPZmYgPSBuZXcgSW1hZ2UoKTtcbnZvbHVtZU9mZi5zcmMgPSB2b2x1bWVPZmZJbWFnZTtcblxuY29uc3Qga25pZ2h0ID0gbmV3IEltYWdlKCk7XG5rbmlnaHQuc3JjID0ga25pZ2h0SWNvbjtcbmtuaWdodC5hbHQgPSBcIktuaWdodCBJY29uXCI7XG5rbmlnaHQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbmtuaWdodC5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcbmtuaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiBldmVudC5zdG9wUHJvcGFnYXRpb24oKSk7XG5rbmlnaHQuZHJhZ2dhYmxlID0gdHJ1ZTtcblxubGV0IGRhcmtlblByZXZpb3VzU3F1YXJlID0gbnVsbDtcblxuY29uc3Qgb3BlbkRpYWxvZ1RvdXJFbmQgPSAoKSA9PiB7XG4gIGRpYWxvZ1RvdXJFbmQuc2hvdygpO1xuICBrbmlnaHQuc3R5bGUub3BhY2l0eSA9IFwiMC4yXCI7XG59O1xuY29uc3QgY2xvc2VEaWFsb2dUb3VyRW5kID0gKCkgPT4ge1xuICBkaWFsb2dUb3VyRW5kLmNsb3NlKCk7XG4gIGtuaWdodC5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcbn07XG5cbmNvbnN0IHR1cm5Wb2x1bWVPZmYgPSAoKSA9PiB7XG4gIHZvbHVtZU9uLnJlbW92ZSgpO1xuICB2b2x1bWVEaXYuYXBwZW5kQ2hpbGQodm9sdW1lT2ZmKTtcbiAgbW92ZUF1ZGlvLm11dGVkID0gdHJ1ZTtcbn07XG5cbmNvbnN0IHR1cm5Wb2x1bWVPbiA9ICgpID0+IHtcbiAgdm9sdW1lT2ZmLnJlbW92ZSgpO1xuICB2b2x1bWVEaXYuYXBwZW5kQ2hpbGQodm9sdW1lT24pO1xuICBtb3ZlQXVkaW8ubXV0ZWQgPSBmYWxzZTtcbn07XG5cbnZvbHVtZU9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0dXJuVm9sdW1lT2ZmKTtcbnZvbHVtZU9mZi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdHVyblZvbHVtZU9uKTtcblxuY29uc3QgcGxheU1vdmVBdWRpbyA9ICgpID0+IHtcbiAgbW92ZUF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgY29uc3QgcHJvbWlzZSA9IG1vdmVBdWRpby5wbGF5KCk7XG4gIGlmIChwcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICBwcm9taXNlLmNhdGNoKCgpID0+IHt9KTtcbiAgfVxufTtcblxuY29uc3QgcGxhY2VJbml0aWFsID0gKHNxdWFyZSkgPT4ge1xuICBrbmlnaHQucmVtb3ZlKCk7XG4gIHNxdWFyZS5hcHBlbmRDaGlsZChrbmlnaHQpO1xuICBkYXJrZW5QcmV2aW91c1NxdWFyZSA9IG51bGw7XG4gIGRhcmtlblByZXZpb3VzU3F1YXJlID0gKCkgPT4gc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJ2aXNpdGVkXCIpO1xuICBwbGF5TW92ZUF1ZGlvKCk7XG59O1xuXG5jb25zdCBtb3ZlS25pZ2h0ID0gKHNxdWFyZSkgPT4ge1xuICBrbmlnaHQucmVtb3ZlKCk7XG4gIHNxdWFyZS5hcHBlbmRDaGlsZChrbmlnaHQpO1xuICBpZiAoZGFya2VuUHJldmlvdXNTcXVhcmUpIGRhcmtlblByZXZpb3VzU3F1YXJlKCk7XG5cbiAgZGFya2VuUHJldmlvdXNTcXVhcmUgPSAoKSA9PiBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInZpc2l0ZWRcIik7XG4gIHBsYXlNb3ZlQXVkaW8oKTtcbn07XG5cbmNvbnN0IHJlbW92ZVZpc2l0ZWQgPSAoc3F1YXJlKSA9PiB7XG4gIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaXRlZFwiKTtcbn07XG5cbmNvbnN0IHJlbW92ZUtuaWdodCA9ICgpID0+IHtcbiAgZGFya2VuUHJldmlvdXNTcXVhcmUgPSBudWxsO1xuICBrbmlnaHQucmVtb3ZlKCk7XG59O1xuXG5jb25zdCBwYXVzZSA9IChidXR0b24pID0+IHtcbiAgY29uc3QgYnV0dG9uQ29weSA9IGJ1dHRvbjtcbiAgYnV0dG9uQ29weS50ZXh0Q29udGVudCA9IFwiQ29udGludWVcIjtcbn07XG5cbmNvbnN0IHVucGF1c2UgPSAoYnV0dG9uKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbkNvcHkgPSBidXR0b247XG4gIGJ1dHRvbkNvcHkudGV4dENvbnRlbnQgPSBcIlBhdXNlXCI7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHBsYWNlSW5pdGlhbCxcbiAgcmVtb3ZlVmlzaXRlZCxcbiAgcmVtb3ZlS25pZ2h0LFxuICBtb3ZlS25pZ2h0LFxuICBwYXVzZSxcbiAgdW5wYXVzZSxcbiAgb3BlbkRpYWxvZ1RvdXJFbmQsXG4gIGNsb3NlRGlhbG9nVG91ckVuZCxcbn07XG4iLCJpbXBvcnQgXCJub3JtYWxpemUuY3NzXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IERpc3BsYXkgZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IEJvYXJkIGZyb20gXCIuL2JvYXJkXCI7XG5cbmNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZVwiKTtcbmNvbnN0IHN0YXJ0VG91ckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIik7XG5jb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN0YXJ0XCIpO1xuY29uc3QgcmFuZG9tQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYW5kb21cIik7XG5jb25zdCBkZWxheUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZWxheVwiKTtcbmNvbnN0IHBhdXNlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYXVzZVwiKTtcbmNvbnN0IHByZXZpb3VzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmV2aW91c1wiKTtcbmNvbnN0IG5leHRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5leHRcIik7XG5cbmxldCBkZWxheSA9IHBhcnNlSW50KGRlbGF5SW5wdXQudmFsdWUsIDEwKTtcbmxldCBwYXVzZWQgPSBmYWxzZTtcbmxldCB0b3VyU3RhcnRlZCA9IGZhbHNlO1xubGV0IG1vdmVzID0gbnVsbDtcbmxldCBtb3Zlc0luZGV4ID0gMTtcbmxldCBjdXJyZW50TW92ZTtcblxuY29uc3QgdW5wYXVzZSA9ICgpID0+IHtcbiAgcGF1c2VkID0gZmFsc2U7XG4gIGN1cnJlbnRNb3ZlID0gbnVsbDtcbiAgRGlzcGxheS51bnBhdXNlKHBhdXNlQnV0dG9uKTtcbn07XG5cbmNvbnN0IHBhdXNlID0gKCkgPT4ge1xuICBwYXVzZWQgPSB0cnVlO1xuICBjdXJyZW50TW92ZSA9IG51bGw7XG4gIERpc3BsYXkucGF1c2UocGF1c2VCdXR0b24pO1xuICBEaXNwbGF5LmNsb3NlRGlhbG9nVG91ckVuZCgpO1xuICB0b3VyU3RhcnRlZCA9IHRydWU7XG4gIHJlc3RhcnRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJldmlvdXNCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgbmV4dEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICBwYXVzZUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xufTtcblxuY29uc3QgZmluaXNoVG91ciA9ICgpID0+IHtcbiAgRGlzcGxheS5vcGVuRGlhbG9nVG91ckVuZCgpO1xuICB1bnBhdXNlKCk7XG4gIG5leHRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICBwYXVzZUJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG59O1xuXG5jb25zdCByZXN0YXJ0VG91ciA9ICgpID0+IHtcbiAgdW5wYXVzZSgpO1xuICBEaXNwbGF5LmNsb3NlRGlhbG9nVG91ckVuZCgpO1xuICBtb3Zlc0luZGV4ID0gMTtcbiAgbW92ZXMgPSBudWxsO1xuICB0b3VyU3RhcnRlZCA9IGZhbHNlO1xuICBwcmV2aW91c0J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIHJlc3RhcnRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICBuZXh0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gIHBhdXNlQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbn07XG5cbmNvbnN0IHJlc3RhcnRBbGwgPSAoKSA9PiB7XG4gIGlmICghQm9hcmQuaW5pdGlhbFBvcyB8fCAhdG91clN0YXJ0ZWQpIHJldHVybjtcblxuICByZXN0YXJ0VG91cigpO1xuXG4gIERpc3BsYXkucGxhY2VJbml0aWFsKEJvYXJkLmdldFNxdWFyZShCb2FyZC5pbml0aWFsUG9zKSk7XG4gIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgRGlzcGxheS5yZW1vdmVWaXNpdGVkKHNxdWFyZSk7XG4gIH0pO1xufTtcblxuQm9hcmQuaW5pdGlhbGl6ZUJvYXJkKHNxdWFyZXMpO1xuY29uc3QgY2xpY2tTcXVhcmUgPSAoc3F1YXJlKSA9PiB7XG4gIHJlc3RhcnRBbGwoKTtcbiAgQm9hcmQucGxhY2VJbml0aWFsKHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJwb3NcIikpO1xuICBEaXNwbGF5LnBsYWNlSW5pdGlhbChzcXVhcmUpO1xufTtcblxuY29uc3QgY2xpY2tTcXVhcmVFdmVudCA9IChldmVudCkgPT4gY2xpY2tTcXVhcmUoZXZlbnQudGFyZ2V0KTtcblxuc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja1NxdWFyZUV2ZW50KTtcblxuICBjb25zdCBwcmV2ZW50RGVmYXVsdCA9IChldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBwcmV2ZW50RGVmYXVsdCk7XG5cbiAgY29uc3QgZHJvcEtuaWdodCA9IChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xpY2tTcXVhcmUoc3F1YXJlKTtcbiAgfTtcbiAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyb3BLbmlnaHQpO1xufSk7XG5cbmNvbnN0IG1vdmVLbmlnaHQgPSAocG9zKSA9PiB7XG4gIGNvbnN0IHNxdWFyZSA9IEJvYXJkLmdldFNxdWFyZShwb3MpO1xuICBEaXNwbGF5Lm1vdmVLbmlnaHQoc3F1YXJlKTtcbn07XG5cbmNvbnN0IGRlbGF5TW92ZSA9ICgpID0+IHtcbiAgY29uc3QgbW92ZSA9ICgpID0+IHtcbiAgICBpZiAoY3VycmVudE1vdmUgIT09IG1vdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbW92ZUtuaWdodChtb3Zlc1ttb3Zlc0luZGV4XSk7XG4gICAgbW92ZXNJbmRleCArPSAxO1xuICAgIGlmIChtb3Zlc0luZGV4ID49IDY0KSB7XG4gICAgICBmaW5pc2hUb3VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGF5TW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgY3VycmVudE1vdmUgPSBtb3ZlO1xuICBzZXRUaW1lb3V0KG1vdmUsIGRlbGF5KTtcbn07XG5cbi8vIFJldHVybnMgZmFsc2UgaWYgbmV4dCBtb3ZlIHNob3VsZCBub3QgaGFwcGVuIGVsc2UgdHJ1ZVxuY29uc3QgY2xpY2tOZXh0ID0gKCkgPT4ge1xuICBpZiAobW92ZXNJbmRleCA+PSA2NCB8fCAhQm9hcmQuaW5pdGlhbFBvcykgcmV0dXJuIGZhbHNlO1xuICBpZiAobW92ZXMgPT09IG51bGwpIG1vdmVzID0gQm9hcmQuc3RhcnRUb3VyKCk7XG4gIHBhdXNlKCk7XG4gIG1vdmVLbmlnaHQobW92ZXNbbW92ZXNJbmRleF0pO1xuICBtb3Zlc0luZGV4ICs9IDE7XG5cbiAgaWYgKG1vdmVzSW5kZXggPT09IDY0KSB7XG4gICAgZmluaXNoVG91cigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IHN0YXJ0VG91ciA9ICgpID0+IHtcbiAgaWYgKCFjbGlja05leHQoKSkgcmV0dXJuO1xuICB1bnBhdXNlKCk7XG4gIGRlbGF5TW92ZSgpO1xufTtcblxuc3RhcnRUb3VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGlmICh0b3VyU3RhcnRlZCkge1xuICAgIHJlc3RhcnRBbGwoKTtcbiAgfVxuXG4gIHN0YXJ0VG91cigpO1xufSk7XG5cbnJlc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc3RhcnRBbGwpO1xuXG5jb25zdCBjbGlja1JhbmRvbSA9ICgpID0+IHtcbiAgcmVzdGFydEFsbCgpO1xuICBsZXQgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICBsZXQgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuXG4gIGNvbnN0IGluaXRpYWwgPSBCb2FyZC5pbml0aWFsUG9zO1xuICBpZiAoaW5pdGlhbCkge1xuICAgIGNvbnN0IFt4LCB5XSA9IGluaXRpYWwuc3BsaXQoXCJcIikubWFwKChpdGVtKSA9PiBOdW1iZXIoaXRlbSkpO1xuICAgIHdoaWxlIChyYW5kb21YID09PSB4ICYmIHJhbmRvbVkgPT09IHkpIHtcbiAgICAgIHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICB9XG4gIH1cbiAgY2xpY2tTcXVhcmUoQm9hcmQuZ2V0U3F1YXJlKGAke3JhbmRvbVh9JHtyYW5kb21ZfWApKTtcbn07XG5cbnJhbmRvbUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tSYW5kb20pO1xuXG5kZWxheUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoZXZlbnQpID0+IHtcbiAgY29uc3QgdmFsdWUgPSBwYXJzZUZsb2F0KGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIGlmICh2YWx1ZSA+IDEwMDApIHtcbiAgICBkZWxheUlucHV0LnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgZGVsYXkgPSAxMDAwO1xuICB9IGVsc2Uge1xuICAgIGRlbGF5ID0gdmFsdWU7XG4gIH1cbn0pO1xuXG5wYXVzZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBpZiAobW92ZXNJbmRleCA8PSAxIHx8IG1vdmVzSW5kZXggPj0gNjQpIHJldHVybjtcbiAgaWYgKHBhdXNlZCkge1xuICAgIHN0YXJ0VG91cigpO1xuICB9IGVsc2Uge1xuICAgIHBhdXNlKCk7XG4gIH1cbn0pO1xuXG5uZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja05leHQpO1xuXG5jb25zdCB1bk1vdmVLbmlnaHQgPSAoKSA9PiB7XG4gIGNvbnN0IHNxdWFyZSA9IEJvYXJkLmdldFNxdWFyZShtb3Zlc1ttb3Zlc0luZGV4IC0gMl0pO1xuICBEaXNwbGF5LnBsYWNlSW5pdGlhbChzcXVhcmUpO1xuICBEaXNwbGF5LnJlbW92ZVZpc2l0ZWQoc3F1YXJlKTtcbn07XG5cbnByZXZpb3VzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGlmIChtb3Zlc0luZGV4IDw9IDEgfHwgIUJvYXJkLmluaXRpYWxQb3MpIHJldHVybjtcbiAgcGF1c2UoKTtcbiAgdW5Nb3ZlS25pZ2h0KCk7XG4gIG1vdmVzSW5kZXggLT0gMTtcbiAgaWYgKG1vdmVzSW5kZXggPT09IDEpIHtcbiAgICByZXN0YXJ0VG91cigpO1xuICB9XG59KTtcblxuY2xpY2tSYW5kb20oKTtcbiIsImNvbnN0IGdldEFsbFBvc3NpYmxlTW92ZXMgPSAocG9zKSA9PiB7XG4gIGNvbnN0IHBvc2l0aW9uID0gcG9zLnNwbGl0KFwiXCIpLm1hcCgoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgY29uc3Qgc2V0ID0gbmV3IFNldCgpO1xuICBjb25zdCBtb3ZlS25pZ2h0ID0gKHN0YXJ0LCB4LCB5KSA9PiB7XG4gICAgY29uc3QgbmV3UG9zaXRpb24gPSBbc3RhcnRbMF0gKyB4LCBzdGFydFsxXSArIHldO1xuICAgIGlmIChcbiAgICAgIG5ld1Bvc2l0aW9uWzBdIDw9IDcgJiZcbiAgICAgIG5ld1Bvc2l0aW9uWzBdID49IDAgJiZcbiAgICAgIG5ld1Bvc2l0aW9uWzFdIDw9IDcgJiZcbiAgICAgIG5ld1Bvc2l0aW9uWzFdID49IDBcbiAgICApXG4gICAgICBzZXQuYWRkKGAke25ld1Bvc2l0aW9uWzBdfSR7bmV3UG9zaXRpb25bMV19YCk7XG4gIH07XG5cbiAgbW92ZUtuaWdodChwb3NpdGlvbiwgMiwgMSk7XG4gIG1vdmVLbmlnaHQocG9zaXRpb24sIDIsIC0xKTtcbiAgbW92ZUtuaWdodChwb3NpdGlvbiwgLTIsIDEpO1xuICBtb3ZlS25pZ2h0KHBvc2l0aW9uLCAtMiwgLTEpO1xuICBtb3ZlS25pZ2h0KHBvc2l0aW9uLCAxLCAyKTtcbiAgbW92ZUtuaWdodChwb3NpdGlvbiwgMSwgLTIpO1xuICBtb3ZlS25pZ2h0KHBvc2l0aW9uLCAtMSwgMik7XG4gIG1vdmVLbmlnaHQocG9zaXRpb24sIC0xLCAtMik7XG4gIHJldHVybiBzZXQ7XG59O1xuXG5jb25zdCBpbml0aWFsaXplR3JhcGggPSAoKSA9PiB7XG4gIGNvbnN0IGdyYXBoID0ge307XG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IDc7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDw9IDc7IGogKz0gMSkge1xuICAgICAgZ3JhcGhbYCR7aX0ke2p9YF0gPSBnZXRBbGxQb3NzaWJsZU1vdmVzKGAke2l9JHtqfWApO1xuICAgIH1cbiAgfVxuICByZXR1cm4geyBzaXplOiA2NCwgZ3JhcGggfTtcbn07XG5cbmNvbnN0IHJlbW92ZU5vZGUgPSAocG9zLCBncmFwaCkgPT4ge1xuICBjb25zdCBncmFwaENsb25lID0gZ3JhcGg7XG4gIGNvbnN0IGVkZ2VzID0gZ3JhcGhDbG9uZS5ncmFwaFtwb3NdO1xuICBlZGdlcy5mb3JFYWNoKChlZGdlKSA9PiB7XG4gICAgY29uc3QgbmVpZ2hib3VyRWRnZXMgPSBncmFwaENsb25lLmdyYXBoW2VkZ2VdO1xuICAgIG5laWdoYm91ckVkZ2VzLmRlbGV0ZShwb3MpO1xuICB9KTtcblxuICBkZWxldGUgZ3JhcGhDbG9uZS5ncmFwaFtwb3NdO1xuICBncmFwaENsb25lLnNpemUgLT0gMTtcbiAgcmV0dXJuIGVkZ2VzO1xufTtcblxuY29uc3QgcmVzZXRHcmFwaCA9IChwb3MsIGdyYXBoLCBlZGdlcykgPT4ge1xuICBjb25zdCBncmFwaENsb25lID0gZ3JhcGg7XG4gIGdyYXBoQ2xvbmUuc2l6ZSArPSAxO1xuICBncmFwaENsb25lLmdyYXBoW3Bvc10gPSBlZGdlcztcbiAgZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgIGNvbnN0IG5laWdoYm91ckVkZ2VzID0gZ3JhcGhDbG9uZS5ncmFwaFtlZGdlXTtcbiAgICBuZWlnaGJvdXJFZGdlcy5hZGQocG9zKTtcbiAgfSk7XG59O1xuXG5jb25zdCBrbmlnaHRNb3ZlcyA9IChwb3MsIGdyYXBoID0gaW5pdGlhbGl6ZUdyYXBoKCksIG1vdmVzID0gW10pID0+IHtcbiAgY29uc3QgZWRnZXMgPSByZW1vdmVOb2RlKHBvcywgZ3JhcGgpO1xuICBtb3Zlcy5wdXNoKHBvcyk7XG4gIGlmIChncmFwaC5zaXplID09PSAwKSB7XG4gICAgcmV0dXJuIG1vdmVzO1xuICB9XG5cbiAgaWYgKGVkZ2VzLnNpemUgPT09IDApIHtcbiAgICByZXNldEdyYXBoKHBvcywgZ3JhcGgsIGVkZ2VzKTtcbiAgICBtb3Zlcy5wb3AoKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxldCBiZXN0TW92ZXMgPSBbXTtcbiAgbGV0IG1pblNpemUgPSBJbmZpbml0eTtcbiAgZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgIGNvbnN0IHsgc2l6ZSB9ID0gZ3JhcGguZ3JhcGhbZWRnZV07XG4gICAgaWYgKGJlc3RNb3Zlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGJlc3RNb3ZlcyA9IFtlZGdlXTtcbiAgICAgIG1pblNpemUgPSBzaXplO1xuICAgIH0gZWxzZSBpZiAoc2l6ZSA8IG1pblNpemUpIHtcbiAgICAgIGJlc3RNb3ZlcyA9IFtlZGdlXTtcbiAgICAgIG1pblNpemUgPSBzaXplO1xuICAgIH0gZWxzZSBpZiAoc2l6ZSA9PT0gbWluU2l6ZSkge1xuICAgICAgYmVzdE1vdmVzLnB1c2goZWRnZSk7XG4gICAgfVxuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGJlc3RNb3Zlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGtuaWdodE1vdmVzKGJlc3RNb3Zlc1tpXSwgZ3JhcGgsIG1vdmVzKTtcbiAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmVzZXRHcmFwaChwb3MsIGdyYXBoLCBlZGdlcyk7XG4gIG1vdmVzLnBvcCgpO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGtuaWdodE1vdmVzO1xuLy8gVEVTVElOR1xuLy8gY29uc3QgdGVzdCA9ICgpID0+IHtcbi8vICAgbGV0IG1heCA9IC1JbmZpbml0eTtcbi8vICAgbGV0IGF2ZXJhZ2UgPSAwO1xuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8PSA3OyBpICs9IDEpIHtcbi8vICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSA3OyBqICs9IDEpIHtcbi8vICAgICAgIGNvbnN0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4vLyAgICAgICBjb25zdCByZXN1bHQgPSBrbmlnaHRNb3ZlcyhgJHtpfSR7an1gKTtcbi8vICAgICAgIGNvbnN0IGVuZCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuLy8gICAgICAgaWYgKHJlc3VsdCkge1xuLy8gICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCAhPT0gNjQpXG4vLyAgICAgICAgICAgdGhyb3cgRXJyb3IoYEZhaWxlZCBvbiAke2l9JHtqfS4gUm91dGUgaGFzIHRvbyBtYW55IG1vdmVzLmApO1xuLy8gICAgICAgICBjb25zdCBncmFwaCA9IGluaXRpYWxpemVHcmFwaCgpO1xuLy8gICAgICAgICByZXN1bHQuZm9yRWFjaCgocG9zKSA9PiB7XG4vLyAgICAgICAgICAgaWYgKCFncmFwaC5ncmFwaFtwb3NdKSB7XG4vLyAgICAgICAgICAgICB0aHJvdyBFcnJvcihgRmFpbGVkIG9uICR7aX0ke2p9LiBTcXVhcmUgdmlzaXRlZCBtb3JlIHRoYW4gb25jZS5gKTtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgZGVsZXRlIGdyYXBoLmdyYXBoW3Bvc107XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICBPYmplY3Qua2V5cyhncmFwaC5ncmFwaCkuZm9yRWFjaCgoKSA9PiB7XG4vLyAgICAgICAgICAgdGhyb3cgRXJyb3IoYEZhaWxlZCBvbiAke2l9JHtqfS4gTm90IGFsbCBzcXVhcmVzIHZpc2l0ZWQuYCk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICBjb25zdCB0aW1lID0gZW5kIC0gc3RhcnQ7XG4vLyAgICAgICAgIGlmICh0aW1lID4gbWF4KSBtYXggPSB0aW1lO1xuLy8gICAgICAgICBhdmVyYWdlICs9IHRpbWU7XG4vLyAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICB0aHJvdyBFcnJvcihgRmFpbGVkIG9uICR7aX0ke2p9LiBDb3VsZCBub3QgZmluZCBhIHJvdXRlLmApO1xuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgfVxuLy8gICBjb25zb2xlLmxvZyhgTWF4IHRpbWUgdGFrZW46ICR7bWF4fSBtc2ApO1xuLy8gICBjb25zb2xlLmxvZyhgQXZlcmFnZSB0aW1lIHRha2VuOiAke2F2ZXJhZ2UgLyA2NH0gbXNgKTtcbi8vIH07XG4vLyB0ZXN0KCk7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cblxuLyogRG9jdW1lbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXG4gKi9cblxuaHRtbCB7XG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xufVxuXG4vKiBTZWN0aW9uc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuYm9keSB7XG4gIG1hcmdpbjogMDtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIFxcYG1haW5cXGAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXG4gKi9cblxubWFpbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIFxcYGgxXFxgIGVsZW1lbnRzIHdpdGhpbiBcXGBzZWN0aW9uXFxgIGFuZFxuICogXFxgYXJ0aWNsZVxcYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXG4gKi9cblxuaDEge1xuICBmb250LXNpemU6IDJlbTtcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcbn1cblxuLyogR3JvdXBpbmcgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXG4gKi9cblxuaHIge1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xuICBoZWlnaHQ6IDA7IC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIFxcYGVtXFxgIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5wcmUge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cbn1cblxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxuICovXG5cbmEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLyoqXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5hYmJyW3RpdGxlXSB7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5iLFxuc3Ryb25nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIFxcYGVtXFxgIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5jb2RlLFxua2JkLFxuc2FtcCB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnNtYWxsIHtcbiAgZm9udC1zaXplOiA4MCU7XG59XG5cbi8qKlxuICogUHJldmVudCBcXGBzdWJcXGAgYW5kIFxcYHN1cFxcYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cbiAqIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdWIsXG5zdXAge1xuICBmb250LXNpemU6IDc1JTtcbiAgbGluZS1oZWlnaHQ6IDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuXG5zdWIge1xuICBib3R0b206IC0wLjI1ZW07XG59XG5cbnN1cCB7XG4gIHRvcDogLTAuNWVtO1xufVxuXG4vKiBFbWJlZGRlZCBjb250ZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXG4gKi9cblxuaW1nIHtcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xufVxuXG4vKiBGb3Jtc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cbiAqL1xuXG5idXR0b24sXG5pbnB1dCxcbm9wdGdyb3VwLFxuc2VsZWN0LFxudGV4dGFyZWEge1xuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cbiAgbWFyZ2luOiAwOyAvKiAyICovXG59XG5cbi8qKlxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxuICovXG5cbmJ1dHRvbixcbmlucHV0IHsgLyogMSAqL1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cbiAqL1xuXG5idXR0b24sXG5zZWxlY3QgeyAvKiAxICovXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXG4gKi9cblxuYnV0dG9uLFxuW3R5cGU9XCJidXR0b25cIl0sXG5bdHlwZT1cInJlc2V0XCJdLFxuW3R5cGU9XCJzdWJtaXRcIl0ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPVwiYnV0dG9uXCJdOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9XCJyZXNldFwiXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPVwic3VibWl0XCJdOjotbW96LWZvY3VzLWlubmVyIHtcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xufVxuXG4vKipcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cbiAqL1xuXG5idXR0b246LW1vei1mb2N1c3JpbmcsXG5bdHlwZT1cImJ1dHRvblwiXTotbW96LWZvY3VzcmluZyxcblt0eXBlPVwicmVzZXRcIl06LW1vei1mb2N1c3JpbmcsXG5bdHlwZT1cInN1Ym1pdFwiXTotbW96LWZvY3VzcmluZyB7XG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXG4gKi9cblxuZmllbGRzZXQge1xuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gXFxgZmllbGRzZXRcXGAgZWxlbWVudHMgaW4gSUUuXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XG4gKiAgICBcXGBmaWVsZHNldFxcYCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxubGVnZW5kIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cbiAgcGFkZGluZzogMDsgLyogMyAqL1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cbiAqL1xuXG5wcm9ncmVzcyB7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cbiAqL1xuXG50ZXh0YXJlYSB7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxuICovXG5cblt0eXBlPVwiY2hlY2tib3hcIl0sXG5bdHlwZT1cInJhZGlvXCJdIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAyICovXG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxuICovXG5cblt0eXBlPVwibnVtYmVyXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuW3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cbiAqL1xuXG5bdHlwZT1cInNlYXJjaFwiXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxuICovXG5cblt0eXBlPVwic2VhcmNoXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIFxcYGluaGVyaXRcXGAgaW4gU2FmYXJpLlxuICovXG5cbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xuICBmb250OiBpbmhlcml0OyAvKiAyICovXG59XG5cbi8qIEludGVyYWN0aXZlXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cbiAqL1xuXG5kZXRhaWxzIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc3VtbWFyeSB7XG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcbn1cblxuLyogTWlzY1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXG4gKi9cblxudGVtcGxhdGUge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxuICovXG5cbltoaWRkZW5dIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSwyRUFBMkU7O0FBRTNFOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGO0VBQ0UsaUJBQWlCLEVBQUUsTUFBTTtFQUN6Qiw4QkFBOEIsRUFBRSxNQUFNO0FBQ3hDOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSx1QkFBdUIsRUFBRSxNQUFNO0VBQy9CLFNBQVMsRUFBRSxNQUFNO0VBQ2pCLGlCQUFpQixFQUFFLE1BQU07QUFDM0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLG1CQUFtQixFQUFFLE1BQU07RUFDM0IsMEJBQTBCLEVBQUUsTUFBTTtFQUNsQyxpQ0FBaUMsRUFBRSxNQUFNO0FBQzNDOztBQUVBOztFQUVFOztBQUVGOztFQUVFLG1CQUFtQjtBQUNyQjs7QUFFQTs7O0VBR0U7O0FBRUY7OztFQUdFLGlDQUFpQyxFQUFFLE1BQU07RUFDekMsY0FBYyxFQUFFLE1BQU07QUFDeEI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxjQUFjO0VBQ2QsY0FBYztFQUNkLGtCQUFrQjtFQUNsQix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7Ozs7O0VBS0Usb0JBQW9CLEVBQUUsTUFBTTtFQUM1QixlQUFlLEVBQUUsTUFBTTtFQUN2QixpQkFBaUIsRUFBRSxNQUFNO0VBQ3pCLFNBQVMsRUFBRSxNQUFNO0FBQ25COztBQUVBOzs7RUFHRTs7QUFFRjtRQUNRLE1BQU07RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7OztFQUdFOztBQUVGO1NBQ1MsTUFBTTtFQUNiLG9CQUFvQjtBQUN0Qjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLDBCQUEwQjtBQUM1Qjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLGtCQUFrQjtFQUNsQixVQUFVO0FBQ1o7O0FBRUE7O0VBRUU7O0FBRUY7Ozs7RUFJRSw4QkFBOEI7QUFDaEM7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7Ozs7O0VBS0U7O0FBRUY7RUFDRSxzQkFBc0IsRUFBRSxNQUFNO0VBQzlCLGNBQWMsRUFBRSxNQUFNO0VBQ3RCLGNBQWMsRUFBRSxNQUFNO0VBQ3RCLGVBQWUsRUFBRSxNQUFNO0VBQ3ZCLFVBQVUsRUFBRSxNQUFNO0VBQ2xCLG1CQUFtQixFQUFFLE1BQU07QUFDN0I7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxzQkFBc0IsRUFBRSxNQUFNO0VBQzlCLFVBQVUsRUFBRSxNQUFNO0FBQ3BCOztBQUVBOztFQUVFOztBQUVGOztFQUVFLFlBQVk7QUFDZDs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSw2QkFBNkIsRUFBRSxNQUFNO0VBQ3JDLG9CQUFvQixFQUFFLE1BQU07QUFDOUI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsMEJBQTBCLEVBQUUsTUFBTTtFQUNsQyxhQUFhLEVBQUUsTUFBTTtBQUN2Qjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG5cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcbn1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXG4gKi9cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxufVxcblxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuXFxuaHIge1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxufVxcblxcbi8qIEZvcm1zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0IHsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHsgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcbiAqL1xcblxcbmRldGFpbHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGA6cm9vdCB7XG4gIC0taG92ZXItYnJpZ2h0bmVzczogOTAlO1xuICAtLWFjdGl2ZS1icmlnaHRuZXNzOiA4MCU7XG59XG5cbmh0bWwge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LWZhbWlseTogUm9ib3RvLCBzeXN0ZW0tdWksIFwiU2Vnb2UgVUlcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZixcbiAgICBcIkFwcGxlIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgRW1vamlcIiwgXCJTZWdvZSBVSSBTeW1ib2xcIjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4qLFxuKjo6YmVmb3JlLFxuKjo6YWZ0ZXIge1xuICBib3gtc2l6aW5nOiBpbmhlcml0O1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIGJvcmRlcjogbm9uZTtcbn1cblxuaDEge1xuICAvKiBUbyBvdmVycmlkZSBOb3JtYWxpemUuY3NzIGgxIG1hcmdpbiAqL1xuICBtYXJnaW46IDA7XG59XG5cbmJvZHkge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gbWF4LWNvbnRlbnQ7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5ib2FyZCB7XG4gIGhlaWdodDogMTAwdmg7XG4gIGFzcGVjdC1yYXRpbzogMTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC1hdXRvLXJvd3M6IG1pbm1heCgwLCAxZnIpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4uYm9hcmQtcm93IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcbn1cblxuLnNxdWFyZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDIxNywgMTgxKTtcbn1cblxuLmJsYWNrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4MSwgMTM2LCA5OSk7XG59XG5cbi51c2VyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjkpO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDJ2dztcbiAgZGlzcGxheTogZ3JpZDtcbiAgYWxpZ24tY29udGVudDogc3RhcnQ7XG4gIGdhcDogNTBweDtcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbmJ1dHRvbjpub3QoW2Rpc2FibGVkXSkge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmJ1dHRvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA1dncpO1xufVxuXG4udGl0bGUge1xuICBmb250LXNpemU6IDUwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmJ1dHRvbnMge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG4gIHJvdy1nYXA6IDI1cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG59XG5cbmJ1dHRvbjpob3Zlcjpub3QoW2Rpc2FibGVkXSkge1xuICBmaWx0ZXI6IGJyaWdodG5lc3ModmFyKC0taG92ZXItYnJpZ2h0bmVzcykpO1xufVxuYnV0dG9uOmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkge1xuICBmaWx0ZXI6IGJyaWdodG5lc3ModmFyKC0tYWN0aXZlLWJyaWdodG5lc3MpKTtcbn1cblxuLmRlbGF5LXdyYXBwZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZGVsYXkge1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgbWFyZ2luLXRvcDogMjVweDtcbiAgd2lkdGg6IDUwJTtcbn1cblxuLnZpc2l0ZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5idXR0b24td3JhcHBlciB7XG4gIHdpZHRoOiAxMDAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi52b2x1bWUge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMXZ3O1xuICBib3R0b206IDF2dztcbn1cblxuLnZvbHVtZSA+IGltZyB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgd2lkdGg6IDV2dztcbiAgYXNwZWN0LXJhdGlvOiAxO1xuICBmaWx0ZXI6IGludmVydCgxMDAlKSBzZXBpYSgxMDAlKSBzYXR1cmF0ZSgyJSkgaHVlLXJvdGF0ZSgzNmRlZylcbiAgICBicmlnaHRuZXNzKDEwNSUpIGNvbnRyYXN0KDEwMSUpO1xufVxuXG4udm9sdW1lID4gaW1nOmhvdmVyIHtcbiAgZmlsdGVyOiBpbnZlcnQoMTAwJSkgc2VwaWEoMTAwJSkgc2F0dXJhdGUoMiUpIGh1ZS1yb3RhdGUoMzZkZWcpXG4gICAgYnJpZ2h0bmVzcyg5MCUpIGNvbnRyYXN0KDEwMSUpO1xufVxuXG4udm9sdW1lID4gaW1nOmFjdGl2ZSB7XG4gIGZpbHRlcjogaW52ZXJ0KDEwMCUpIHNlcGlhKDEwMCUpIHNhdHVyYXRlKDIlKSBodWUtcm90YXRlKDM2ZGVnKVxuICAgIGJyaWdodG5lc3MoODAlKSBjb250cmFzdCgxMDElKTtcbn1cblxuLnRvdXItZW5kW29wZW5dIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGZvbnQtc2l6ZTogY2FsYygyOHB4ICsgMC4xdncpO1xuICBjb2xvcjogcmdiKDIwLCAyMCwgMjApO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLnRvdXItZW5kOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLnRvdXItZW5kID4gaDEge1xuICBmb250LXdlaWdodDogMTAwMDtcbn1cblxuLmRlc2NyaXB0aW9uIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBsaW5lLWhlaWdodDogMnJlbTtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHVCQUF1QjtFQUN2Qix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEI7NERBQzBEO0VBQzFELFlBQVk7QUFDZDs7QUFFQTs7O0VBR0UsbUJBQW1CO0VBQ25CLFVBQVU7RUFDVixTQUFTO0VBQ1QsWUFBWTtBQUNkOztBQUVBO0VBQ0Usd0NBQXdDO0VBQ3hDLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGFBQWE7RUFDYix1Q0FBdUM7RUFDdkMsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IscUNBQXFDO0FBQ3ZDOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0Usb0NBQW9DO0VBQ3BDLFlBQVk7RUFDWixZQUFZO0VBQ1osYUFBYTtFQUNiLG9CQUFvQjtFQUNwQixTQUFTO0VBQ1QscUJBQXFCO0VBQ3JCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLGFBQWE7RUFDYixXQUFXO0VBQ1gscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsMkNBQTJDO0FBQzdDO0FBQ0E7RUFDRSw0Q0FBNEM7QUFDOUM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLGVBQWU7RUFDZixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLFVBQVU7QUFDWjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsVUFBVTtFQUNWLGVBQWU7RUFDZjttQ0FDaUM7QUFDbkM7O0FBRUE7RUFDRTtrQ0FDZ0M7QUFDbEM7O0FBRUE7RUFDRTtrQ0FDZ0M7QUFDbEM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFNBQVM7RUFDVCxnQ0FBZ0M7RUFDaEMsNkJBQTZCO0VBQzdCLDZCQUE2QjtFQUM3QixzQkFBc0I7RUFDdEIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxuICAtLWhvdmVyLWJyaWdodG5lc3M6IDkwJTtcXG4gIC0tYWN0aXZlLWJyaWdodG5lc3M6IDgwJTtcXG59XFxuXFxuaHRtbCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc3lzdGVtLXVpLCBcXFwiU2Vnb2UgVUlcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmLFxcbiAgICBcXFwiQXBwbGUgQ29sb3IgRW1vamlcXFwiLCBcXFwiU2Vnb2UgVUkgRW1vamlcXFwiLCBcXFwiU2Vnb2UgVUkgU3ltYm9sXFxcIjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogaW5oZXJpdDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcblxcbmgxIHtcXG4gIC8qIFRvIG92ZXJyaWRlIE5vcm1hbGl6ZS5jc3MgaDEgbWFyZ2luICovXFxuICBtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtYXgtY29udGVudDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5ib2FyZCB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtYXV0by1yb3dzOiBtaW5tYXgoMCwgMWZyKTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG4uYm9hcmQtcm93IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbn1cXG5cXG4uc3F1YXJlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDIxNywgMTgxKTtcXG59XFxuXFxuLmJsYWNrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxODEsIDEzNiwgOTkpO1xcbn1cXG5cXG4udXNlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOSk7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAydnc7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgYWxpZ24tY29udGVudDogc3RhcnQ7XFxuICBnYXA6IDUwcHg7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbmJ1dHRvbjpub3QoW2Rpc2FibGVkXSkge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICB3aWR0aDogY2FsYygxMDAlIC0gNXZ3KTtcXG59XFxuXFxuLnRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogNTBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmJ1dHRvbnMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIHJvdy1nYXA6IDI1cHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uOmhvdmVyOm5vdChbZGlzYWJsZWRdKSB7XFxuICBmaWx0ZXI6IGJyaWdodG5lc3ModmFyKC0taG92ZXItYnJpZ2h0bmVzcykpO1xcbn1cXG5idXR0b246YWN0aXZlOm5vdChbZGlzYWJsZWRdKSB7XFxuICBmaWx0ZXI6IGJyaWdodG5lc3ModmFyKC0tYWN0aXZlLWJyaWdodG5lc3MpKTtcXG59XFxuXFxuLmRlbGF5LXdyYXBwZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmRlbGF5IHtcXG4gIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgbWFyZ2luLXRvcDogMjVweDtcXG4gIHdpZHRoOiA1MCU7XFxufVxcblxcbi52aXNpdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLmJ1dHRvbi13cmFwcGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4udm9sdW1lIHtcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDF2dztcXG4gIGJvdHRvbTogMXZ3O1xcbn1cXG5cXG4udm9sdW1lID4gaW1nIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHdpZHRoOiA1dnc7XFxuICBhc3BlY3QtcmF0aW86IDE7XFxuICBmaWx0ZXI6IGludmVydCgxMDAlKSBzZXBpYSgxMDAlKSBzYXR1cmF0ZSgyJSkgaHVlLXJvdGF0ZSgzNmRlZylcXG4gICAgYnJpZ2h0bmVzcygxMDUlKSBjb250cmFzdCgxMDElKTtcXG59XFxuXFxuLnZvbHVtZSA+IGltZzpob3ZlciB7XFxuICBmaWx0ZXI6IGludmVydCgxMDAlKSBzZXBpYSgxMDAlKSBzYXR1cmF0ZSgyJSkgaHVlLXJvdGF0ZSgzNmRlZylcXG4gICAgYnJpZ2h0bmVzcyg5MCUpIGNvbnRyYXN0KDEwMSUpO1xcbn1cXG5cXG4udm9sdW1lID4gaW1nOmFjdGl2ZSB7XFxuICBmaWx0ZXI6IGludmVydCgxMDAlKSBzZXBpYSgxMDAlKSBzYXR1cmF0ZSgyJSkgaHVlLXJvdGF0ZSgzNmRlZylcXG4gICAgYnJpZ2h0bmVzcyg4MCUpIGNvbnRyYXN0KDEwMSUpO1xcbn1cXG5cXG4udG91ci1lbmRbb3Blbl0ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgZm9udC1zaXplOiBjYWxjKDI4cHggKyAwLjF2dyk7XFxuICBjb2xvcjogcmdiKDIwLCAyMCwgMjApO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbi50b3VyLWVuZDpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4udG91ci1lbmQgPiBoMSB7XFxuICBmb250LXdlaWdodDogMTAwMDtcXG59XFxuXFxuLmRlc2NyaXB0aW9uIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGxpbmUtaGVpZ2h0OiAycmVtO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vcm1hbGl6ZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbIktuaWdodHNUb3VyIiwic3RhcnRpbmdQb3MiLCJib2FyZCIsImluaXRpYWxpemVCb2FyZCIsInNxdWFyZXMiLCJjb3VudCIsInJvdyIsImZvckVhY2giLCJzcXVhcmUiLCJwdXNoIiwiZ2V0U3F1YXJlIiwicG9zIiwieCIsInkiLCJzcGxpdCIsIm1hcCIsIml0ZW0iLCJwYXJzZUludCIsInBsYWNlSW5pdGlhbCIsInJlc2V0SW5pdGlhbCIsImNsZWFyIiwiY2FsY3VsYXRlZCIsInN0YXJ0VG91ciIsImdldE1vdmVzIiwibW92ZXMiLCJpbml0aWFsUG9zIiwia25pZ2h0SWNvbiIsIm1vdmVTb3VuZCIsInZvbHVtZU9mZkltYWdlIiwidm9sdW1lRGl2IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidm9sdW1lT24iLCJkaWFsb2dUb3VyRW5kIiwibW92ZUF1ZGlvIiwiQXVkaW8iLCJtdXRlZCIsInNyYyIsInZvbHVtZU9mZiIsIkltYWdlIiwia25pZ2h0IiwiYWx0Iiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsImRyYWdnYWJsZSIsImRhcmtlblByZXZpb3VzU3F1YXJlIiwib3BlbkRpYWxvZ1RvdXJFbmQiLCJzaG93Iiwib3BhY2l0eSIsImNsb3NlRGlhbG9nVG91ckVuZCIsImNsb3NlIiwidHVyblZvbHVtZU9mZiIsInJlbW92ZSIsImFwcGVuZENoaWxkIiwidHVyblZvbHVtZU9uIiwicGxheU1vdmVBdWRpbyIsImN1cnJlbnRUaW1lIiwicHJvbWlzZSIsInBsYXkiLCJ1bmRlZmluZWQiLCJjYXRjaCIsImNsYXNzTGlzdCIsImFkZCIsIm1vdmVLbmlnaHQiLCJyZW1vdmVWaXNpdGVkIiwicmVtb3ZlS25pZ2h0IiwicGF1c2UiLCJidXR0b24iLCJidXR0b25Db3B5IiwidGV4dENvbnRlbnQiLCJ1bnBhdXNlIiwiRGlzcGxheSIsIkJvYXJkIiwicXVlcnlTZWxlY3RvckFsbCIsInN0YXJ0VG91ckJ1dHRvbiIsInJlc3RhcnRCdXR0b24iLCJyYW5kb21CdXR0b24iLCJkZWxheUlucHV0IiwicGF1c2VCdXR0b24iLCJwcmV2aW91c0J1dHRvbiIsIm5leHRCdXR0b24iLCJkZWxheSIsInZhbHVlIiwicGF1c2VkIiwidG91clN0YXJ0ZWQiLCJtb3Zlc0luZGV4IiwiY3VycmVudE1vdmUiLCJkaXNhYmxlZCIsImZpbmlzaFRvdXIiLCJyZXN0YXJ0VG91ciIsInJlc3RhcnRBbGwiLCJjbGlja1NxdWFyZSIsImdldEF0dHJpYnV0ZSIsImNsaWNrU3F1YXJlRXZlbnQiLCJ0YXJnZXQiLCJwcmV2ZW50RGVmYXVsdCIsImRyb3BLbmlnaHQiLCJkZWxheU1vdmUiLCJtb3ZlIiwic2V0VGltZW91dCIsImNsaWNrTmV4dCIsImNsaWNrUmFuZG9tIiwicmFuZG9tWCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbVkiLCJpbml0aWFsIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsInJlcG9ydFZhbGlkaXR5IiwidW5Nb3ZlS25pZ2h0IiwiZ2V0QWxsUG9zc2libGVNb3ZlcyIsInBvc2l0aW9uIiwic2V0IiwiU2V0Iiwic3RhcnQiLCJuZXdQb3NpdGlvbiIsImluaXRpYWxpemVHcmFwaCIsImdyYXBoIiwiaSIsImoiLCJzaXplIiwicmVtb3ZlTm9kZSIsImdyYXBoQ2xvbmUiLCJlZGdlcyIsImVkZ2UiLCJuZWlnaGJvdXJFZGdlcyIsImRlbGV0ZSIsInJlc2V0R3JhcGgiLCJrbmlnaHRNb3ZlcyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInBvcCIsImJlc3RNb3ZlcyIsIm1pblNpemUiLCJJbmZpbml0eSIsInJlc3VsdCJdLCJzb3VyY2VSb290IjoiIn0=