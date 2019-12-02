const { bench, createFile, isSortedFile } = require('testUtils');
const { countingSort } = require('../src/countingSort');
const { radixSort } = require('../src/radixSort');
const { externalSort } = require('../../08 Merge/src/externalSort');
const { mergeSort } = require('../../08 Merge/src/mergeSort');

const size = 1000000000;
const chunkSize = 128 * 1024 * 1024;
const dataFile = './data';

test('externalSort', () => externalSort(dataFile, (arr) => mergeSort(arr, 32), chunkSize));
test('radixSort', () => externalSort(dataFile, (arr) => radixSort(arr, 10, 100000), chunkSize));
test('countingSort', () => countingSort(dataFile, chunkSize));

function test(label, fn) {
    createFile(dataFile, size, chunkSize);
    console.log(label, bench(fn));
    isSortedFile(dataFile, chunkSize);
}
