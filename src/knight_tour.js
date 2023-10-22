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

const knightMoves = (pos, graph = initializeGraph(), moves = []) => {
  const [edges, newGraph] = removeNode(pos, graph);
  const newMoves = lodash.cloneDeep(moves);
  newMoves.push(pos);
  if (newGraph.size === 0) {
    return newMoves;
  }

  if (edges.size === 0) {
    return null;
  }

  let bestMoves = [];
  edges.forEach((edge) => {
    if (bestMoves.length === 0) {
      bestMoves = [edge];
    } else if (newGraph.graph[edge].size < newGraph.graph[bestMoves[0]].size) {
      bestMoves = [edge];
    } else if (
      newGraph.graph[edge].size === newGraph.graph[bestMoves[0]].size
    ) {
      bestMoves.push(edge);
    }
  });

  for (let i = 0; i < bestMoves.length; i += 1) {
    const result = knightMoves(bestMoves[i], newGraph, newMoves);
    if (result) return result;
  }
  return null;
};

export default knightMoves;

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
//         const time = end - start;
//         if (time > max) max = time;
//         average += time;
//       } else {
//         throw Error(`Failed on ${i}${j}`);
//       }
//     }
//   }
//   console.log(`Max time taken: ${max} ms`);
//   console.log(`Average time taken: ${average / 64}`);
// };
// test();
