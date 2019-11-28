const {shell, TokudaGaps} = require('../06 Shell/shell');
const {heap} = require('./heap');
const { randomArray, shuffle } = require('../06 Shell/testUtils');

console.log('dynamic array');

benchWithSize(100000);
benchWithSize(1000000);
benchWithSize(10000000);

function benchWithSize(size) {
    console.log(size);

    let arr;
    const random = randomArray(size);

    arr = random.slice().sort((a, b) => a - b);
    const sorted5p = arr.slice();
    shuffle(sorted5p, size / 20);

    arr = random.slice();
    console.log('shell random', bench(() => shell(arr, TokudaGaps)));
    arr = sorted5p.slice();
    console.log('shell sorted5p', bench(() => shell(arr, TokudaGaps)));
    global.gc();

    arr = random.slice();
    console.log('heap random', bench(() => heap(arr)));
    arr = sorted5p.slice();
    console.log('heap sorted5p', bench(() => heap(arr)));
    global.gc();

    arr = random.slice();
    console.log('system random', bench(() => arr.sort((a, b) => a - b)));
    arr = sorted5p.slice();
    console.log('system sorted5p', bench(() => arr.sort((a, b) => a - b)));
    global.gc();
}

function bench(fn) {
    const start = new Date();
    fn();
    const end = new Date();

    return end - start;
}
