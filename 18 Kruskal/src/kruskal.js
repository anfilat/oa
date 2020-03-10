// graph - массив смежности a[N][]
// каждый узел задается структурой {v, w}, где - v - номер смежного узла, w - вес ребра
// так как граф неориентированный, то каждое ребро задано два раза
function kruskal(graph) {
    // количество вершин
    const n = graph.length;

    const parents = makeParents(n);
    const edges = makeEdges(graph, n);
    const result = [];

    for (let i = 0; i < edges.length; i++) {
        const {v1, v2} = edges[i];

        if (findSet(parents, v1) !== findSet(parents, v2)) {
            merge(parents, v1, v2);
            result.push({v1, v2});

            // построено полное дерево
            if (result.length === n - 1) {
                break;
            }
        }
    }

    return result;
}

// создаем структуру Union-Find. Первоначально каждая вершина является отдельной группой
function makeParents(n) {
    const parents = [];

    for (let i = 0; i < n; i++) {
        parents[i] = i;
    }

    return parents;
}

// создаем сортированный список всех ребер. Так как каждое ребро задано два раза, то берем только ребра, у которых
// номер второй вершины больше номера первой
function makeEdges(graph, n) {
    const result = [];

    for (let i = 0; i < n; i++) {
        graph[i].forEach(({v, w}) => {
            if (v > i) {
                result.push({
                    v1: i,
                    v2: v,
                    w
                });
            }
        });
    }
    result.sort((a, b) => a.w - b.w);

    return result;
}

// поиск идентификатора множества (корня)
function findSet(parents, v) {
    let u = parents[v];
    while (u !== v) {
        v = u;
        u = parents[v];
    }

    return u;
}

function merge(parents, v, u) {
    u = findSet(parents, u);
    v = findSet(parents, v);

    parents[u] = v;
}

module.exports = kruskal;
