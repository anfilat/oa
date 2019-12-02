const {radixSort} = require('../src/radixSort');
const {randomTypedUint16Array, reversedArray} = require('testUtils');

describe('radixSort', () => {
    it('random typed array', () => {
        const arr = randomTypedUint16Array(10);
        const sortedArr = arr.slice().sort((a, b) => a - b);

        expect(radixSort(arr, 10, 100000)).toEqual(sortedArr);
    });

    it('dynamic array', () => {
        const arr = reversedArray(10000);
        const sortedArr = arr.slice().sort((a, b) => a - b);

        expect(radixSort(arr, 10, 100000)).toEqual(sortedArr);
    });
});
