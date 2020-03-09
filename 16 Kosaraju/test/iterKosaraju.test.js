const kosaraju = require('../src/iterKosaraju');

describe('kosaraju', () => {
    it('работает на несвязанном графе', () => {
        const graph = [
            [],
            [],
            [],
        ];

        expect(kosaraju(graph)).toEqual([3, 2, 1]);
    });

    it('работает для одной компоненты', () => {
        const graph = [
            [1, 2],
            [0, 2],
            [0, 1],
        ];

        expect(kosaraju(graph)).toEqual([1, 1, 1]);
    });

    it('работает для двух компонент', () => {
        const graph = [
            [1],
            [0],
            [3],
            [2],
        ];

        expect(kosaraju(graph)).toEqual([2, 2, 1, 1]);
    });

    // 0 → 1 → 2 ⇆ 3
    // ↑ ⇙ ↓   ↓   ⇅
    // 4 → 5 ⇆ 6 ← 7
    it('работает для примера из лекции', () => {
        const graph = [
            [1],
            [2, 4, 5],
            [3, 6],
            [2, 7],
            [0, 5],
            [6],
            [5],
            [3, 6],
        ];

        expect(kosaraju(graph)).toEqual([3, 3, 2, 2, 3, 1, 1, 2]);
    });

    // 0 → 2 → 10 → 5
    // ↑ ⇙        ⇘ ↑ ⇘
    // 4            7 ← 9
    //       ⇘      ↑   ↑
    //       ⇘      8 → 1
    //              ↑ ⇘ ↓
    //              6 ← 3

    it('работает для примера из Рафгардена', () => {
        const graph = [
            [2],
            [3, 9],
            [4, 10],
            [6],
            [0, 6, 8],
            [9],
            [8],
            [5],
            [1, 3, 7],
            [7],
            [5, 7],
        ];

        expect(kosaraju(graph)).toEqual([4, 3, 4, 3, 4, 1, 3, 1, 3, 1, 2]);
    });
});
