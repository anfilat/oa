const {dijkstra, getPath} = require('../src/dijkstra');

describe('алгоритм Дейкстры', () => {
    it('работает для примера из лекции', () => {
        const graph = [
            /*0*/[{v: 1, w: 7}, {v: 2, w: 9}, {v: 5, w: 14}],
            /*1*/[{v: 0, w: 7}, {v: 2, w: 10}, {v: 3, w: 15}],
            /*2*/[{v: 0, w: 9}, {v: 1, w: 10}, {v: 3, w: 11}, {v: 5, w: 2}],
            /*3*/[{v: 1, w: 15}, {v: 2, w: 11}, {v: 4, w: 6}],
            /*4*/[{v: 3, w: 6}, {v: 5, w: 9}],
            /*5*/[{v: 0, w: 14}, {v: 2, w: 2}, {v: 4, w: 9}],
        ];

        // из 0 узла
        let {distance, path} = dijkstra(graph, 0);
        expect(distance).toEqual([0, 7, 9, 20, 20, 11]);
        expect(getPath(path, 0, 1)).toEqual([0, 1]);
        expect(getPath(path, 0, 4)).toEqual([0, 2, 5, 4]);

        // из 4 узла
        ({distance, path} = dijkstra(graph, 4));
        expect(distance).toEqual([20, 21, 11, 6, 0, 9]);
        expect(getPath(path, 4, 1)).toEqual([4, 3, 1]);
        expect(getPath(path, 4, 0)).toEqual([4, 5, 2, 0]);
    });

    it('работает для несвязного графа', () => {
        const graph = [
            /*0*/[{v: 1, w: 7}, {v: 2, w: 9}, {v: 5, w: 14}],
            /*1*/[{v: 0, w: 7}, {v: 2, w: 10}, {v: 3, w: 15}],
            /*2*/[{v: 0, w: 9}, {v: 1, w: 10}, {v: 3, w: 11}, {v: 5, w: 2}],
            /*3*/[{v: 1, w: 15}, {v: 2, w: 11}, {v: 4, w: 6}],
            /*4*/[{v: 3, w: 6}, {v: 5, w: 9}],
            /*5*/[{v: 0, w: 14}, {v: 2, w: 2}, {v: 4, w: 9}],
            // двя связанные только между собой вершины
            /*6*/[{v: 7, w: 1}],
            /*7*/[{v: 6, w: 1}],
        ];

        const {distance, path} = dijkstra(graph, 0);
        expect(distance).toEqual([0, 7, 9, 20, 20, 11, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]);
        expect(getPath(path, 0, 6)).toEqual(null);
        expect(getPath(path, 0, 7)).toEqual(null);
    });

    it('работает для второго примера из лекции', () => {
        const graph = [
            /*A*/[{v: 1, w: 2}, {v: 2, w: 3}, {v: 3, w: 6}],
            /*B*/[{v: 0, w: 2}, {v: 2, w: 4}, {v: 4, w: 9}],
            /*C*/[{v: 0, w: 3}, {v: 1, w: 4}, {v: 3, w: 1}, {v: 4, w: 7}, {v: 5, w: 6}],
            /*D*/[{v: 0, w: 6}, {v: 2, w: 1}, {v: 5, w: 4}],
            /*E*/[{v: 1, w: 9}, {v: 2, w: 7}, {v: 5, w: 1}, {v: 6, w: 5}],
            /*F*/[{v: 2, w: 6}, {v: 3, w: 4}, {v: 4, w: 1}, {v: 6, w: 8}],
            /*G*/[{v: 4, w: 5}, {v: 5, w: 8}],
        ];

        const {distance, path} = dijkstra(graph, 0);
        expect(distance).toEqual([0, 2, 3, 4, 9, 8, 14]);
        expect(getPath(path, 0, 2)).toEqual([0, 2]);
        expect(getPath(path, 0, 6)).toEqual([0, 2, 3, 5, 4, 6]);
    });
});
