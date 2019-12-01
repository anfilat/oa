const { createFile, isSortedFile, sortInMemory, externalSort } = require('./externalSort');
const { bench, randomTypedUint16Array } = require('testUtils');
const {mergeSort} = require('./mergeSort');

const size = 1_000_000_000;
const chunkSize = 128 * 1024 * 1024;
const dataFile = './data';

test('externalSort', () => externalSort(dataFile, 0, chunkSize));
test('externalSort with insertion 10', () => externalSort(dataFile, 10, chunkSize));
test('externalSort with insertion 32', () => externalSort(dataFile, 32, chunkSize));

test('sortInMemory', () => sortInMemory(dataFile));
test('sortInMemory with insertion 10', () => sortInMemory(dataFile, 10));
test('sortInMemory with insertion 32', () => sortInMemory(dataFile, 32));

testWithoutFile('without file');

function test(label, fn) {
    createFile(dataFile, size, chunkSize);
    console.log(label, bench(fn));
    isSortedFile(dataFile, chunkSize);
}

function testWithoutFile(label) {
    const buffer = randomTypedUint16Array(size);
    console.log(label, bench(() => mergeSort(buffer, 10)));
}
