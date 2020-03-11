const {PriorityQueueMin} = require('./priorityQueueMin');

// graph - массив смежности a[N][]
// каждый узел задается структурой {v, w}, где - v - номер смежного узла, w - вес ребра
// так как граф неориентированный, то каждое ребро задано два раза
function dijkstra(graph, from) {
    // количество вершин
    const n = graph.length;

    const queue = makeQueue(n);
    const distance = makeDistance(n);
    const path = new Int32Array(n).fill(-1);

    queue.decWeight(from, 0);

    while (!queue.isEmpty()) {
        const node = queue.dequeue();
        // остались недоступные вершины
        if (node.weight === Number.POSITIVE_INFINITY) {
            break;
        }

        graph[node.key].forEach(({v, w}) => {
            if (queue.has(v)) {
                if (node.weight + w < queue.get(v).weight) {
                    queue.decWeight(v, node.weight + w);
                    path[v] = node.key;
                }
            }
        });
        distance[node.key] = node.weight;
    }

    return {distance, path};
}

function makeQueue(n) {
    const result = new PriorityQueueMin();

    for (let i = 0; i < n; i++) {
        result.enqueue({key: i, weight: Number.POSITIVE_INFINITY});
    }

    return result;
}

function makeDistance(n) {
    const result = [];

    for (let i = 0; i < n; i++) {
        result.push(Number.POSITIVE_INFINITY);
    }

    return result;
}

// возвращает путь от узла from в узел to
// или null, если такого пути нет
function getPath(path, from, to) {
    const result = [];

    let v = to;
    while (v !== from) {
        result.push(v);
        v = path[v];
        if (v === -1) {
            return null;
        }
    }
    result.push(from);

    return result.reverse();
}

module.exports = {
    dijkstra,
    getPath
};
