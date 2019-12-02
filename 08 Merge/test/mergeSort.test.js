const {mergeSort} = require('../src/mergeSort');
const {randomArray, sortedArray, reversedArray, randomTypedFloatArray} = require('testUtils');

describe('mergeSort', () => {
    it('random', () => {
        const arr = randomArray(10000);
        const sortedArr = arr.slice().sort((a, b) => a - b);

        expect(mergeSort(arr)).toEqual(sortedArr);
    });

    it('sorted', () => {
        const arr = sortedArray(10000);
        const sortedArr = sortedArray(10000);

        expect(mergeSort(arr)).toEqual(sortedArr);
    });

    it('reversed', () => {
        const arr = reversedArray(10000);
        const sortedArr = sortedArray(10000);

        expect(mergeSort(arr)).toEqual(sortedArr);
    });

    it('with insertions', () => {
        const arr = randomArray(10000);
        const sortedArr = arr.slice().sort((a, b) => a - b);

        expect(mergeSort(arr, 10)).toEqual(sortedArr);
    });

    it('typed random', () => {
        const arr = randomTypedFloatArray(10000);
        const sortedArr = arr.slice().sort();

        expect(mergeSort(arr)).toEqual(sortedArr);
    });
});
