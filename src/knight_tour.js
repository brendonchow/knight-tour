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
  const graphClone = graph;
  const edges = graphClone.graph[pos];
  edges.forEach((edge) => {
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
  edges.forEach((edge) => {
    const neighbourEdges = graphClone.graph[edge];
    neighbourEdges.add(pos);
  });
};

const knightMoves = (pos, graph = initializeGraph(), moves = []) => {
  const edges = removeNode(pos, graph);
  moves.push(pos);
  if (graph.size === 0) {
    return moves;
  }

  if (edges.size === 0) {
    resetGraph(pos, graph, edges);
    return null;
  }

  let bestMoves = [];
  let minSize = Infinity;
  edges.forEach((edge) => {
    const { size } = graph.graph[edge];
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
//   console.log(`Average time taken: ${average / 64} ms`);
// };
// test();
