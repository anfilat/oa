// graph - массив смежности a[N][]
function iterKosaraju(graph) {
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
            touched[i] = 1;
            dfsReversed(graph, touched, queue, i);
        }
    }

    return queue;
}

function dfsReversed(graph, touched, queue, v) {
    const stack = [v];
    const order = [];
    while (stack.length > 0) {
        const node = stack.pop();

        order.push(node);

        graph[node].forEach(w => {
            if (!touched[w]) {
                touched[w] = 1;
                stack.push(w);
            }
        });
    }

    while (order.length > 0) {
        queue.push(order.pop());
    }
}

function findComponents(graph, n, queue) {
    const components = new Array(n);
    components.fill(-1);

    let componentNum = 1;
    for (let i = n - 1; i >= 0; i--) {
        const v = queue[i];
        if (components[v] === -1) {
            components[v] = componentNum;
            dfs(graph, components, componentNum, v);
            componentNum++;
        }
    }

    return components;
}

function dfs(graph, components, componentNum, v) {
    const stack = [v];

    while (stack.length > 0) {
        const node = stack.pop();
        graph[node].forEach(w => {
            if (components[w] === -1) {
                components[w] = componentNum;
                stack.push(w);
            }
        });
    }
}

module.exports = iterKosaraju;
