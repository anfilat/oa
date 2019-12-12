const {randomIntArray} = require('testUtils');
const {readTest} = require('./testUtils');
const {RSQ} = require('../src/rsq');

describe('Сумма на отрезке', () => {
    it('маленький массив', () => {
        const rsq = RSQ.new([0, 2, 1, 2, 0]);

        expect(rsq.sum(1, 1)).toEqual(0);
        expect(rsq.sum(2, 2)).toEqual(2);
        expect(rsq.sum(3, 3)).toEqual(1);
        expect(rsq.sum(4, 4)).toEqual(2);
        expect(rsq.sum(5, 5)).toEqual(0);
        expect(rsq.sum(1, 5)).toEqual(5);
    });

    it('с обновлением', () => {
        const rsq = RSQ.new([0, 2, 1, 2, 0]);

        expect(rsq.sum(1, 5)).toEqual(rsq.checkSum(1, 5));

        rsq.set(1, 5);
        expect(rsq.sum(1, 5)).toEqual(10);
    });

    it('случайные числа', () => {
        const rsq = RSQ.new(randomIntArray(100_000));

        expect(rsq.sum(1, 100_000)).toEqual(rsq.checkSum(1, 100_000));
    });

    it('тестирование по файлу', () => {
        const [inSum, outSum] = readTest();
        const [n, k] = inSum[0].split(' ');
        const rsq = new RSQ(n);
        const results = [];

        for (let i = 1; i <= k; i++) {
            const [command, p1, p2] = inSum[i].split(' ');
            if (command === 'A') {
                const i = parseInt(p1);
                const x = parseInt(p2);
                rsq.set(i, x);
            } else {
                const l = parseInt(p1);
                const r = parseInt(p2);
                results.push(rsq.sum(l, r).toString());
            }
        }

        expect(results).toEqual(outSum);
    });
});
