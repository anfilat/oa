const fs = require('fs');
const { createFile, isSortedFile, sortInMemory, externalSort } = require('./externalSort');

const size = 1_000_000;
const chunkSize = 256 * 1024;
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
        externalSort(dataFile, 0, chunkSize);

        expect(isSortedFile(dataFile, chunkSize)).toBe(true);
    });
});
