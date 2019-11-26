const {fibRec, fibIter, fibIterBig, fibGoldenSection, fibMatrix} = require('./fib');

const tests = [
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 3],
    [11, 89],
    [20, 6765],
];

describe.each(tests)('fibRec', (n, result) => {
    it(`${n} ${result}`, () => {
        expect(fibRec(n)).toEqual(result);
    });
});

describe.each(tests)('fibIter', (n, result) => {
    it(`${n} ${result}`, () => {
        expect(fibIter(n)).toEqual(result);
    });
});

describe.each(tests)('fibIterBig', (n, result) => {
    it(`${n} ${result}`, () => {
        expect(fibIterBig(n)).toEqual(BigInt(result));
    });
});

describe.each(tests)('fibGoldenSection', (n, result) => {
    it(`${n} ${result}`, () => {
        expect(fibGoldenSection(n)).toEqual(result);
    });
});

describe.each(tests)('fibMatrix', (n, result) => {
    it(`${n} ${result}`, () => {
        expect(fibMatrix(n)).toEqual(result);
    });
});

describe('max float fib', () => {
    it('75', () => {
        expect(BigInt(fibIter(75))).toEqual(fibIterBig(75));
    });
});
