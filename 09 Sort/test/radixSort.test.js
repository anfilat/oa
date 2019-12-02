const {randomTypedUint16Array, reversedArray} = require('testUtils');
const {radixSort} = require('../src/radixSort');

describe('radixSort', () => {
    it('random typed array', () => {
        const arr = randomTypedUint16Array(10000);
        const sortedArr = arr.slice().sort((a, b) => a - b);

        expect(radixSort(arr, 16)).toEqual(sortedArr);
    });

    it('dynamic array', () => {
        const arr = reversedArray(10000);
        const sortedArr = arr.slice().sort((a, b) => a - b);

        expect(radixSort(arr, 16)).toEqual(sortedArr);
    });
});
