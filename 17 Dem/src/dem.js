// graph - массив смежности a[N][]
function dem(graph) {
    // количество вершин
    const n = graph.length;

    const matrix = makeMatrix(graph, n);
    const m = makeM(matrix, n);
    const v = makeNodesSet(n);
    const result = [];
    let level = 0;

    while (v.size > 0) {
        const zero = getZeros(v, m);
        result.push(zero);
        zero.forEach(node => {
            v.delete(node);
            reCalcM(matrix, node, n, m);
        });
        level++;
    }

    return result;
}

// строим матрицу смежности
function makeMatrix(graph, n) {
    const result = [];

    for (let i = 0; i < n; i++) {
        result[i] = new Int32Array(n);
        graph[i].forEach(v => result[i][v] = 1);
    }

    return result;
}

// строим суммы полустепеней захода
function makeM(matrix, n) {
    const result = new Int32Array(n);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            result[i] += matrix[j][i];
        }
    }

    return result;
}

// стрим набор всех узлов
function makeNodesSet(n) {
    const result = new Set();

    for (let i = 0; i < n; i++) {
        result.add(i);
    }

    return result;
}

// возвращает список истоковых узлов очередного слоя
function getZeros(v, m) {
    const zero = [];

    v.forEach(node => {
        if (m[node] === 0) {
            zero.push(node);
        }
    });

    return zero;
}

// удаляет дуги для указанного узла
function reCalcM(matrix, node, n, m) {
    const line = matrix[node];
    for (let i = 0; i < n; i++) {
        m[i] -= line[i];
    }
}

module.exports = dem;
