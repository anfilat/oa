const {heap} = require('../07 Heap/heap');
const {mergeSort} = require('./mergeSort');
const { randomTypedFloatArray, shuffle } = require('testUtils');

benchWithSize(100000);
benchWithSize(1000000);
benchWithSize(10000000);

function benchWithSize(size) {
    console.log(size);

    let arr;
    const random = randomTypedFloatArray(size);

    arr = random.slice().sort();
    const sorted5p = arr.slice();
    shuffle(sorted5p, size / 20);

    arr = random.slice();
    console.log('heap random', bench(() => heap(arr)));
    arr = sorted5p.slice();
    console.log('heap sorted5p', bench(() => heap(arr)));
    global.gc();

    arr = random.slice();
    console.log('merge random', bench(() => mergeSort(arr)));
    arr = sorted5p.slice();
    console.log('merge sorted5p', bench(() => mergeSort(arr)));
    global.gc();

    arr = random.slice();
    console.log('merge with insertion 10 random', bench(() => mergeSort(arr, 10)));
    arr = sorted5p.slice();
    console.log('merge with insertion 10 sorted5p', bench(() => mergeSort(arr, 10)));
    global.gc();

    arr = random.slice();
    console.log('merge with insertion 16 random', bench(() => mergeSort(arr, 16)));
    arr = sorted5p.slice();
    console.log('merge with insertion 16 sorted5p', bench(() => mergeSort(arr, 16)));
    global.gc();

    arr = random.slice();
    console.log('merge with insertion 32 random', bench(() => mergeSort(arr, 32)));
    arr = sorted5p.slice();
    console.log('merge with insertion 32 sorted5p', bench(() => mergeSort(arr, 32)));
    global.gc();

    arr = random.slice();
    console.log('system random', bench(() => arr.sort()));
    arr = sorted5p.slice();
    console.log('system sorted5p', bench(() => arr.sort()));
    global.gc();
}

function bench(fn) {
    const start = new Date();
    fn();
    const end = new Date();

    return end - start;
}
