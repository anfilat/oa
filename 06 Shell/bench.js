const {shell, ShellGaps, KnuthGaps, SedgewickGaps, TokudaGaps} = require('./shell');
const {randomArray, sortedArray, shuffle} = require('./testUtils');

const size = 5000000;

const random = randomArray(size);

const sorted10p = sortedArray(size);
shuffle(sorted10p, size / 10);

const sorted5 = sortedArray(size);
shuffle(sorted5, 5);

// для разогрева
bench(() => sorted5.slice().sort());
global.gc();

console.log('system random', bench(() => random.slice().sort()));
console.log('system sorted10p', bench(() => sorted10p.slice().sort()));
console.log('system sorted5', bench(() => sorted5.slice().sort()));
global.gc();

console.log('ShellGaps random', bench(() => shell(random.slice(), ShellGaps)));
console.log('ShellGaps sorted10p', bench(() => shell(sorted10p.slice(), ShellGaps)));
console.log('ShellGaps sorted5', bench(() => shell(sorted5.slice(), ShellGaps)));
global.gc();

console.log('KnuthGaps random', bench(() => shell(random.slice(), KnuthGaps)));
console.log('KnuthGaps sorted10p', bench(() => shell(sorted10p.slice(), KnuthGaps)));
console.log('KnuthGaps sorted5', bench(() => shell(sorted5.slice(), KnuthGaps)));
global.gc();

console.log('SedgewickGaps random', bench(() => shell(random.slice(), SedgewickGaps)));
console.log('SedgewickGaps sorted10p', bench(() => shell(sorted10p.slice(), SedgewickGaps)));
console.log('SedgewickGaps sorted5', bench(() => shell(sorted5.slice(), SedgewickGaps)));
global.gc();

console.log('TokudaGaps random', bench(() => shell(random.slice(), TokudaGaps)));
console.log('TokudaGaps sorted10p', bench(() => shell(sorted10p.slice(), TokudaGaps)));
console.log('TokudaGaps sorted5', bench(() => shell(sorted5.slice(), TokudaGaps)));
global.gc();

function bench(fn) {
    const start = new Date();
    fn();
    const end = new Date();

    return end - start;
}
