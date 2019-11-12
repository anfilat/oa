const { describe, it } = require('mocha');
const assert = require('assert').strict;
const { Queue } = require('../queue');

describe('Queue', () => {
    it('empty', () => {
        const queue = new Queue();
        assert.strictEqual(queue.isEmpty(), true);
    });

    it('enqueue', () => {
        const queue = new Queue();
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        assert.strictEqual(queue.isEmpty(), false);
        assert.strictEqual(queue.length, 3);
    });

    it('enqueue/dequeue', () => {
        const queue = new Queue();
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        assert.strictEqual(queue.dequeue(), 1);
        assert.strictEqual(queue.dequeue(), 2);
        assert.strictEqual(queue.dequeue(), 3);
        assert.strictEqual(queue.isEmpty(), true);
        assert.strictEqual(queue.length, 0);
    });
});
