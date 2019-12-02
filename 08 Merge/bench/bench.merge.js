const {heap} = require('../../07 Heap/heap');
const {mergeSort} = require('../src/mergeSort');
const { randomTypedFloatArray, shuffle, benchArray } = require('testUtils');

benchWithSize(100000);
benchWithSize(1000000);
benchWithSize(10000000);

function benchWithSize(size) {
    console.log(size);

    const random = randomTypedFloatArray(size);

    const sorted5p = random.slice().sort((a, b) => a - b);
    shuffle(sorted5p, size / 20);

    console.log('heap random', benchArray(random, arr => heap(arr)));
    console.log('heap sorted5p', benchArray(sorted5p, arr => heap(arr)));

    console.log('merge random', benchArray(random, arr => mergeSort(arr)));
    console.log('merge sorted5p', benchArray(sorted5p, arr => mergeSort(arr)));

    console.log('merge with insertion 10 random', benchArray(random, arr => mergeSort(arr, 10)));
    console.log('merge with insertion 10 sorted5p', benchArray(sorted5p, arr => mergeSort(arr, 10)));

    console.log('merge with insertion 16 random', benchArray(random, arr => mergeSort(arr, 16)));
    console.log('merge with insertion 16 sorted5p', benchArray(sorted5p, arr => mergeSort(arr, 16)));

    console.log('merge with insertion 32 random', benchArray(random, arr => mergeSort(arr, 32)));
    console.log('merge with insertion 32 sorted5p', benchArray(sorted5p, arr => mergeSort(arr, 32)));

    console.log('system random', benchArray(random, arr => arr.sort()));
    console.log('system sorted5p', benchArray(sorted5p, arr => arr.sort()));
}
