const { createFile, isSortedFile } = require('testUtils');
const { radixSort } = require('../src/radixSort');
const { externalSort } = require('../../08 Merge/src/externalSort');

const size = 100000;
const chunkSize = 16 * 1024;
const dataFile = './data';

describe('external sort', () => {
    it('external memory', () => {
        createFile(dataFile, size, chunkSize);
        externalSort(dataFile, (arr) => radixSort(arr, 10, 100000), chunkSize);

        expect(isSortedFile(dataFile, chunkSize)).toBe(true);
    });
});
