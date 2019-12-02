const { randomTypedUint16Array } = require('testUtils');
const { countingSort } = require('../src/countingSort');

describe('counting sort', () => {
    it('random typed array', () => {
        const arr = randomTypedUint16Array(10000);
        const sortedArr = arr.slice().sort((a, b) => a - b);

        expect(countingSort(arr)).toEqual(sortedArr);
    });
});
