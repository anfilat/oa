const assert = require('assert').strict;
const { Stack } = require('../stack');

describe('Stack', () => {
    it('empty', () => {
        const stack = new Stack();
        assert.strictEqual(stack.isEmpty(), true);
    });

    it('push', () => {
        const stack = new Stack();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        assert.strictEqual(stack.isEmpty(), false);
        assert.strictEqual(stack.length, 3);
    });

    it('push/pop', () => {
        const stack = new Stack();
        stack.push(1);
        stack.push(2);
        stack.push(3);
        assert.strictEqual(stack.pop(), 3);
        assert.strictEqual(stack.pop(), 2);
        assert.strictEqual(stack.pop(), 1);
        assert.strictEqual(stack.isEmpty(), true);
        assert.strictEqual(stack.length, 0);
    });
});
