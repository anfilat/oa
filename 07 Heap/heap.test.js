const {heap} = require('./heap');
const {randomArray, sortedArray, reversedArray} = require('../06 Shell/testUtils');

describe('heap', () => {
    it('random', () => {
        const arr = randomArray(10000);
        const sortedArr = arr.slice().sort();

        expect(heap(arr)).toEqual(sortedArr);
    });

    it('sorted', () => {
        const arr = sortedArray(10000);
        const sortedArr = sortedArray(10000);

        expect(heap(arr)).toEqual(sortedArr);
    });

    it('reversed', () => {
        const arr = reversedArray(10000);
        const sortedArr = sortedArray(10000);

        expect(heap(arr)).toEqual(sortedArr);
    });
});
