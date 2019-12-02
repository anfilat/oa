const { bench, createFile, isSortedFile } = require('testUtils');
const { countingSort } = require('../src/countingSort');

const size = 1000000000;
const chunkSize = 128 * 1024 * 1024;
const dataFile = './data';

test('countingSort', () => countingSort(dataFile, chunkSize));

function test(label, fn) {
    createFile(dataFile, size, chunkSize);
    console.log(label, bench(fn));
    isSortedFile(dataFile, chunkSize);
}
