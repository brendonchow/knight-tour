// const lodash = require("../node_modules/lodash");
import lodash from "lodash";

const getAllPossibleMoves = (pos) => {
  const position = pos.split("").map((item) => parseInt(item, 10));
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

const initializeGraph = () => {
  const graph = {};
  for (let i = 0; i <= 7; i += 1) {
    for (let j = 0; j <= 7; j += 1) {
      graph[`${i}${j}`] = getAllPossibleMoves(`${i}${j}`);
    }
  }
  return { size: 64, graph };
};

const removeNode = (pos, graph) => {
  const graphClone = lodash.cloneDeep(graph);
  const edges = graphClone.graph[pos];
  edges.forEach((edge) => {
    const neighbourEdges = graphClone.graph[edge];
    neighbourEdges.delete(pos);
  });

  delete graphClone.graph[pos];
  graphClone.size -= 1;
  return [edges, graphClone];
};

const getGraphEdges = (graph) => {
  let lowestDegree = Infinity;
  let totalEdges = 0;
  let lowestDegreeCount = 0;
  Object.keys(graph.graph).forEach((vertex) => {
    const edges = graph.graph[vertex];
    totalEdges += edges.size;
    if (edges.size < lowestDegree) {
      lowestDegree = edges.size;
      lowestDegreeCount = 1;
    } else if (edges.size === lowestDegree) lowestDegreeCount += 1;
  });
  return [lowestDegree, lowestDegreeCount, totalEdges];
};

const getOptimalMoves = (pos, graph, depth = 1) => {
  const [edges, newGraph] = removeNode(pos, graph);
  if (newGraph.size === 0) {
    return [Infinity, 0, Infinity];
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
  edges.forEach((edge) => {
    const [minDegree, minDegreeCount, countEdges] = getOptimalMoves(
      edge,
      newGraph,
      depth - 1,
    );
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
    return null;
  });

  return [lowestDegree, lowestDegreeCount, totalEdges];
};

const knightMoves = (pos, graph = initializeGraph(), moves = []) => {
  const [edges, newGraph] = removeNode(pos, graph);
  const newMoves = lodash.cloneDeep(moves);
  newMoves.push(pos);
  if (newGraph.size === 0) {
    return newMoves;
  }

  if (edges.size === 0) return null;
  let lowestDegree = 0;
  let lowestDegreeCount = Infinity;
  let totalEdges = 0;
  let bestMoves = [];
  // Why does depth 1 only require 63 recursive knightMoves calls while depth 0 takes
  // forever. Seems like depth 1 never searches the wrong path.
  // Why does depth 2 starting on [3, 3] not produce the correct result?
  edges.forEach((edge) => {
    const [minDegree, minDegreeCount, countEdges] = getOptimalMoves(
      edge,
      newGraph,
    );
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
      bestMoves = [];
      bestMoves.push(edge);
    } else if (
      minDegree === lowestDegree &&
      minDegreeCount === lowestDegreeCount &&
      countEdges === totalEdges
    ) {
      bestMoves.push(edge);
    }
  });

  // const promises = [];
  for (let i = 0; i < bestMoves.length; i += 1) {
    const result = knightMoves(
      bestMoves[i],
      newGraph,
      lodash.cloneDeep(newMoves),
    );
    if (result) return result;
    // promises.push(result);
  }

  // return Promise.any(promises);
  return null;
};

export default knightMoves;

// TESTS
// const test = () => {
//   for (let i = 0; i <= 7; i += 1) {
//     for (let j = 0; j <= 7; j += 1) {
//       const result = knightMoves(`${i}${j}`);
//       if (result) console.log("Success");
//     }
//   }
// };
// test();

// const start = performance.now();
// const result = knightMoves("33");
// if (result) {
//   const end = performance.now();
//   console.log(result);
//   displayBoard(result);
//   console.log(`Execution time: ${end - start} ms`);
// } else {
//   console.log("Error!");
// }