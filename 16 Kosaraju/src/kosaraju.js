// graph - массив смежности a[N][]
function kosaraju(graph) {
    // количество вершин
    const n = graph.length;

    const reversedGraph = reverseGraph(graph, n);
    const queue = findQueue(reversedGraph, n);
    return findComponents(graph, n, queue);
}

function reverseGraph(graph, n) {
    const result = [];

    for (let i = 0; i < n; i++) {
        result[i] = [];
    }
    for (let i = 0; i < n; i++) {
        graph[i].forEach(v => result[v].push(i));
    }

    return result;
}

function findQueue(graph, n) {
    const queue = [];

    const touched = new Int8Array(n);
    for (let i = 0; i < n; i++) {
        if (!touched[i]) {
            dfsReversed(graph, touched, queue, i);
        }
    }

    return queue;
}

function dfsReversed(graph, touched, queue, v) {
    touched[v] = 1;

    graph[v].forEach(w => {
        if (!touched[w]) {
            dfsReversed(graph, touched, queue, w);
        }
    });

    queue.push(v);
}

function findComponents(graph, n, queue) {
    const components = new Array(n);
    components.fill(-1);

    let componentNum = 1;
    for (let i = n - 1; i >= 0; i--) {
        const v = queue[i];
        if (components[v] === -1) {
            dfs(graph, components, componentNum, v);
            componentNum++;
        }
    }

    return components;
}

function dfs(graph, components, componentNum, v) {
    components[v] = componentNum;

    graph[v].forEach(w => {
        if (components[w] === -1) {
            dfs(graph, components, componentNum, w);
        }
    });
}

module.exports = kosaraju;
