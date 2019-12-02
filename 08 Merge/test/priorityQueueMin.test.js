const {PriorityQueueMin} = require('../src/priorityQueueMin');

describe('PriorityQueue', () => {
    it('create queue', () => {
        const queue = new PriorityQueueMin();

        expect(queue.isEmpty()).toBe(true);
    });

    it('enqueue one value', () => {
        const queue = new PriorityQueueMin();

        queue.enqueue({key: 5});
        expect(queue.isEmpty()).toBe(false);
        expect(queue.dequeue()).toEqual({key: 5});
    });

    it('enqueue dequeue', () => {
        const queue = new PriorityQueueMin();

        queue.enqueue({key: 5});
        queue.enqueue({key: 3});
        expect(queue.dequeue()).toEqual({key: 3});

        queue.enqueue({key: 7});
        expect(queue.dequeue()).toEqual({key: 5});
    });

    it('sort 10 numbers', () => {
        const queue = new PriorityQueueMin();

        queue.enqueue({key: 6});
        queue.enqueue({key: 2});
        queue.enqueue({key: 9});
        queue.enqueue({key: 0});
        queue.enqueue({key: 1});
        queue.enqueue({key: 3});
        queue.enqueue({key: 8});
        queue.enqueue({key: 5});
        queue.enqueue({key: 7});
        queue.enqueue({key: 4});

        expect(queue.dequeue()).toEqual({key: 0});
        expect(queue.dequeue()).toEqual({key: 1});
        expect(queue.dequeue()).toEqual({key: 2});
        expect(queue.dequeue()).toEqual({key: 3});
        expect(queue.dequeue()).toEqual({key: 4});
        expect(queue.dequeue()).toEqual({key: 5});
        expect(queue.dequeue()).toEqual({key: 6});
        expect(queue.dequeue()).toEqual({key: 7});
        expect(queue.dequeue()).toEqual({key: 8});
        expect(queue.dequeue()).toEqual({key: 9});

        expect(queue.isEmpty()).toBe(true);
    });
});
