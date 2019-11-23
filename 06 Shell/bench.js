const {shell, ShellGaps, KnuthGaps, SedgewickGaps, TokudaGaps} = require('./shell');
const { randomArray, randomTypedFloatArray, randomTypedIntArray, shuffle } = require('./testUtils');

const size = 5000000;

let arr;
const random = randomArray(size);

arr = random.slice().sort();
const sorted10p = arr.slice();
shuffle(sorted10p, size / 10);

const sorted5 = arr.slice();
shuffle(sorted5, 5);
global.gc();

arr = random.slice();
console.log('ShellGaps random', bench(() => shell(arr, ShellGaps)));
arr = sorted10p.slice();
console.log('ShellGaps sorted10p', bench(() => shell(arr, ShellGaps)));
arr = sorted5.slice();
console.log('ShellGaps sorted5', bench(() => shell(arr, ShellGaps)));
global.gc();

arr = random.slice();
console.log('KnuthGaps random', bench(() => shell(arr, KnuthGaps)));
arr = sorted10p.slice();
console.log('KnuthGaps sorted10p', bench(() => shell(arr, KnuthGaps)));
arr = sorted5.slice();
console.log('KnuthGaps sorted5', bench(() => shell(arr, KnuthGaps)));
global.gc();

arr = random.slice();
console.log('SedgewickGaps random', bench(() => shell(arr, SedgewickGaps)));
arr = sorted10p.slice();
console.log('SedgewickGaps sorted10p', bench(() => shell(arr, SedgewickGaps)));
arr = sorted5.slice();
console.log('SedgewickGaps sorted5', bench(() => shell(arr, SedgewickGaps)));
global.gc();

arr = random.slice();
console.log('TokudaGaps random', bench(() => shell(arr, TokudaGaps)));
arr = sorted10p.slice();
console.log('TokudaGaps sorted10p', bench(() => shell(arr, TokudaGaps)));
arr = sorted5.slice();
console.log('TokudaGaps sorted5', bench(() => shell(arr, TokudaGaps)));
global.gc();

arr = random.slice();
console.log('system random', bench(() => arr.sort()));
arr = sorted10p.slice();
console.log('system sorted10p', bench(() => arr.sort()));
arr = sorted5.slice();
console.log('system sorted5', bench(() => arr.sort()));
global.gc();

const typedFloatRandom = randomTypedFloatArray(size);

arr = typedFloatRandom.slice().sort();
const typedFloatSorted10p = arr.slice();
shuffle(typedFloatSorted10p, size / 10);

const typedFloatSorted5 = arr.slice();
shuffle(typedFloatSorted5, 5);

arr = typedFloatRandom.slice();
console.log('typed float random', bench(() => arr.sort()));
arr = typedFloatSorted10p.slice();
console.log('typed float sorted10p', bench(() => arr.sort()));
arr = typedFloatSorted5.slice();
console.log('typed float sorted5', bench(() => arr.sort()));
global.gc();

const typedIntRandom = randomTypedIntArray(size);

arr = typedIntRandom.slice().sort();
const typedIntSorted10p = arr.slice();
shuffle(typedIntSorted10p, size / 10);

const typedIntSorted5 = arr.slice();
shuffle(typedIntSorted5, 5);

arr = typedIntRandom.slice();
console.log('typed int random', bench(() => arr.sort()));
arr = typedIntSorted10p.slice();
console.log('typed int sorted10p', bench(() => arr.sort()));
arr = typedIntSorted5.slice();
console.log('typed int sorted5', bench(() => arr.sort()));
global.gc();

function bench(fn) {
    const start = new Date();
    fn();
    const end = new Date();

    return end - start;
}
