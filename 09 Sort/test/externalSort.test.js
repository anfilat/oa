const { createFile, isSortedFile } = require('testUtils');
const { countingSort } = require('../src/countingSort');
const { radixSort } = require('../src/radixSort');
const { externalSort } = require('../../08 Merge/src/externalSort');

const size = 100000;
const chunkSize = 16 * 1024;
const dataFile = './data';

describe('external sort', () => {
    it('countingSort', () => {
        createFile(dataFile, size, chunkSize);
        externalSort(dataFile, (arr) => countingSort(arr), chunkSize);

        expect(isSortedFile(dataFile, chunkSize)).toBe(true);
    });

    it('radixSort', () => {
        createFile(dataFile, size, chunkSize);
        externalSort(dataFile, (arr) => radixSort(arr, 16), chunkSize);

        expect(isSortedFile(dataFile, chunkSize)).toBe(true);
    });
});
