const { describe, it, beforeEach } = require("mocha");
const assert = require('assert').strict;
const { SingleArray } = require('../singleArray');
const { VectorArray } = require('../vectorArray');
const { SystemArray } = require('../systemArray');
const { TypedF64Array } = require('../typedF64Array');

testFor('SingleArray', SingleArray);
testFor('VectorArray', VectorArray);
testFor('SystemArray', SystemArray);
testFor('TypedF64Array', TypedF64Array);

function testFor(name, ctor) {
    describe(name, () => {
        let arr;

        beforeEach(() => {
            arr = new ctor();
        });

        it('create empty array', () => {
            assert.strictEqual(arr.length, 0);
        });

        it('add method', () => {
            arr.add(42);
            assert.strictEqual(arr.length, 1);
        });

        it('get method', () => {
            arr.add(42);
            assert.strictEqual(arr.get(0), 42);
        });

        it('set method', () => {
            arr.add(42);
            arr.set(0, 0);
            assert.strictEqual(arr.get(0), 0);
            assert.strictEqual(arr.length, 1);
        });

        it('add method - multiple calls', () => {
            for (let i = 0; i < 1000; i++) {
                arr.add(42);
            }
            assert.strictEqual(arr.length, 1000);
            assert.strictEqual(arr.get(0), 42);
            assert.strictEqual(arr.get(arr.length - 1), 42);
        });

        it('add with index', () => {
            arr.add(0);
            arr.add(1);
            arr.add(2);
            arr.add(42, 1);
            assert.strictEqual(arr.get(0), 0);
            assert.strictEqual(arr.get(1), 42);
            assert.strictEqual(arr.get(2), 1);
            assert.strictEqual(arr.get(3), 2);
            assert.strictEqual(arr.length, 4);
        });

        it('add with index to last', () => {
            arr.add(0);
            arr.add(42, 1);
            assert.strictEqual(arr.get(0), 0);
            assert.strictEqual(arr.get(1), 42);
            assert.strictEqual(arr.length, 2);
        });

        it('remove method', () => {
            arr.add(0);
            arr.add(1);
            const item = arr.remove(0);
            assert.strictEqual(item, 0);
            assert.strictEqual(arr.get(0), 1);
            assert.strictEqual(arr.length, 1);
        });

        it('add and remove methods - multiple calls', () => {
            for (let i = 0; i < 1000; i++) {
                arr.add(42);
            }
            assert.strictEqual(arr.length, 1000);

            for (let i = 0; i < 500; i++) {
                arr.remove(arr.length - 1);
            }
            assert.strictEqual(arr.length, 500);

            for (let i = 0; i < 1000; i++) {
                arr.add(42);
            }
            assert.strictEqual(arr.length, 1500);
        });

        it('set method - out of range', () => {
            arr.add(42);
            assert.throws(() => arr.set(0, 1));
            assert.throws(() => arr.set(0, -1));
        });

        it('add with index method - out of range', () => {
            arr.add(42);
            assert.throws(() => arr.add(0, 2));
            assert.throws(() => arr.add(0, -1));
        });

        it('remove method - out of range', () => {
            arr.add(42);
            assert.throws(() => arr.remove(1));
            assert.throws(() => arr.remove(-1));
        });
    });
}
