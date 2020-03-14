const assert = require('assert').strict;
const { bench, loremIpsum } = require('testUtils');
const boyermoore = require('../src/boyermoore');
const kmp = require('../src/kmp');

for (let size = 10_000; size <= 10_000_000; size *= 10) {
    console.log(size);

    let str = loremIpsum(size) + 'laborut';
    assert.strictEqual(boyermoore(str, 'laborut'), kmp(str, 'laborut'));

    let bmTime = Number.POSITIVE_INFINITY;
    for (let i = 0; i < 5; i++) {
        bmTime = Math.min(bmTime, bench(() => boyermoore(str, 'laborut')));
    }

    let kmpTime = Number.POSITIVE_INFINITY;
    for (let i = 0; i < 5; i++) {
        kmpTime = Math.min(kmpTime, bench(() => kmp(str, 'laborut')));
    }

    console.log('boyermoore', bmTime);
    console.log('kmp', kmpTime);

    console.log();
}
