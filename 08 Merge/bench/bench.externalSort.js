const { bench, randomTypedUint16Array } = require('testUtils');
const { sortInMemory } = require('../src/sortInMemory');
const { externalSort } = require('../src/externalSort');
const { mergeSort } = require('../src/mergeSort');
const { createFile, isSortedFile } = require('../externalUtils');

const size = 1000000000;
const chunkSize = 128 * 1024 * 1024;
const dataFile = './data';

test('externalSort', () => externalSort(dataFile, (arr) => mergeSort(arr, 0), chunkSize));
test('externalSort with insertion 10', () => externalSort(dataFile, (arr) => mergeSort(arr, 10), chunkSize));
test('externalSort with insertion 32', () => externalSort(dataFile, (arr) => mergeSort(arr, 32), chunkSize));

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
