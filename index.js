const graph = {
  A: [
    { node: "C", weight: 4 },
    { node: "D", weight: 2 }
  ],
  B: [
    { node: "E", weight: 4 },
    { node: "F", weight: 7 }
  ],
  C: [
    { node: "A", weight: 4 },
    { node: "D", weight: 1 },
    { node: "E", weight: 5 }
  ],
  D: [
    { node: "A", weight: 2 },
    { node: "C", weight: 1 },
    { node: "E", weight: 3 },
    { node: "F", weight: 6 }
  ],
  E: [
    { node: "C", weight: 5 },
    { node: "D", weight: 3 },
    { node: "F", weight: 2 },
    { node: "B", weight: 4 }
  ],
  F: [
    { node: "D", weight: 6 },
    { node: "E", weight: 2 },
    { node: "B", weight: 7 }
  ]
};


function dijkstra(graph, start, end) {

  const distances = {};
  const previous = {};
  const visited = new Set();

  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }

  distances[start] = 0;


  while (visited.size < Object.keys(graph).length) {

    let currentNode = null;
    let smallestDistance = Infinity;


    for (let node in distances) {
      if (!visited.has(node) && distances[node] < smallestDistance) {
        smallestDistance = distances[node];
        currentNode = node;
      }
    }


    if (currentNode === null) break;

    visited.add(currentNode);


    for (let neighbour of graph[currentNode]) {

      let newDistance =
        distances[currentNode] + neighbour.weight;


      if (newDistance < distances[neighbour.node]) {

        distances[neighbour.node] = newDistance;
        previous[neighbour.node] = currentNode;

      }
    }
  }


  const path = [];
  let current = end;


  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }


  return path;
}


const route = dijkstra(graph, "A", "B");

console.log({
  route: route
});

