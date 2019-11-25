const {gcdMinus, gcdDiv, gcdBinary} = require('./gcd');

const tests = [
    [0, 0, 0],
    [0, 5, 5],
    [5, 0, 5],
    [320, 45, 5],
    [45, 320, 5],
    [180, 51, 3],
    [1234567890, 12345, 15],
    [1234567890, 123456789, 123456789],
    [1234560, 30, 30],
];

describe.each(tests)('gcdMinus', (a, b, result) => {
    it(`${a} ${b}`, () => {
        expect(gcdMinus(a, b)).toEqual(result);
    });
});

describe.each(tests)('gcdDiv', (a, b, result) => {
    it(`${a} ${b}`, () => {
        expect(gcdDiv(a, b)).toEqual(result);
    });
});

describe.each(tests)('gcdBinary', (a, b, result) => {
    it(`${a} ${b}`, () => {
        expect(gcdBinary(a, b)).toEqual(result);
    });
});
