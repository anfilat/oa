const kruskal = require('../src/kruskal');

describe('алгоритм Краскала', () => {
    it('работает для примера из лекции', () => {
        const graph = [
            [{v: 1, w: 7}, {v: 3, w: 5}],
            [{v: 0, w: 7}, {v: 2, w: 8}, {v: 3, w: 9}, {v: 4, w: 7}],
            [{v: 1, w: 8}, {v: 4, w: 5}],
            [{v: 0, w: 5}, {v: 1, w: 9}, {v: 4, w: 15}, {v: 5, w: 6}],
            [{v: 1, w: 7}, {v: 2, w: 5}, {v: 3, w: 15}, {v: 5, w: 8}, {v: 6, w: 9}],
            [{v: 3, w: 6}, {v: 4, w: 8}, {v: 6, w: 11}],
            [{v: 5, w: 11}, {v: 4, w: 9}],
        ];

        expect(kruskal(graph)).toEqual([{v1: 0, v2: 3}, {v1: 2, v2: 4}, {v1: 3, v2: 5}, {v1: 0, v2: 1}, {v1: 1, v2: 4}, {v1: 4, v2: 6}]);
    });

    it('работает для примера из Седжвика', () => {
        const graph = [
            [{v: 1, w: .32}, {v: 2, w: .29}, {v: 5, w: .60}, {v: 6, w: .51}, {v: 7, w: .31}],
            [{v: 0, w: .32}, {v: 7, w: .21}],
            [{v: 0, w: .29}],
            [{v: 4, w: .34}, {v: 5, w: .18}],
            [{v: 3, w: .34}, {v: 5, w: .40}, {v: 6, w: .51}, {v: 7, w: .46}],
            [{v: 0, w: .60}, {v: 3, w: .18}, {v: 4, w: .40}],
            [{v: 0, w: .51}, {v: 4, w: .51}, {v: 7, w: .25}],
            [{v: 0, w: .31}, {v: 1, w: .21}, {v: 4, w: .46}, {v: 6, w: .25}],
        ];

        expect(kruskal(graph)).toEqual([{v1: 3, v2: 5}, {v1: 1, v2: 7}, {v1: 6, v2: 7}, {v1: 0, v2: 2}, {v1: 0, v2: 7}, {v1: 3, v2: 4}, {v1: 4, v2: 7}]);
    });
});