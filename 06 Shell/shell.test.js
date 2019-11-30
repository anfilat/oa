const {shell, ShellGaps, KnuthGaps, SedgewickGaps, TokudaGaps} = require('./shell');
const {randomArray, sortedArray, reversedArray} = require('testUtils');

describe.each([
    ['ShellGaps', ShellGaps],
    ['KnuthGaps', KnuthGaps],
    ['SedgewickGaps', SedgewickGaps],
    ['TokudaGaps', TokudaGaps]
])('shell', (name, gaps) => {
    it(`${name} random`, () => {
        const arr = randomArray(10000);
        const sortedArr = arr.slice().sort();

        expect(shell(arr, gaps)).toEqual(sortedArr);
    });

    it(`${name} sorted`, () => {
        const arr = sortedArray(10000);
        const sortedArr = sortedArray(10000);

        expect(shell(arr, gaps)).toEqual(sortedArr);
    });

    it(`${name} reversed`, () => {
        const arr = reversedArray(10000);
        const sortedArr = sortedArray(10000);

        expect(shell(arr, gaps)).toEqual(sortedArr);
    });
});
