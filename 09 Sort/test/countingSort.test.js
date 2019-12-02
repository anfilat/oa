const { createFile, isSortedFile } = require('testUtils');
const { countingSort } = require('../src/countingSort');

const size = 100000;
const chunkSize = 16 * 1024;
const dataFile = './data';

describe('external sort', () => {
    it('counting sort', () => {
        createFile(dataFile, size, chunkSize);
        countingSort(dataFile, chunkSize);

        expect(isSortedFile(dataFile, chunkSize)).toBe(true);
    });
});
