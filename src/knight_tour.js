const lodash = require("../node_modules/lodash");
// import lodash from "lodash";

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
  let lowestDegreeCount = 0;
  Object.keys(graph.graph).forEach((vertex) => {
    const edges = graph.graph[vertex];
    if (edges.size < lowestDegree) {
      lowestDegree = edges.size;
      lowestDegreeCount = 1;
    } else if (edges.size === lowestDegree) lowestDegreeCount += 1;
  });
  return [lowestDegree, lowestDegreeCount];
};

// Depth should be odd number.

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
  edges.forEach((edge) => {
    const [minDegree, minDegreeCount] = getOptimalMoves(
      edge,
      newGraph,
      depth - 1,
    );
    if (
      minDegree > lowestDegree ||
      (minDegree === lowestDegree && minDegreeCount < lowestDegreeCount)
    ) {
      lowestDegree = minDegree;
      lowestDegreeCount = minDegreeCount;
    }
    return null;
  });

  return [lowestDegree, lowestDegreeCount];
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
  let bestMoves = [];

  edges.forEach((edge) => {
    const [minDegree, minDegreeCount] = getOptimalMoves(edge, newGraph);
    if (
      minDegree > lowestDegree ||
      (minDegree === lowestDegree && minDegreeCount < lowestDegreeCount)
    ) {
      lowestDegree = minDegree;
      lowestDegreeCount = minDegreeCount;
      bestMoves = [];
      bestMoves.push(edge);
    } else if (
      minDegree === lowestDegree &&
      minDegreeCount === lowestDegreeCount
    ) {
      bestMoves.push(edge);
    }
  });

  for (let i = 0; i < bestMoves.length; i += 1) {
    const result = knightMoves(
      bestMoves[i],
      newGraph,
      lodash.cloneDeep(newMoves),
    );
    if (result) return result;
  }

  return null;
};

// export default knightMoves;

// TESTING
const test = () => {
  for (let i = 0; i <= 7; i += 1) {
    for (let j = 0; j <= 7; j += 1) {
      const result = knightMoves(`${i}${j}`);
      if (result) console.log("Success");
    }
  }
};
test();
