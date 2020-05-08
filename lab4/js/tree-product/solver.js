class Vertex {
    constructor() {
        this.neigbours = [];
    }

    copy() {
        const vertexCopy = new Vertex();
        vertexCopy.neigbours = [...this.neigbours];
        return vertexCopy;
    }
}

class TreeGraph {
    constructor() {
        this.vertices = [];
        this.size = 0;
    }

    addEdge(v1, v2) {
        if (this.vertices[v1] === undefined) {
            this.vertices[v1] = new Vertex();
            ++this.size;
        }
        if (this.vertices[v2] === undefined) {
            this.vertices[v2] = new Vertex();
            ++this.size;
        }
        this.vertices[v1].neigbours.push(v2);
        this.vertices[v2].neigbours.push(v1);
    }

    containsEdge(v1, v2) {
        return this.vertices[v1] !== undefined && this.vertices[v2] !== undefined;
    }

    divideByEdge(v1, v2) {
        const edgeQueue = [];
        const visited = [];
        for (const vertex of this.vertices) {
            if (vertex === undefined) {
                visited.push(undefined);
            } else {
                visited.push(false);
            }
        }
        if (this.vertices[v1] === undefined || this.vertices[v2] === undefined) {
            console.log("this.vertices[v1] === undefined || this.vertices[v2] === undefined");
        }

        edgeQueue.push(this.vertices[v1]);
        visited[v1] = true;
        visited[v2] = true; // skip this vertex
        while (edgeQueue.length > 0) {
            const currentVertex = edgeQueue.shift();
            for (const vertexID of currentVertex.neigbours) {
                if (this.vertices[vertexID] === undefined) {
                    continue;
                }
                if (visited[vertexID] === true) {
                    continue;
                }
                edgeQueue.push(this.vertices[vertexID]);
                visited[vertexID] = true;
            }
        }

        visited[v2] = false;
        const treeV1 = new TreeGraph();
        const treeV2 = new TreeGraph();
        for (let i = 0; i < visited.length; ++i) {
            if (visited[i] === true) {
                treeV1.vertices[i] = this.vertices[i].copy();
                ++treeV1.size;
            } else if (visited[i] === false) {
                treeV2.vertices[i] = this.vertices[i].copy();
                ++treeV2.size;
            }
        }
        return [treeV1, treeV2];
    }

    // clone() {
    //     const clonedGraph = new TreeGraph();
    //     clonedGraph.size = this.size;
    //     for (let i = 0; i < this.vertices.length; ++i) {
    //         clonedGraph.vertices.push(new Vertex());
    //     }
    //     for (let i = 0; i < this.vertices.length; ++i) {
    //         clonedGraph.vertices[i].neigbours = [...this.vertices[i].neigbours];
    //     }
    //     return clonedGraph;
    // }
}

class Edge {
    constructor(v1, v2) {
        this.v1 = v1;
        this.v2 = v2;
    }
}

class Solver {
    solve(A, B) {
        const edges = [];
        for (let i = 0; i < A.length; ++i) {
            edges.push(new Edge(A[i], B[i]));
        }

        const originalTree = new TreeGraph();
        for (const edge of edges) {
            originalTree.addEdge(edge.v1, edge.v2);
        }
        let bestSolution = originalTree.size;

        for (let i = 0; i < edges.length; ++i) {
            let subTrees = originalTree.divideByEdge(edges[i].v1, edges[i].v2);
            let currentSolution = subTrees[0].size * subTrees[1].size;
            if (currentSolution > bestSolution) {
                bestSolution = currentSolution;
            }
        }

        for (let i = 0; i < edges.length; ++i) {
            let subTrees = originalTree.divideByEdge(edges[i].v1, edges[i].v2);
            for (let j = i + 1; j < edges.length; ++j) {
                let treeToDivide;
                let finalSubTreeIdx;
                if (subTrees[0].containsEdge(edges[j].v1, edges[j].v2)) {
                    treeToDivide = subTrees[0];
                    finalSubTreeIdx = 1;
                } else {
                    treeToDivide = subTrees[1];
                    finalSubTreeIdx = 0;
                }
                let subSubTrees = treeToDivide.divideByEdge(edges[j].v1, edges[j].v2);
                let currentSolution = subTrees[finalSubTreeIdx].size * subSubTrees[0].size * subSubTrees[1].size;
                if (currentSolution > bestSolution) {
                    bestSolution = currentSolution;
                }
            }
        }

        return bestSolution + "";
    }
}


function solution(A, B) {
    return new Solver().solve(A, B);
}

main();

function main() {
    const A1 = [0, 1, 1, 3, 3, 6, 7];
    const B1 = [1, 2, 3, 4, 5, 3, 5];

    const A2 = [0, 1];
    const B2 = [1, 2];

    console.log("A1, B1 - (18): " + solution(A1, B1));
    console.log("A2, B2 -  (3): " + solution(A2, B2));
}