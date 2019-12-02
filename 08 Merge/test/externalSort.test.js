const fs = require('fs');
const { createFile, isSortedFile } = require('../externalUtils');
const { sortInMemory } = require('../src/sortInMemory');
const { externalSort } = require('../src/externalSort');
const { mergeSort } = require('../src/mergeSort');

const size = 100000;
const chunkSize = 16 * 1024;
const dataFile = './data';

describe('external sort', () => {
    it('create file', () => {
        createFile(dataFile, size, chunkSize);

        expect(fs.statSync(dataFile).isFile()).toBe(true);
        expect(isSortedFile(dataFile, chunkSize)).toBe(false);
    });

    it('sort in memory', () => {
        createFile(dataFile, size, chunkSize);
        sortInMemory(dataFile);

        expect(isSortedFile(dataFile, chunkSize)).toBe(true);
    });

    it('external memory', () => {
        createFile(dataFile, size, chunkSize);
        externalSort(dataFile, (arr) => mergeSort(arr, 0), chunkSize);

        expect(isSortedFile(dataFile, chunkSize)).toBe(true);
    });
});
