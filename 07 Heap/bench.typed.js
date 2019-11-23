const {shell, TokudaGaps} = require('../06 Shell/shell');
const {heap} = require('./heap');
const { randomTypedFloatArray, shuffle } = require('../06 Shell/testUtils');

console.log('typed float array');

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
