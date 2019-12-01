const { createFile, isSortedFile, sortInMemory } = require('./externalSort');
const { bench } = require('testUtils');

const size = 1_000_000_000;
const chunkSize = 256 * 1024 * 1024;
const dataFile = './data';

test('sortInMemory', () => sortInMemory(dataFile));
test('sortInMemory with insertion 10', () => sortInMemory(dataFile, 10));
test('sortInMemory with insertion 32', () => sortInMemory(dataFile, 32));

function test(label, fn) {
    createFile(dataFile, size, chunkSize);
    console.log(label, bench(fn));
    isSortedFile(dataFile, chunkSize);
}
