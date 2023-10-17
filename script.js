const lodash = require("./node_modules/lodash");

const createQueue = () => {
  let head = null;
  let tail = null;
  let length = 0;

  const enqueue = (data) => {
    length += 1;
    if (tail === null) {
      head = { data, next: null };
      tail = head;
      return;
    }
    tail.next = { data, next: null };
    tail = tail.next;
  };

  const dequeue = () => {
    if (head === null) return null;
    const returnValue = head.data;
    head = head.next;
    if (head === null) tail = null;
    length -= 1;
    return returnValue;
  };

  const toString = () => {
    let string = "";
    let temp = head;
    while (temp !== null) {
      string += temp.data;
      if (temp.next !== null) {
        string += " -> ";
      }
      temp = temp.next;
    }

    return string === "" ? "Empty Queue" : string;
  };

  const isEmpty = () => {
    return head === null;
  };

  const peek = () => {
    return head === null ? null : head.data;
  };

  return {
    enqueue,
    dequeue,
    toString,
    isEmpty,
    peek,
    get length() {
      return length;
    },
  };
};

const reverseList = (head) => {
  count++;
  if (head === null) return [];
  const result = reverseList(head.prev);
  result.push(head.position);
  return result;
};

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
let lowest = Infinity;
// If one reachable vertex has a degree of one, move to it
const knightMoves = (pos, graph = initializeGraph(), moves = []) => {
  lowest = lowest < graph.size ? lowest : graph.size;
  console.log(lowest);
  if (lowest === graph.size) displayBoard(moves);
  const edges = removeNode(pos, graph);
  moves.push(pos);

  if (graph.size === 0) {
    console.log("Graph Size 0")
    return [graph, moves];
  }
  if (edges.size === 0) null;

  let lowestDegree = 0;
  let lowestDegreeCount = Infinity;
  let totalEdges = 0;
  const bestMoves = new Set();
  const depth = Math.floor((64 - graph.size) / 4);
  for (const edge of edges) {
    const [minDegree, minDegreeCount, countEdges] = getOptimalMoves(
      edge,
      graph,
      depth
    );
    // if (minDegree === 1) {
    //   console.log(graph.graph)
    //   displayBoard(moves)
    //   console.log(edge);
    //   return [graph,moves];
    // }
    if (minDegree == Infinity && minDegreeCount == Infinity && countEdges == Infinity) {
      console.log("Infinity");
      bestMoves.clear();
      bestMoves.add(edge);
      break;
    }
    if (minDegree > 0 &&
      (minDegree > lowestDegree ||
      (minDegree === lowestDegree && minDegreeCount < lowestDegreeCount) ||
      (minDegree === lowestDegree &&
        minDegreeCount === lowestDegreeCount &&
        countEdges > totalEdges))
    ) {
      // console.log(
      //   minDegree,
      //   minDegreeCount,
      //   countEdges,
      //   lowestDegree,
      //   lowestDegreeCount,
      //   totalEdges
      // );
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
  if (lowest === graph.size) console.log(bestMoves, lowestDegree, lowestDegreeCount);
  // if (lowestDegree === 3) {
  //   displayBoard(moves);
  //   console.log(bestMoves)
  // } 
  for (const move of bestMoves) {
    const graphClone = lodash.cloneDeep(graph);
    const movesClone = lodash.cloneDeep(moves);
    // if (lowestDegree === 3) console.log(move);
    const result = knightMoves(move, graphClone, movesClone);
    if (result) return result;
  }
};

const getOptimalMoves = (pos, graph, depth = 6) => {
  const graphClone = lodash.cloneDeep(graph);
  const edges = removeNode(pos, graphClone);
  if (graphClone.size === 0) {
    console.log("Graph Size 0")
    return [Infinity, Infinity, Infinity]
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
    if (minDegree == Infinity && minDegreeCount == Infinity && countEdges == Infinity) {
      return [Infinity, Infinity, Infinity];
    }
    if (
      minDegree > lowestDegree ||
      (minDegree === lowestDegree && minDegreeCount < lowestDegreeCount) ||
      (minDegree === lowestDegree &&
        minDegreeCount === lowestDegreeCount &&
        countEdges > totalEdges)
    ) {
      // console.log(
      //   minDegree,
      //   minDegreeCount,
      //   countEdges,
      //   lowestDegree,
      //   lowestDegreeCount,
      //   totalEdges
      // );
      lowestDegree = minDegree;
      lowestDegreeCount = minDegreeCount;
      totalEdges = countEdges;
    }
  }

  return [lowestDegree, lowestDegreeCount, totalEdges];
};

const result = knightMoves("00");
if (result) {
  console.log(result[0]);
  displayBoard(result[1]);
}

