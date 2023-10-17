const lodash = require("./node_modules/lodash");

const displayBoard = (moves) => {
  const array = [];
  for (let i = 0; i <= 7; i++) {
    array.push([]);
    for (let j = 0; j <= 7; j++) {
      array[i][j] = ".";
    }
  }

  for (let i = 0; i < moves.length; i++) {
    if (i === moves.length - 1) {
      array[7 - moves[i][1]][moves[i][0]] = "X";
    } else {
      array[7 - moves[i][1]][moves[i][0]] = "O";
    }
  }

  for (let i = 0; i <= 7; i++) {
    string = "";
    for (let j = 0; j <= 7; j++) {
      string += `${array[i][j]}  `;
    }
    console.log(string);
  }
};

const getAllPossibleMoves = (pos) => {
  const position = pos.split("").map((item) => parseInt(item));
  const set = new Set();
  const moveKnight = (start, x, y) => {
    const newPosition = [start[0] + x, start[1] + y];
    if (
      newPosition[0] <= 7 &&
      newPosition[0] >= 0 &&
      newPosition[1] <= 7 &&
      newPosition[1] >= 0
    )
      set.add(`${newPosition[0]}${newPosition[1]}`);
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

const boardGraph = () => {
  const graph = {};
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      graph[`${i}${j}`] = {};
    }
  }
  return graph;
};

const initializeGraph = () => {
  const graph = boardGraph();
  for (const position in graph) {
    graph[position] = getAllPossibleMoves(position);
  }
  return { size: 64, graph };
};

const removeNode = (pos, graph) => {
  const edges = graph.graph[pos];
  for (const edge of edges) {
    const neighbourEdges = graph.graph[edge];
    neighbourEdges.delete(pos);
  }
  delete graph.graph[pos];
  graph.size -= 1;
  return edges;
};

const getGraphEdges = (graph) => {
  let lowestDegree = Infinity;
  let totalEdges = 0;
  let lowestDegreeCount = 0;
  for (const vertex in graph.graph) {
    const edges = graph.graph[vertex];
    totalEdges += edges.size;
    if (edges.size < lowestDegree) {
      lowestDegree = edges.size;
      lowestDegreeCount = 1;
    } else if (edges.size === lowestDegree) lowestDegreeCount++;
  }
  return [lowestDegree, lowestDegreeCount, totalEdges];
};

// Maybe Implement: If one reachable vertex has a degree of one, move to it
// let lowestSize = Infinity;
const knightMoves = (pos, graph = initializeGraph(), moves = []) => {
  // if (graph.size < lowestSize) {
  //   lowestSize = graph.size;
  //   console.log(lowestSize);
  // }

  const edges = removeNode(pos, graph);
  moves.push(pos);

  if (graph.size === 0) {
    return [graph, moves];
  }
  if (edges.size === 0) null;

  let lowestDegree = 0;
  let lowestDegreeCount = Infinity;
  let totalEdges = 0;
  const bestMoves = new Set();
  // Why is depth 0 so slow??
  const depth = 0;
  for (const edge of edges) {
    const [minDegree, minDegreeCount, countEdges] = getOptimalMoves(
      edge,
      graph
      // depth
    );
    if (
      minDegree == Infinity &&
      minDegreeCount == Infinity &&
      countEdges == Infinity
    ) {
      bestMoves.clear();
      bestMoves.add(edge);
      break;
    }
    if (
      minDegree > 0 &&
      (minDegree > lowestDegree ||
        (minDegree === lowestDegree && minDegreeCount < lowestDegreeCount) ||
        (minDegree === lowestDegree &&
          minDegreeCount === lowestDegreeCount &&
          countEdges > totalEdges))
    ) {
      lowestDegree = minDegree;
      lowestDegreeCount = minDegreeCount;
      totalEdges = countEdges;
      bestMoves.clear();
      bestMoves.add(edge);
    } else if (
      minDegree === lowestDegree &&
      minDegreeCount === lowestDegreeCount &&
      countEdges === totalEdges
    ) {
      bestMoves.add(edge);
    }
  }
  for (const move of bestMoves) {
    const graphClone = lodash.cloneDeep(graph);
    const movesClone = lodash.cloneDeep(moves);
    const result = knightMoves(move, graphClone, movesClone);
    if (result) return result;
  }
};

const getOptimalMoves = (pos, graph, depth = 1) => {
  const graphClone = lodash.cloneDeep(graph);
  const edges = removeNode(pos, graphClone);
  if (graphClone.size === 0) {
    return [Infinity, Infinity, Infinity];
  }

  if (edges.size === 0) {
    return [0, Infinity, 0];
  }

  if (depth === 0) {
    const result = getGraphEdges(graph);
    return result;
  }

  let lowestDegree = 0;
  let lowestDegreeCount = Infinity;
  let totalEdges = 0;
  for (const edge of edges) {
    const [minDegree, minDegreeCount, countEdges] = getOptimalMoves(
      edge,
      graphClone,
      depth - 1
    );
    if (
      minDegree == Infinity &&
      minDegreeCount == Infinity &&
      countEdges == Infinity
    ) {
      return [Infinity, Infinity, Infinity];
    }
    if (
      minDegree > lowestDegree ||
      (minDegree === lowestDegree && minDegreeCount < lowestDegreeCount) ||
      (minDegree === lowestDegree &&
        minDegreeCount === lowestDegreeCount &&
        countEdges > totalEdges)
    ) {
      lowestDegree = minDegree;
      lowestDegreeCount = minDegreeCount;
      totalEdges = countEdges;
    }
  }

  return [lowestDegree, lowestDegreeCount, totalEdges];
};

const test = () => {
  let max = 0;
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      const start = performance.now();
      const result = knightMoves(`${i}${j}`);
      if (result) {
        const end = performance.now();
        const difference = end - start;
        if (difference > max) max = difference;
      } else {
        console.log("Error");
        return;
      }
    }
  }
  console.log(`Max time: ${max} ms`);
};

test();
// const start = performance.now();
// const result = knightMoves("33");
// if (result) {
//   const end = performance.now();
//   console.log(result[0]);
//   displayBoard(result[1]);
//   console.log(`Execution time: ${end - start} ms`);
// } else {
//   ("Error!");
// }
