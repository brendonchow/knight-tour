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
/* harmony import */ var _images_volume_high_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/volume-high.svg */ "./src/images/volume-high.svg");



const volumeDiv = document.querySelector(".volume");
const volumeOff = document.querySelector(".volume-off");
const dialogTourEnd = document.querySelector(".tour-end");
const moveAudio = new Audio();
moveAudio.muted = true;
moveAudio.src = _sound_move_self_mp3__WEBPACK_IMPORTED_MODULE_1__;
const volumeOn = new Image();
volumeOn.src = _images_volume_high_svg__WEBPACK_IMPORTED_MODULE_2__;
const knight = new Image();
knight.src = _images_chess_knight_svg__WEBPACK_IMPORTED_MODULE_0__;
knight.alt = "Knight Icon";
knight.style.width = "90px";
knight.style.height = "90px";
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
  grid-auto-rows: 1fr;
  position: relative;
  user-select: none;
}

.board-row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.square {
  display: grid;
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

.knight-icon {
  height: 100%;
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
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,uBAAuB;EACvB,wBAAwB;AAC1B;;AAEA;EACE,sBAAsB;EACtB;4DAC0D;EAC1D,YAAY;AACd;;AAEA;;;EAGE,mBAAmB;EACnB,UAAU;EACV,SAAS;EACT,YAAY;AACd;;AAEA;EACE,wCAAwC;EACxC,SAAS;AACX;;AAEA;EACE,aAAa;EACb,uCAAuC;EACvC,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,qCAAqC;AACvC;;AAEA;EACE,aAAa;EACb,oCAAoC;AACtC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,oCAAoC;EACpC,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,SAAS;EACT,qBAAqB;EACrB,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,uBAAuB;AACzB;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,aAAa;EACb,WAAW;EACX,qBAAqB;AACvB;;AAEA;EACE,2CAA2C;AAC7C;AACA;EACE,4CAA4C;AAC9C;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,UAAU;EACV,WAAW;AACb;;AAEA;EACE,eAAe;EACf,UAAU;EACV,eAAe;EACf;mCACiC;AACnC;;AAEA;EACE;kCACgC;AAClC;;AAEA;EACE;kCACgC;AAClC;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,6BAA6B;EAC7B,6BAA6B;EAC7B,sBAAsB;EACtB,oBAAoB;AACtB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,iBAAiB;AACnB","sourcesContent":[":root {\n  --hover-brightness: 90%;\n  --active-brightness: 80%;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-family: Roboto, system-ui, \"Segoe UI\", Helvetica, Arial, sans-serif,\n    \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  color: white;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit;\n  padding: 0;\n  margin: 0;\n  border: none;\n}\n\nh1 {\n  /* To override Normalize.css h1 margin */\n  margin: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-columns: auto max-content;\n  overflow: hidden;\n}\n\n.board {\n  height: 100vh;\n  aspect-ratio: 1;\n  display: grid;\n  grid-auto-rows: 1fr;\n  position: relative;\n  user-select: none;\n}\n\n.board-row {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n}\n\n.square {\n  display: grid;\n  background-color: rgb(240, 217, 181);\n}\n\n.black {\n  background-color: rgb(181, 136, 99);\n}\n\n.user {\n  background-color: rgba(0, 0, 0, 0.9);\n  color: white;\n  padding: 2vw;\n  display: grid;\n  align-content: start;\n  gap: 50px;\n  justify-items: center;\n  position: relative;\n}\n\nbutton:not([disabled]) {\n  cursor: pointer;\n}\n\nbutton {\n  background-color: white;\n  padding: 10px 20px;\n  width: calc(100% - 5vw);\n}\n\n.title {\n  font-size: 50px;\n  text-align: center;\n}\n\n.buttons {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  row-gap: 25px;\n  width: 100%;\n  justify-items: center;\n}\n\nbutton:hover:not([disabled]) {\n  filter: brightness(var(--hover-brightness));\n}\nbutton:active:not([disabled]) {\n  filter: brightness(var(--active-brightness));\n}\n\n.delay-wrapper {\n  display: grid;\n  justify-items: center;\n  font-size: 20px;\n  text-align: center;\n}\n\n.delay {\n  padding: 5px 10px;\n  margin-top: 25px;\n  width: 50%;\n}\n\n.knight-icon {\n  height: 100%;\n}\n\n.visited {\n  background-color: red;\n}\n\n.button-wrapper {\n  width: 100%;\n  text-align: center;\n}\n\n.volume {\n  text-align: right;\n  position: absolute;\n  right: 1vw;\n  bottom: 1vw;\n}\n\n.volume > img {\n  cursor: pointer;\n  width: 5vw;\n  aspect-ratio: 1;\n  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(36deg)\n    brightness(105%) contrast(101%);\n}\n\n.volume > img:hover {\n  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(36deg)\n    brightness(90%) contrast(101%);\n}\n\n.volume > img:active {\n  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(36deg)\n    brightness(80%) contrast(101%);\n}\n\n.tour-end[open] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: transparent;\n  font-size: calc(28px + 0.1vw);\n  color: rgb(20, 20, 20);\n  pointer-events: none;\n}\n\n.tour-end:focus {\n  outline: none;\n}\n\n.tour-end > h1 {\n  font-weight: 1000;\n}\n"],"sourceRoot":""}]);
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

/***/ "./src/images/volume-high.svg":
/*!************************************!*\
  !*** ./src/images/volume-high.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "src/images/volume-high..svg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxnRkFBZ0YsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE1BQU0sT0FBTyxXQUFXLE1BQU0sT0FBTyxZQUFZLFdBQVcsVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxL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QWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2tuaWdodC10b3VyLy4vc3JjL2JvYXJkLmpzIiwid2VicGFjazovL2tuaWdodC10b3VyLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9zcmMva25pZ2h0X3RvdXIuanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL2tuaWdodC10b3VyLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9rbmlnaHQtdG91ci8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9rbmlnaHQtdG91ci8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3M/MzQyZiIsIndlYnBhY2s6Ly9rbmlnaHQtdG91ci8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9rbmlnaHQtdG91ci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9rbmlnaHQtdG91ci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8va25pZ2h0LXRvdXIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9rbmlnaHQtdG91ci8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBLbmlnaHRzVG91ciBmcm9tIFwiLi9rbmlnaHRfdG91clwiO1xuXG5sZXQgc3RhcnRpbmdQb3MgPSBudWxsO1xubGV0IGJvYXJkID0gW107XG5cbmNvbnN0IGluaXRpYWxpemVCb2FyZCA9IChzcXVhcmVzKSA9PiB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGxldCByb3cgPSAtMTtcbiAgYm9hcmQgPSBbXTtcbiAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBpZiAoY291bnQgJSA4ID09PSAwKSB7XG4gICAgICBib2FyZC5wdXNoKFtdKTtcbiAgICAgIHJvdyArPSAxO1xuICAgIH1cbiAgICBib2FyZFtyb3ddLnB1c2goc3F1YXJlKTtcbiAgICBjb3VudCArPSAxO1xuICB9KTtcbn07XG5cbmNvbnN0IGdldFNxdWFyZSA9IChwb3MpID0+IHtcbiAgY29uc3QgW3gsIHldID0gcG9zLnNwbGl0KFwiXCIpLm1hcCgoaXRlbSkgPT4gcGFyc2VJbnQoaXRlbSwgMTApKTtcbiAgY29uc3Qgc3F1YXJlID0gYm9hcmRbeF1beV07XG4gIHJldHVybiBzcXVhcmU7XG59O1xuXG5jb25zdCBwbGFjZUluaXRpYWwgPSAocG9zKSA9PiB7XG4gIHN0YXJ0aW5nUG9zID0gcG9zO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IHJlc2V0SW5pdGlhbCA9ICgpID0+IHtcbiAgc3RhcnRpbmdQb3MgPSBudWxsO1xufTtcblxuY29uc3QgY2xlYXIgPSAoKSA9PiB7XG4gIHJlc2V0SW5pdGlhbCgpO1xufTtcblxuY29uc3QgY2FsY3VsYXRlZCA9IHt9O1xuY29uc3Qgc3RhcnRUb3VyID0gKCkgPT4ge1xuICBjb25zdCBnZXRNb3ZlcyA9IGNhbGN1bGF0ZWRbc3RhcnRpbmdQb3NdO1xuICBpZiAoZ2V0TW92ZXMpIHtcbiAgICByZXR1cm4gZ2V0TW92ZXM7XG4gIH1cblxuICBjb25zdCBtb3ZlcyA9IEtuaWdodHNUb3VyKHN0YXJ0aW5nUG9zKTtcbiAgY2FsY3VsYXRlZFtzdGFydGluZ1Bvc10gPSBtb3ZlcztcbiAgcmV0dXJuIG1vdmVzO1xufTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcGxhY2VJbml0aWFsLFxuICBzdGFydFRvdXIsXG4gIGluaXRpYWxpemVCb2FyZCxcbiAgZ2V0U3F1YXJlLFxuICByZXNldEluaXRpYWwsXG4gIGNsZWFyLFxuICBnZXQgaW5pdGlhbFBvcygpIHtcbiAgICByZXR1cm4gc3RhcnRpbmdQb3M7XG4gIH0sXG59O1xuIiwiaW1wb3J0IGtuaWdodEljb24gZnJvbSBcIi4vaW1hZ2VzL2NoZXNzLWtuaWdodC5zdmdcIjtcbmltcG9ydCBtb3ZlU291bmQgZnJvbSBcIi4vc291bmQvbW92ZS1zZWxmLm1wM1wiO1xuaW1wb3J0IHZPbiBmcm9tIFwiLi9pbWFnZXMvdm9sdW1lLWhpZ2guc3ZnXCI7XG5cbmNvbnN0IHZvbHVtZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudm9sdW1lXCIpO1xuY29uc3Qgdm9sdW1lT2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52b2x1bWUtb2ZmXCIpO1xuY29uc3QgZGlhbG9nVG91ckVuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG91ci1lbmRcIik7XG5cbmNvbnN0IG1vdmVBdWRpbyA9IG5ldyBBdWRpbygpO1xubW92ZUF1ZGlvLm11dGVkID0gdHJ1ZTtcbm1vdmVBdWRpby5zcmMgPSBtb3ZlU291bmQ7XG5jb25zdCB2b2x1bWVPbiA9IG5ldyBJbWFnZSgpO1xudm9sdW1lT24uc3JjID0gdk9uO1xuXG5jb25zdCBrbmlnaHQgPSBuZXcgSW1hZ2UoKTtcbmtuaWdodC5zcmMgPSBrbmlnaHRJY29uO1xua25pZ2h0LmFsdCA9IFwiS25pZ2h0IEljb25cIjtcbmtuaWdodC5zdHlsZS53aWR0aCA9IFwiOTBweFwiO1xua25pZ2h0LnN0eWxlLmhlaWdodCA9IFwiOTBweFwiO1xua25pZ2h0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpKTtcbmtuaWdodC5kcmFnZ2FibGUgPSB0cnVlO1xuXG5sZXQgZGFya2VuUHJldmlvdXNTcXVhcmUgPSBudWxsO1xuXG5jb25zdCBvcGVuRGlhbG9nVG91ckVuZCA9ICgpID0+IHtcbiAgZGlhbG9nVG91ckVuZC5zaG93KCk7XG4gIGtuaWdodC5zdHlsZS5vcGFjaXR5ID0gXCIwLjJcIjtcbn07XG5jb25zdCBjbG9zZURpYWxvZ1RvdXJFbmQgPSAoKSA9PiB7XG4gIGRpYWxvZ1RvdXJFbmQuY2xvc2UoKTtcbiAga25pZ2h0LnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xufTtcblxuY29uc3QgdHVyblZvbHVtZU9mZiA9ICgpID0+IHtcbiAgdm9sdW1lT24ucmVtb3ZlKCk7XG4gIHZvbHVtZURpdi5hcHBlbmRDaGlsZCh2b2x1bWVPZmYpO1xuICBtb3ZlQXVkaW8ubXV0ZWQgPSB0cnVlO1xufTtcblxuY29uc3QgdHVyblZvbHVtZU9uID0gKCkgPT4ge1xuICB2b2x1bWVPZmYucmVtb3ZlKCk7XG4gIHZvbHVtZURpdi5hcHBlbmRDaGlsZCh2b2x1bWVPbik7XG4gIG1vdmVBdWRpby5tdXRlZCA9IGZhbHNlO1xufTtcblxudm9sdW1lT24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHR1cm5Wb2x1bWVPZmYpO1xudm9sdW1lT2ZmLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0dXJuVm9sdW1lT24pO1xuXG5jb25zdCBwbGF5TW92ZUF1ZGlvID0gKCkgPT4ge1xuICBtb3ZlQXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICBjb25zdCBwcm9taXNlID0gbW92ZUF1ZGlvLnBsYXkoKTtcbiAgaWYgKHByb21pc2UgIT09IHVuZGVmaW5lZCkge1xuICAgIHByb21pc2UuY2F0Y2goKCkgPT4ge30pO1xuICB9XG59O1xuXG5jb25zdCBwbGFjZUluaXRpYWwgPSAoc3F1YXJlKSA9PiB7XG4gIGtuaWdodC5yZW1vdmUoKTtcbiAgc3F1YXJlLmFwcGVuZENoaWxkKGtuaWdodCk7XG4gIGRhcmtlblByZXZpb3VzU3F1YXJlID0gbnVsbDtcbiAgZGFya2VuUHJldmlvdXNTcXVhcmUgPSAoKSA9PiBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInZpc2l0ZWRcIik7XG4gIHBsYXlNb3ZlQXVkaW8oKTtcbn07XG5cbmNvbnN0IG1vdmVLbmlnaHQgPSAoc3F1YXJlKSA9PiB7XG4gIGtuaWdodC5yZW1vdmUoKTtcbiAgc3F1YXJlLmFwcGVuZENoaWxkKGtuaWdodCk7XG4gIGlmIChkYXJrZW5QcmV2aW91c1NxdWFyZSkgZGFya2VuUHJldmlvdXNTcXVhcmUoKTtcblxuICBkYXJrZW5QcmV2aW91c1NxdWFyZSA9ICgpID0+IHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwidmlzaXRlZFwiKTtcbiAgcGxheU1vdmVBdWRpbygpO1xufTtcblxuY29uc3QgcmVtb3ZlVmlzaXRlZCA9IChzcXVhcmUpID0+IHtcbiAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpdGVkXCIpO1xufTtcblxuY29uc3QgcmVtb3ZlS25pZ2h0ID0gKCkgPT4ge1xuICBkYXJrZW5QcmV2aW91c1NxdWFyZSA9IG51bGw7XG4gIGtuaWdodC5yZW1vdmUoKTtcbn07XG5cbmNvbnN0IHBhdXNlID0gKGJ1dHRvbikgPT4ge1xuICBjb25zdCBidXR0b25Db3B5ID0gYnV0dG9uO1xuICBidXR0b25Db3B5LnRleHRDb250ZW50ID0gXCJDb250aW51ZVwiO1xufTtcblxuY29uc3QgdW5wYXVzZSA9IChidXR0b24pID0+IHtcbiAgY29uc3QgYnV0dG9uQ29weSA9IGJ1dHRvbjtcbiAgYnV0dG9uQ29weS50ZXh0Q29udGVudCA9IFwiUGF1c2VcIjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcGxhY2VJbml0aWFsLFxuICByZW1vdmVWaXNpdGVkLFxuICByZW1vdmVLbmlnaHQsXG4gIG1vdmVLbmlnaHQsXG4gIHBhdXNlLFxuICB1bnBhdXNlLFxuICBvcGVuRGlhbG9nVG91ckVuZCxcbiAgY2xvc2VEaWFsb2dUb3VyRW5kLFxufTtcbiIsImltcG9ydCBcIm5vcm1hbGl6ZS5jc3NcIjtcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgRGlzcGxheSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgQm9hcmQgZnJvbSBcIi4vYm9hcmRcIjtcblxuY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3F1YXJlXCIpO1xuY29uc3Qgc3RhcnRUb3VyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKTtcbmNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3RhcnRcIik7XG5jb25zdCByYW5kb21CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhbmRvbVwiKTtcbmNvbnN0IGRlbGF5SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlbGF5XCIpO1xuY29uc3QgcGF1c2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlXCIpO1xuY29uc3QgcHJldmlvdXNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZXZpb3VzXCIpO1xuY29uc3QgbmV4dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV4dFwiKTtcblxubGV0IGRlbGF5ID0gcGFyc2VJbnQoZGVsYXlJbnB1dC52YWx1ZSwgMTApO1xubGV0IHBhdXNlZCA9IGZhbHNlO1xubGV0IHRvdXJTdGFydGVkID0gZmFsc2U7XG5sZXQgbW92ZXMgPSBudWxsO1xubGV0IG1vdmVzSW5kZXggPSAxO1xubGV0IGN1cnJlbnRNb3ZlO1xuXG5jb25zdCB1bnBhdXNlID0gKCkgPT4ge1xuICBwYXVzZWQgPSBmYWxzZTtcbiAgY3VycmVudE1vdmUgPSBudWxsO1xuICBEaXNwbGF5LnVucGF1c2UocGF1c2VCdXR0b24pO1xufTtcblxuY29uc3QgcGF1c2UgPSAoKSA9PiB7XG4gIHBhdXNlZCA9IHRydWU7XG4gIGN1cnJlbnRNb3ZlID0gbnVsbDtcbiAgRGlzcGxheS5wYXVzZShwYXVzZUJ1dHRvbik7XG4gIERpc3BsYXkuY2xvc2VEaWFsb2dUb3VyRW5kKCk7XG4gIHRvdXJTdGFydGVkID0gdHJ1ZTtcbiAgcmVzdGFydEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICBwcmV2aW91c0J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICBuZXh0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gIHBhdXNlQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG59O1xuXG5jb25zdCBmaW5pc2hUb3VyID0gKCkgPT4ge1xuICBEaXNwbGF5Lm9wZW5EaWFsb2dUb3VyRW5kKCk7XG4gIHVucGF1c2UoKTtcbiAgbmV4dEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIHBhdXNlQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbn07XG5cbmNvbnN0IHJlc3RhcnRUb3VyID0gKCkgPT4ge1xuICB1bnBhdXNlKCk7XG4gIERpc3BsYXkuY2xvc2VEaWFsb2dUb3VyRW5kKCk7XG4gIG1vdmVzSW5kZXggPSAxO1xuICBtb3ZlcyA9IG51bGw7XG4gIHRvdXJTdGFydGVkID0gZmFsc2U7XG4gIHByZXZpb3VzQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgcmVzdGFydEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIG5leHRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgcGF1c2VCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xufTtcblxuY29uc3QgcmVzdGFydEFsbCA9ICgpID0+IHtcbiAgaWYgKCFCb2FyZC5pbml0aWFsUG9zIHx8ICF0b3VyU3RhcnRlZCkgcmV0dXJuO1xuXG4gIHJlc3RhcnRUb3VyKCk7XG5cbiAgRGlzcGxheS5wbGFjZUluaXRpYWwoQm9hcmQuZ2V0U3F1YXJlKEJvYXJkLmluaXRpYWxQb3MpKTtcbiAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICBEaXNwbGF5LnJlbW92ZVZpc2l0ZWQoc3F1YXJlKTtcbiAgfSk7XG59O1xuXG5Cb2FyZC5pbml0aWFsaXplQm9hcmQoc3F1YXJlcyk7XG5jb25zdCBjbGlja1NxdWFyZSA9IChzcXVhcmUpID0+IHtcbiAgcmVzdGFydEFsbCgpO1xuICBCb2FyZC5wbGFjZUluaXRpYWwoc3F1YXJlLmdldEF0dHJpYnV0ZShcInBvc1wiKSk7XG4gIERpc3BsYXkucGxhY2VJbml0aWFsKHNxdWFyZSk7XG59O1xuXG5jb25zdCBjbGlja1NxdWFyZUV2ZW50ID0gKGV2ZW50KSA9PiBjbGlja1NxdWFyZShldmVudC50YXJnZXQpO1xuXG5zcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrU3F1YXJlRXZlbnQpO1xuXG4gIGNvbnN0IHByZXZlbnREZWZhdWx0ID0gKGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIHByZXZlbnREZWZhdWx0KTtcblxuICBjb25zdCBkcm9wS25pZ2h0ID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjbGlja1NxdWFyZShzcXVhcmUpO1xuICB9O1xuICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcEtuaWdodCk7XG59KTtcblxuY29uc3QgbW92ZUtuaWdodCA9IChwb3MpID0+IHtcbiAgY29uc3Qgc3F1YXJlID0gQm9hcmQuZ2V0U3F1YXJlKHBvcyk7XG4gIERpc3BsYXkubW92ZUtuaWdodChzcXVhcmUpO1xufTtcblxuY29uc3QgZGVsYXlNb3ZlID0gKCkgPT4ge1xuICBjb25zdCBtb3ZlID0gKCkgPT4ge1xuICAgIGlmIChjdXJyZW50TW92ZSAhPT0gbW92ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBtb3ZlS25pZ2h0KG1vdmVzW21vdmVzSW5kZXhdKTtcbiAgICBtb3Zlc0luZGV4ICs9IDE7XG4gICAgaWYgKG1vdmVzSW5kZXggPj0gNjQpIHtcbiAgICAgIGZpbmlzaFRvdXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsYXlNb3ZlKCk7XG4gICAgfVxuICB9O1xuICBjdXJyZW50TW92ZSA9IG1vdmU7XG4gIHNldFRpbWVvdXQobW92ZSwgZGVsYXkpO1xufTtcblxuLy8gUmV0dXJucyBmYWxzZSBpZiBuZXh0IG1vdmUgc2hvdWxkIG5vdCBoYXBwZW4gZWxzZSB0cnVlXG5jb25zdCBjbGlja05leHQgPSAoKSA9PiB7XG4gIGlmIChtb3Zlc0luZGV4ID49IDY0IHx8ICFCb2FyZC5pbml0aWFsUG9zKSByZXR1cm4gZmFsc2U7XG4gIGlmIChtb3ZlcyA9PT0gbnVsbCkgbW92ZXMgPSBCb2FyZC5zdGFydFRvdXIoKTtcbiAgcGF1c2UoKTtcbiAgbW92ZUtuaWdodChtb3Zlc1ttb3Zlc0luZGV4XSk7XG4gIG1vdmVzSW5kZXggKz0gMTtcblxuICBpZiAobW92ZXNJbmRleCA9PT0gNjQpIHtcbiAgICBmaW5pc2hUb3VyKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuY29uc3Qgc3RhcnRUb3VyID0gKCkgPT4ge1xuICBpZiAoIWNsaWNrTmV4dCgpKSByZXR1cm47XG4gIHVucGF1c2UoKTtcbiAgZGVsYXlNb3ZlKCk7XG59O1xuXG5zdGFydFRvdXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgaWYgKHRvdXJTdGFydGVkKSB7XG4gICAgcmVzdGFydEFsbCgpO1xuICB9XG5cbiAgc3RhcnRUb3VyKCk7XG59KTtcblxucmVzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVzdGFydEFsbCk7XG5cbmNvbnN0IGNsaWNrUmFuZG9tID0gKCkgPT4ge1xuICByZXN0YXJ0QWxsKCk7XG4gIGxldCByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gIGxldCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG5cbiAgY29uc3QgaW5pdGlhbCA9IEJvYXJkLmluaXRpYWxQb3M7XG4gIGlmIChpbml0aWFsKSB7XG4gICAgY29uc3QgW3gsIHldID0gaW5pdGlhbC5zcGxpdChcIlwiKS5tYXAoKGl0ZW0pID0+IE51bWJlcihpdGVtKSk7XG4gICAgd2hpbGUgKHJhbmRvbVggPT09IHggJiYgcmFuZG9tWSA9PT0geSkge1xuICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgIH1cbiAgfVxuICBjbGlja1NxdWFyZShCb2FyZC5nZXRTcXVhcmUoYCR7cmFuZG9tWH0ke3JhbmRvbVl9YCkpO1xufTtcblxucmFuZG9tQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja1JhbmRvbSk7XG5cbmRlbGF5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChldmVudCkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgaWYgKHZhbHVlID4gMTAwMCkge1xuICAgIGRlbGF5SW5wdXQucmVwb3J0VmFsaWRpdHkoKTtcbiAgICBkZWxheSA9IDEwMDA7XG4gIH0gZWxzZSB7XG4gICAgZGVsYXkgPSB2YWx1ZTtcbiAgfVxufSk7XG5cbnBhdXNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGlmIChtb3Zlc0luZGV4IDw9IDEgfHwgbW92ZXNJbmRleCA+PSA2NCkgcmV0dXJuO1xuICBpZiAocGF1c2VkKSB7XG4gICAgc3RhcnRUb3VyKCk7XG4gIH0gZWxzZSB7XG4gICAgcGF1c2UoKTtcbiAgfVxufSk7XG5cbm5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrTmV4dCk7XG5cbmNvbnN0IHVuTW92ZUtuaWdodCA9ICgpID0+IHtcbiAgY29uc3Qgc3F1YXJlID0gQm9hcmQuZ2V0U3F1YXJlKG1vdmVzW21vdmVzSW5kZXggLSAyXSk7XG4gIERpc3BsYXkucGxhY2VJbml0aWFsKHNxdWFyZSk7XG4gIERpc3BsYXkucmVtb3ZlVmlzaXRlZChzcXVhcmUpO1xufTtcblxucHJldmlvdXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgaWYgKG1vdmVzSW5kZXggPD0gMSB8fCAhQm9hcmQuaW5pdGlhbFBvcykgcmV0dXJuO1xuICBwYXVzZSgpO1xuICB1bk1vdmVLbmlnaHQoKTtcbiAgbW92ZXNJbmRleCAtPSAxO1xuICBpZiAobW92ZXNJbmRleCA9PT0gMSkge1xuICAgIHJlc3RhcnRUb3VyKCk7XG4gIH1cbn0pO1xuXG5jbGlja1JhbmRvbSgpO1xuIiwiY29uc3QgZ2V0QWxsUG9zc2libGVNb3ZlcyA9IChwb3MpID0+IHtcbiAgY29uc3QgcG9zaXRpb24gPSBwb3Muc3BsaXQoXCJcIikubWFwKChpdGVtKSA9PiBwYXJzZUludChpdGVtLCAxMCkpO1xuICBjb25zdCBzZXQgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IG1vdmVLbmlnaHQgPSAoc3RhcnQsIHgsIHkpID0+IHtcbiAgICBjb25zdCBuZXdQb3NpdGlvbiA9IFtzdGFydFswXSArIHgsIHN0YXJ0WzFdICsgeV07XG4gICAgaWYgKFxuICAgICAgbmV3UG9zaXRpb25bMF0gPD0gNyAmJlxuICAgICAgbmV3UG9zaXRpb25bMF0gPj0gMCAmJlxuICAgICAgbmV3UG9zaXRpb25bMV0gPD0gNyAmJlxuICAgICAgbmV3UG9zaXRpb25bMV0gPj0gMFxuICAgIClcbiAgICAgIHNldC5hZGQoYCR7bmV3UG9zaXRpb25bMF19JHtuZXdQb3NpdGlvblsxXX1gKTtcbiAgfTtcblxuICBtb3ZlS25pZ2h0KHBvc2l0aW9uLCAyLCAxKTtcbiAgbW92ZUtuaWdodChwb3NpdGlvbiwgMiwgLTEpO1xuICBtb3ZlS25pZ2h0KHBvc2l0aW9uLCAtMiwgMSk7XG4gIG1vdmVLbmlnaHQocG9zaXRpb24sIC0yLCAtMSk7XG4gIG1vdmVLbmlnaHQocG9zaXRpb24sIDEsIDIpO1xuICBtb3ZlS25pZ2h0KHBvc2l0aW9uLCAxLCAtMik7XG4gIG1vdmVLbmlnaHQocG9zaXRpb24sIC0xLCAyKTtcbiAgbW92ZUtuaWdodChwb3NpdGlvbiwgLTEsIC0yKTtcbiAgcmV0dXJuIHNldDtcbn07XG5cbmNvbnN0IGluaXRpYWxpemVHcmFwaCA9ICgpID0+IHtcbiAgY29uc3QgZ3JhcGggPSB7fTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gNzsgaSArPSAxKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPD0gNzsgaiArPSAxKSB7XG4gICAgICBncmFwaFtgJHtpfSR7an1gXSA9IGdldEFsbFBvc3NpYmxlTW92ZXMoYCR7aX0ke2p9YCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IHNpemU6IDY0LCBncmFwaCB9O1xufTtcblxuY29uc3QgcmVtb3ZlTm9kZSA9IChwb3MsIGdyYXBoKSA9PiB7XG4gIGNvbnN0IGdyYXBoQ2xvbmUgPSBncmFwaDtcbiAgY29uc3QgZWRnZXMgPSBncmFwaENsb25lLmdyYXBoW3Bvc107XG4gIGVkZ2VzLmZvckVhY2goKGVkZ2UpID0+IHtcbiAgICBjb25zdCBuZWlnaGJvdXJFZGdlcyA9IGdyYXBoQ2xvbmUuZ3JhcGhbZWRnZV07XG4gICAgbmVpZ2hib3VyRWRnZXMuZGVsZXRlKHBvcyk7XG4gIH0pO1xuXG4gIGRlbGV0ZSBncmFwaENsb25lLmdyYXBoW3Bvc107XG4gIGdyYXBoQ2xvbmUuc2l6ZSAtPSAxO1xuICByZXR1cm4gZWRnZXM7XG59O1xuXG5jb25zdCByZXNldEdyYXBoID0gKHBvcywgZ3JhcGgsIGVkZ2VzKSA9PiB7XG4gIGNvbnN0IGdyYXBoQ2xvbmUgPSBncmFwaDtcbiAgZ3JhcGhDbG9uZS5zaXplICs9IDE7XG4gIGdyYXBoQ2xvbmUuZ3JhcGhbcG9zXSA9IGVkZ2VzO1xuICBlZGdlcy5mb3JFYWNoKChlZGdlKSA9PiB7XG4gICAgY29uc3QgbmVpZ2hib3VyRWRnZXMgPSBncmFwaENsb25lLmdyYXBoW2VkZ2VdO1xuICAgIG5laWdoYm91ckVkZ2VzLmFkZChwb3MpO1xuICB9KTtcbn07XG5cbmNvbnN0IGtuaWdodE1vdmVzID0gKHBvcywgZ3JhcGggPSBpbml0aWFsaXplR3JhcGgoKSwgbW92ZXMgPSBbXSkgPT4ge1xuICBjb25zdCBlZGdlcyA9IHJlbW92ZU5vZGUocG9zLCBncmFwaCk7XG4gIG1vdmVzLnB1c2gocG9zKTtcbiAgaWYgKGdyYXBoLnNpemUgPT09IDApIHtcbiAgICByZXR1cm4gbW92ZXM7XG4gIH1cblxuICBpZiAoZWRnZXMuc2l6ZSA9PT0gMCkge1xuICAgIHJlc2V0R3JhcGgocG9zLCBncmFwaCwgZWRnZXMpO1xuICAgIG1vdmVzLnBvcCgpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGV0IGJlc3RNb3ZlcyA9IFtdO1xuICBsZXQgbWluU2l6ZSA9IEluZmluaXR5O1xuICBlZGdlcy5mb3JFYWNoKChlZGdlKSA9PiB7XG4gICAgY29uc3QgeyBzaXplIH0gPSBncmFwaC5ncmFwaFtlZGdlXTtcbiAgICBpZiAoYmVzdE1vdmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgYmVzdE1vdmVzID0gW2VkZ2VdO1xuICAgICAgbWluU2l6ZSA9IHNpemU7XG4gICAgfSBlbHNlIGlmIChzaXplIDwgbWluU2l6ZSkge1xuICAgICAgYmVzdE1vdmVzID0gW2VkZ2VdO1xuICAgICAgbWluU2l6ZSA9IHNpemU7XG4gICAgfSBlbHNlIGlmIChzaXplID09PSBtaW5TaXplKSB7XG4gICAgICBiZXN0TW92ZXMucHVzaChlZGdlKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYmVzdE1vdmVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ga25pZ2h0TW92ZXMoYmVzdE1vdmVzW2ldLCBncmFwaCwgbW92ZXMpO1xuICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXNldEdyYXBoKHBvcywgZ3JhcGgsIGVkZ2VzKTtcbiAgbW92ZXMucG9wKCk7XG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGRlZmF1bHQga25pZ2h0TW92ZXM7XG4vLyBURVNUSU5HXG4vLyBjb25zdCB0ZXN0ID0gKCkgPT4ge1xuLy8gICBsZXQgbWF4ID0gLUluZmluaXR5O1xuLy8gICBsZXQgYXZlcmFnZSA9IDA7XG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDc7IGkgKz0gMSkge1xuLy8gICAgIGZvciAobGV0IGogPSAwOyBqIDw9IDc7IGogKz0gMSkge1xuLy8gICAgICAgY29uc3Qgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbi8vICAgICAgIGNvbnN0IHJlc3VsdCA9IGtuaWdodE1vdmVzKGAke2l9JHtqfWApO1xuLy8gICAgICAgY29uc3QgZW5kID0gcGVyZm9ybWFuY2Uubm93KCk7XG4vLyAgICAgICBpZiAocmVzdWx0KSB7XG4vLyAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoICE9PSA2NClcbi8vICAgICAgICAgICB0aHJvdyBFcnJvcihgRmFpbGVkIG9uICR7aX0ke2p9LiBSb3V0ZSBoYXMgdG9vIG1hbnkgbW92ZXMuYCk7XG4vLyAgICAgICAgIGNvbnN0IGdyYXBoID0gaW5pdGlhbGl6ZUdyYXBoKCk7XG4vLyAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChwb3MpID0+IHtcbi8vICAgICAgICAgICBpZiAoIWdyYXBoLmdyYXBoW3Bvc10pIHtcbi8vICAgICAgICAgICAgIHRocm93IEVycm9yKGBGYWlsZWQgb24gJHtpfSR7an0uIFNxdWFyZSB2aXNpdGVkIG1vcmUgdGhhbiBvbmNlLmApO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgICBkZWxldGUgZ3JhcGguZ3JhcGhbcG9zXTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgICAgIE9iamVjdC5rZXlzKGdyYXBoLmdyYXBoKS5mb3JFYWNoKCgpID0+IHtcbi8vICAgICAgICAgICB0aHJvdyBFcnJvcihgRmFpbGVkIG9uICR7aX0ke2p9LiBOb3QgYWxsIHNxdWFyZXMgdmlzaXRlZC5gKTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgICAgIGNvbnN0IHRpbWUgPSBlbmQgLSBzdGFydDtcbi8vICAgICAgICAgaWYgKHRpbWUgPiBtYXgpIG1heCA9IHRpbWU7XG4vLyAgICAgICAgIGF2ZXJhZ2UgKz0gdGltZTtcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHRocm93IEVycm9yKGBGYWlsZWQgb24gJHtpfSR7an0uIENvdWxkIG5vdCBmaW5kIGEgcm91dGUuYCk7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuLy8gICB9XG4vLyAgIGNvbnNvbGUubG9nKGBNYXggdGltZSB0YWtlbjogJHttYXh9IG1zYCk7XG4vLyAgIGNvbnNvbGUubG9nKGBBdmVyYWdlIHRpbWUgdGFrZW46ICR7YXZlcmFnZSAvIDY0fSBtc2ApO1xuLy8gfTtcbi8vIHRlc3QoKTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xuXG4vKiBEb2N1bWVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cbiAqL1xuXG5odG1sIHtcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXG59XG5cbi8qIFNlY3Rpb25zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5ib2R5IHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgXFxgbWFpblxcYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cbiAqL1xuXG5tYWluIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gXFxgaDFcXGAgZWxlbWVudHMgd2l0aGluIFxcYHNlY3Rpb25cXGAgYW5kXG4gKiBcXGBhcnRpY2xlXFxgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cbiAqL1xuXG5oMSB7XG4gIGZvbnQtc2l6ZTogMmVtO1xuICBtYXJnaW46IDAuNjdlbSAwO1xufVxuXG4vKiBHcm91cGluZyBjb250ZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cbiAqL1xuXG5ociB7XG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXG4gIGhlaWdodDogMDsgLyogMSAqL1xuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgXFxgZW1cXGAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnByZSB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXG4gKi9cblxuYSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4vKipcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxuICovXG5cbmFiYnJbdGl0bGVdIHtcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxuICovXG5cbmIsXG5zdHJvbmcge1xuICBmb250LXdlaWdodDogYm9sZGVyO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgXFxgZW1cXGAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmNvZGUsXG5rYmQsXG5zYW1wIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc21hbGwge1xuICBmb250LXNpemU6IDgwJTtcbn1cblxuLyoqXG4gKiBQcmV2ZW50IFxcYHN1YlxcYCBhbmQgXFxgc3VwXFxgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxuICogYWxsIGJyb3dzZXJzLlxuICovXG5cbnN1YixcbnN1cCB7XG4gIGZvbnQtc2l6ZTogNzUlO1xuICBsaW5lLWhlaWdodDogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbnN1YiB7XG4gIGJvdHRvbTogLTAuMjVlbTtcbn1cblxuc3VwIHtcbiAgdG9wOiAtMC41ZW07XG59XG5cbi8qIEVtYmVkZGVkIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cbiAqL1xuXG5pbWcge1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG59XG5cbi8qIEZvcm1zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcbmlucHV0LFxub3B0Z3JvdXAsXG5zZWxlY3QsXG50ZXh0YXJlYSB7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICBtYXJnaW46IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXG4gKi9cblxuYnV0dG9uLFxuaW5wdXQgeyAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbixcbnNlbGVjdCB7IC8qIDEgKi9cbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqL1xuXG5idXR0b24sXG5bdHlwZT1cImJ1dHRvblwiXSxcblt0eXBlPVwicmVzZXRcIl0sXG5bdHlwZT1cInN1Ym1pdFwiXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXG4gKi9cblxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9XCJidXR0b25cIl06Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT1cInJlc2V0XCJdOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9XCJzdWJtaXRcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi8qKlxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxuICovXG5cbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcblt0eXBlPVwiYnV0dG9uXCJdOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9XCJyZXNldFwiXTotbW96LWZvY3VzcmluZyxcblt0eXBlPVwic3VibWl0XCJdOi1tb3otZm9jdXNyaW5nIHtcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cbiAqL1xuXG5maWVsZHNldCB7XG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBcXGBmaWVsZHNldFxcYCBlbGVtZW50cyBpbiBJRS5cbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcbiAqICAgIFxcYGZpZWxkc2V0XFxgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5sZWdlbmQge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAzICovXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxuICovXG5cbnByb2dyZXNzIHtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxuICovXG5cbnRleHRhcmVhIHtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG5cbi8qKlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXG4gKi9cblxuW3R5cGU9XCJjaGVja2JveFwiXSxcblt0eXBlPVwicmFkaW9cIl0ge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXG4gKi9cblxuW3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG5bdHlwZT1cIm51bWJlclwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxuICovXG5cblt0eXBlPVwic2VhcmNoXCJdIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXG4gKi9cblxuW3R5cGU9XCJzZWFyY2hcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gXFxgaW5oZXJpdFxcYCBpbiBTYWZhcmkuXG4gKi9cblxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cbn1cblxuLyogSW50ZXJhY3RpdmVcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxuICovXG5cbmRldGFpbHMge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdW1tYXJ5IHtcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xufVxuXG4vKiBNaXNjXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cbiAqL1xuXG50ZW1wbGF0ZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXG4gKi9cblxuW2hpZGRlbl0ge1xuICBkaXNwbGF5OiBub25lO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLDJFQUEyRTs7QUFFM0U7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSxpQkFBaUIsRUFBRSxNQUFNO0VBQ3pCLDhCQUE4QixFQUFFLE1BQU07QUFDeEM7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLFNBQVM7QUFDWDs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjtFQUNFLHVCQUF1QixFQUFFLE1BQU07RUFDL0IsU0FBUyxFQUFFLE1BQU07RUFDakIsaUJBQWlCLEVBQUUsTUFBTTtBQUMzQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSxpQ0FBaUMsRUFBRSxNQUFNO0VBQ3pDLGNBQWMsRUFBRSxNQUFNO0FBQ3hCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsbUJBQW1CLEVBQUUsTUFBTTtFQUMzQiwwQkFBMEIsRUFBRSxNQUFNO0VBQ2xDLGlDQUFpQyxFQUFFLE1BQU07QUFDM0M7O0FBRUE7O0VBRUU7O0FBRUY7O0VBRUUsbUJBQW1CO0FBQ3JCOztBQUVBOzs7RUFHRTs7QUFFRjs7O0VBR0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLGNBQWM7RUFDZCxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjs7Ozs7RUFLRSxvQkFBb0IsRUFBRSxNQUFNO0VBQzVCLGVBQWUsRUFBRSxNQUFNO0VBQ3ZCLGlCQUFpQixFQUFFLE1BQU07RUFDekIsU0FBUyxFQUFFLE1BQU07QUFDbkI7O0FBRUE7OztFQUdFOztBQUVGO1FBQ1EsTUFBTTtFQUNaLGlCQUFpQjtBQUNuQjs7QUFFQTs7O0VBR0U7O0FBRUY7U0FDUyxNQUFNO0VBQ2Isb0JBQW9CO0FBQ3RCOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsMEJBQTBCO0FBQzVCOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLDhCQUE4QjtBQUNoQzs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTs7Ozs7RUFLRTs7QUFFRjtFQUNFLHNCQUFzQixFQUFFLE1BQU07RUFDOUIsY0FBYyxFQUFFLE1BQU07RUFDdEIsY0FBYyxFQUFFLE1BQU07RUFDdEIsZUFBZSxFQUFFLE1BQU07RUFDdkIsVUFBVSxFQUFFLE1BQU07RUFDbEIsbUJBQW1CLEVBQUUsTUFBTTtBQUM3Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLHNCQUFzQixFQUFFLE1BQU07RUFDOUIsVUFBVSxFQUFFLE1BQU07QUFDcEI7O0FBRUE7O0VBRUU7O0FBRUY7O0VBRUUsWUFBWTtBQUNkOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLDZCQUE2QixFQUFFLE1BQU07RUFDckMsb0JBQW9CLEVBQUUsTUFBTTtBQUM5Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSwwQkFBMEIsRUFBRSxNQUFNO0VBQ2xDLGFBQWEsRUFBRSxNQUFNO0FBQ3ZCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOztFQUVFOztBQUVGO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxhQUFhO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcblxcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcbiAqL1xcblxcbm1haW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXG4gKiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3ViLFxcbnN1cCB7XFxuICBmb250LXNpemU6IDc1JTtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07XFxufVxcblxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuaW1nIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG59XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQgeyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3QgeyAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXFxuICovXFxuXFxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06LW1vei1mb2N1c3Jpbmcge1xcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuZmllbGRzZXQge1xcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxuICovXFxuXFxuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcblxcbi8qIE1pc2NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZW1wbGF0ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXG4gKi9cXG5cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYDpyb290IHtcbiAgLS1ob3Zlci1icmlnaHRuZXNzOiA5MCU7XG4gIC0tYWN0aXZlLWJyaWdodG5lc3M6IDgwJTtcbn1cblxuaHRtbCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIHN5c3RlbS11aSwgXCJTZWdvZSBVSVwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmLFxuICAgIFwiQXBwbGUgQ29sb3IgRW1vamlcIiwgXCJTZWdvZSBVSSBFbW9qaVwiLCBcIlNlZ29lIFVJIFN5bWJvbFwiO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbiosXG4qOjpiZWZvcmUsXG4qOjphZnRlciB7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm9yZGVyOiBub25lO1xufVxuXG5oMSB7XG4gIC8qIFRvIG92ZXJyaWRlIE5vcm1hbGl6ZS5jc3MgaDEgbWFyZ2luICovXG4gIG1hcmdpbjogMDtcbn1cblxuYm9keSB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBtYXgtY29udGVudDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmJvYXJkIHtcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgYXNwZWN0LXJhdGlvOiAxO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLWF1dG8tcm93czogMWZyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4uYm9hcmQtcm93IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcbn1cblxuLnNxdWFyZSB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDIxNywgMTgxKTtcbn1cblxuLmJsYWNrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4MSwgMTM2LCA5OSk7XG59XG5cbi51c2VyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjkpO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDJ2dztcbiAgZGlzcGxheTogZ3JpZDtcbiAgYWxpZ24tY29udGVudDogc3RhcnQ7XG4gIGdhcDogNTBweDtcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbmJ1dHRvbjpub3QoW2Rpc2FibGVkXSkge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmJ1dHRvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA1dncpO1xufVxuXG4udGl0bGUge1xuICBmb250LXNpemU6IDUwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmJ1dHRvbnMge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG4gIHJvdy1nYXA6IDI1cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG59XG5cbmJ1dHRvbjpob3Zlcjpub3QoW2Rpc2FibGVkXSkge1xuICBmaWx0ZXI6IGJyaWdodG5lc3ModmFyKC0taG92ZXItYnJpZ2h0bmVzcykpO1xufVxuYnV0dG9uOmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkge1xuICBmaWx0ZXI6IGJyaWdodG5lc3ModmFyKC0tYWN0aXZlLWJyaWdodG5lc3MpKTtcbn1cblxuLmRlbGF5LXdyYXBwZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZGVsYXkge1xuICBwYWRkaW5nOiA1cHggMTBweDtcbiAgbWFyZ2luLXRvcDogMjVweDtcbiAgd2lkdGg6IDUwJTtcbn1cblxuLmtuaWdodC1pY29uIHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4udmlzaXRlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLmJ1dHRvbi13cmFwcGVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnZvbHVtZSB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAxdnc7XG4gIGJvdHRvbTogMXZ3O1xufVxuXG4udm9sdW1lID4gaW1nIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB3aWR0aDogNXZ3O1xuICBhc3BlY3QtcmF0aW86IDE7XG4gIGZpbHRlcjogaW52ZXJ0KDEwMCUpIHNlcGlhKDEwMCUpIHNhdHVyYXRlKDIlKSBodWUtcm90YXRlKDM2ZGVnKVxuICAgIGJyaWdodG5lc3MoMTA1JSkgY29udHJhc3QoMTAxJSk7XG59XG5cbi52b2x1bWUgPiBpbWc6aG92ZXIge1xuICBmaWx0ZXI6IGludmVydCgxMDAlKSBzZXBpYSgxMDAlKSBzYXR1cmF0ZSgyJSkgaHVlLXJvdGF0ZSgzNmRlZylcbiAgICBicmlnaHRuZXNzKDkwJSkgY29udHJhc3QoMTAxJSk7XG59XG5cbi52b2x1bWUgPiBpbWc6YWN0aXZlIHtcbiAgZmlsdGVyOiBpbnZlcnQoMTAwJSkgc2VwaWEoMTAwJSkgc2F0dXJhdGUoMiUpIGh1ZS1yb3RhdGUoMzZkZWcpXG4gICAgYnJpZ2h0bmVzcyg4MCUpIGNvbnRyYXN0KDEwMSUpO1xufVxuXG4udG91ci1lbmRbb3Blbl0ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgZm9udC1zaXplOiBjYWxjKDI4cHggKyAwLjF2dyk7XG4gIGNvbG9yOiByZ2IoMjAsIDIwLCAyMCk7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG4udG91ci1lbmQ6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4udG91ci1lbmQgPiBoMSB7XG4gIGZvbnQtd2VpZ2h0OiAxMDAwO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsdUJBQXVCO0VBQ3ZCLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0Qjs0REFDMEQ7RUFDMUQsWUFBWTtBQUNkOztBQUVBOzs7RUFHRSxtQkFBbUI7RUFDbkIsVUFBVTtFQUNWLFNBQVM7RUFDVCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSx3Q0FBd0M7RUFDeEMsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVDQUF1QztFQUN2QyxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixxQ0FBcUM7QUFDdkM7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0Usb0NBQW9DO0VBQ3BDLFlBQVk7RUFDWixZQUFZO0VBQ1osYUFBYTtFQUNiLG9CQUFvQjtFQUNwQixTQUFTO0VBQ1QscUJBQXFCO0VBQ3JCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLGFBQWE7RUFDYixXQUFXO0VBQ1gscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsMkNBQTJDO0FBQzdDO0FBQ0E7RUFDRSw0Q0FBNEM7QUFDOUM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLGVBQWU7RUFDZixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsVUFBVTtFQUNWLGVBQWU7RUFDZjttQ0FDaUM7QUFDbkM7O0FBRUE7RUFDRTtrQ0FDZ0M7QUFDbEM7O0FBRUE7RUFDRTtrQ0FDZ0M7QUFDbEM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFNBQVM7RUFDVCxnQ0FBZ0M7RUFDaEMsNkJBQTZCO0VBQzdCLDZCQUE2QjtFQUM3QixzQkFBc0I7RUFDdEIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25CXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXG4gIC0taG92ZXItYnJpZ2h0bmVzczogOTAlO1xcbiAgLS1hY3RpdmUtYnJpZ2h0bmVzczogODAlO1xcbn1cXG5cXG5odG1sIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogUm9ib3RvLCBzeXN0ZW0tdWksIFxcXCJTZWdvZSBVSVxcXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYsXFxuICAgIFxcXCJBcHBsZSBDb2xvciBFbW9qaVxcXCIsIFxcXCJTZWdvZSBVSSBFbW9qaVxcXCIsIFxcXCJTZWdvZSBVSSBTeW1ib2xcXFwiO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBpbmhlcml0O1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuXFxuaDEge1xcbiAgLyogVG8gb3ZlcnJpZGUgTm9ybWFsaXplLmNzcyBoMSBtYXJnaW4gKi9cXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIG1heC1jb250ZW50O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLmJvYXJkIHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBhc3BlY3QtcmF0aW86IDE7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDFmcjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG4uYm9hcmQtcm93IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbn1cXG5cXG4uc3F1YXJlIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyMTcsIDE4MSk7XFxufVxcblxcbi5ibGFjayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgxLCAxMzYsIDk5KTtcXG59XFxuXFxuLnVzZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjkpO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMnZ3O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGFsaWduLWNvbnRlbnQ6IHN0YXJ0O1xcbiAgZ2FwOiA1MHB4O1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG5idXR0b246bm90KFtkaXNhYmxlZF0pIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDV2dyk7XFxufVxcblxcbi50aXRsZSB7XFxuICBmb250LXNpemU6IDUwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5idXR0b25zIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICByb3ctZ2FwOiAyNXB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRvbjpob3Zlcjpub3QoW2Rpc2FibGVkXSkge1xcbiAgZmlsdGVyOiBicmlnaHRuZXNzKHZhcigtLWhvdmVyLWJyaWdodG5lc3MpKTtcXG59XFxuYnV0dG9uOmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkge1xcbiAgZmlsdGVyOiBicmlnaHRuZXNzKHZhcigtLWFjdGl2ZS1icmlnaHRuZXNzKSk7XFxufVxcblxcbi5kZWxheS13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5kZWxheSB7XFxuICBwYWRkaW5nOiA1cHggMTBweDtcXG4gIG1hcmdpbi10b3A6IDI1cHg7XFxuICB3aWR0aDogNTAlO1xcbn1cXG5cXG4ua25pZ2h0LWljb24ge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4udmlzaXRlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbi5idXR0b24td3JhcHBlciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnZvbHVtZSB7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAxdnc7XFxuICBib3R0b206IDF2dztcXG59XFxuXFxuLnZvbHVtZSA+IGltZyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB3aWR0aDogNXZ3O1xcbiAgYXNwZWN0LXJhdGlvOiAxO1xcbiAgZmlsdGVyOiBpbnZlcnQoMTAwJSkgc2VwaWEoMTAwJSkgc2F0dXJhdGUoMiUpIGh1ZS1yb3RhdGUoMzZkZWcpXFxuICAgIGJyaWdodG5lc3MoMTA1JSkgY29udHJhc3QoMTAxJSk7XFxufVxcblxcbi52b2x1bWUgPiBpbWc6aG92ZXIge1xcbiAgZmlsdGVyOiBpbnZlcnQoMTAwJSkgc2VwaWEoMTAwJSkgc2F0dXJhdGUoMiUpIGh1ZS1yb3RhdGUoMzZkZWcpXFxuICAgIGJyaWdodG5lc3MoOTAlKSBjb250cmFzdCgxMDElKTtcXG59XFxuXFxuLnZvbHVtZSA+IGltZzphY3RpdmUge1xcbiAgZmlsdGVyOiBpbnZlcnQoMTAwJSkgc2VwaWEoMTAwJSkgc2F0dXJhdGUoMiUpIGh1ZS1yb3RhdGUoMzZkZWcpXFxuICAgIGJyaWdodG5lc3MoODAlKSBjb250cmFzdCgxMDElKTtcXG59XFxuXFxuLnRvdXItZW5kW29wZW5dIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGZvbnQtc2l6ZTogY2FsYygyOHB4ICsgMC4xdncpO1xcbiAgY29sb3I6IHJnYigyMCwgMjAsIDIwKTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4udG91ci1lbmQ6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLnRvdXItZW5kID4gaDEge1xcbiAgZm9udC13ZWlnaHQ6IDEwMDA7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub3JtYWxpemUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiS25pZ2h0c1RvdXIiLCJzdGFydGluZ1BvcyIsImJvYXJkIiwiaW5pdGlhbGl6ZUJvYXJkIiwic3F1YXJlcyIsImNvdW50Iiwicm93IiwiZm9yRWFjaCIsInNxdWFyZSIsInB1c2giLCJnZXRTcXVhcmUiLCJwb3MiLCJ4IiwieSIsInNwbGl0IiwibWFwIiwiaXRlbSIsInBhcnNlSW50IiwicGxhY2VJbml0aWFsIiwicmVzZXRJbml0aWFsIiwiY2xlYXIiLCJjYWxjdWxhdGVkIiwic3RhcnRUb3VyIiwiZ2V0TW92ZXMiLCJtb3ZlcyIsImluaXRpYWxQb3MiLCJrbmlnaHRJY29uIiwibW92ZVNvdW5kIiwidk9uIiwidm9sdW1lRGl2IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidm9sdW1lT2ZmIiwiZGlhbG9nVG91ckVuZCIsIm1vdmVBdWRpbyIsIkF1ZGlvIiwibXV0ZWQiLCJzcmMiLCJ2b2x1bWVPbiIsIkltYWdlIiwia25pZ2h0IiwiYWx0Iiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsImRyYWdnYWJsZSIsImRhcmtlblByZXZpb3VzU3F1YXJlIiwib3BlbkRpYWxvZ1RvdXJFbmQiLCJzaG93Iiwib3BhY2l0eSIsImNsb3NlRGlhbG9nVG91ckVuZCIsImNsb3NlIiwidHVyblZvbHVtZU9mZiIsInJlbW92ZSIsImFwcGVuZENoaWxkIiwidHVyblZvbHVtZU9uIiwicGxheU1vdmVBdWRpbyIsImN1cnJlbnRUaW1lIiwicHJvbWlzZSIsInBsYXkiLCJ1bmRlZmluZWQiLCJjYXRjaCIsImNsYXNzTGlzdCIsImFkZCIsIm1vdmVLbmlnaHQiLCJyZW1vdmVWaXNpdGVkIiwicmVtb3ZlS25pZ2h0IiwicGF1c2UiLCJidXR0b24iLCJidXR0b25Db3B5IiwidGV4dENvbnRlbnQiLCJ1bnBhdXNlIiwiRGlzcGxheSIsIkJvYXJkIiwicXVlcnlTZWxlY3RvckFsbCIsInN0YXJ0VG91ckJ1dHRvbiIsInJlc3RhcnRCdXR0b24iLCJyYW5kb21CdXR0b24iLCJkZWxheUlucHV0IiwicGF1c2VCdXR0b24iLCJwcmV2aW91c0J1dHRvbiIsIm5leHRCdXR0b24iLCJkZWxheSIsInZhbHVlIiwicGF1c2VkIiwidG91clN0YXJ0ZWQiLCJtb3Zlc0luZGV4IiwiY3VycmVudE1vdmUiLCJkaXNhYmxlZCIsImZpbmlzaFRvdXIiLCJyZXN0YXJ0VG91ciIsInJlc3RhcnRBbGwiLCJjbGlja1NxdWFyZSIsImdldEF0dHJpYnV0ZSIsImNsaWNrU3F1YXJlRXZlbnQiLCJ0YXJnZXQiLCJwcmV2ZW50RGVmYXVsdCIsImRyb3BLbmlnaHQiLCJkZWxheU1vdmUiLCJtb3ZlIiwic2V0VGltZW91dCIsImNsaWNrTmV4dCIsImNsaWNrUmFuZG9tIiwicmFuZG9tWCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbVkiLCJpbml0aWFsIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsInJlcG9ydFZhbGlkaXR5IiwidW5Nb3ZlS25pZ2h0IiwiZ2V0QWxsUG9zc2libGVNb3ZlcyIsInBvc2l0aW9uIiwic2V0IiwiU2V0Iiwic3RhcnQiLCJuZXdQb3NpdGlvbiIsImluaXRpYWxpemVHcmFwaCIsImdyYXBoIiwiaSIsImoiLCJzaXplIiwicmVtb3ZlTm9kZSIsImdyYXBoQ2xvbmUiLCJlZGdlcyIsImVkZ2UiLCJuZWlnaGJvdXJFZGdlcyIsImRlbGV0ZSIsInJlc2V0R3JhcGgiLCJrbmlnaHRNb3ZlcyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInBvcCIsImJlc3RNb3ZlcyIsIm1pblNpemUiLCJJbmZpbml0eSIsInJlc3VsdCJdLCJzb3VyY2VSb290IjoiIn0=