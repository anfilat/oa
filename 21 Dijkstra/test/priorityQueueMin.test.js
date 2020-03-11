const {PriorityQueueMin} = require('../src/priorityQueueMin');

describe('PriorityQueue', () => {
    it('create queue', () => {
        const queue = new PriorityQueueMin();

        expect(queue.isEmpty()).toBe(true);
    });

    it('enqueue one value', () => {
        const queue = new PriorityQueueMin();

        queue.enqueue({weight: 5, key: 0});
        expect(queue.isEmpty()).toBe(false);
        expect(queue.dequeue()).toEqual({weight: 5, key: 0});
    });

    it('enqueue dequeue', () => {
        const queue = new PriorityQueueMin();

        queue.enqueue({weight: 5, key: 0});
        queue.enqueue({weight: 3, key: 1});
        expect(queue.dequeue()).toEqual({weight: 3, key: 1});

        queue.enqueue({weight: 7});
        expect(queue.dequeue()).toEqual({weight: 5, key: 0});
    });

    it('sort 10 numbers', () => {
        const queue = new PriorityQueueMin();

        queue.enqueue({weight: 6, key: 0});
        queue.enqueue({weight: 2, key: 1});
        queue.enqueue({weight: 9, key: 2});
        queue.enqueue({weight: 0, key: 3});
        queue.enqueue({weight: 1, key: 4});
        queue.enqueue({weight: 3, key: 5});
        queue.enqueue({weight: 8, key: 6});
        queue.enqueue({weight: 5, key: 7});
        queue.enqueue({weight: 7, key: 8});
        queue.enqueue({weight: 4, key: 9});

        expect(queue.dequeue()).toEqual({weight: 0, key: 3});
        expect(queue.dequeue()).toEqual({weight: 1, key: 4});
        expect(queue.dequeue()).toEqual({weight: 2, key: 1});
        expect(queue.dequeue()).toEqual({weight: 3, key: 5});
        expect(queue.dequeue()).toEqual({weight: 4, key: 9});
        expect(queue.dequeue()).toEqual({weight: 5, key: 7});
        expect(queue.dequeue()).toEqual({weight: 6, key: 0});
        expect(queue.dequeue()).toEqual({weight: 7, key: 8});
        expect(queue.dequeue()).toEqual({weight: 8, key: 6});
        expect(queue.dequeue()).toEqual({weight: 9, key: 2});

        expect(queue.isEmpty()).toBe(true);
    });

    it('weight decrement', () => {
        const queue = new PriorityQueueMin();

        queue.enqueue({key: 0, weight: 6});
        queue.enqueue({key: 1, weight: 4});
        queue.enqueue({key: 2, weight: 9});
        queue.enqueue({key: 3, weight: 3});

        queue.decWeight(2, 1);

        expect(queue.dequeue()).toEqual({key: 2, weight: 1});
        expect(queue.dequeue()).toEqual({key: 3, weight: 3});
        expect(queue.dequeue()).toEqual({key: 1, weight: 4});
        expect(queue.dequeue()).toEqual({key: 0, weight: 6});

        expect(queue.isEmpty()).toBe(true);
    });
});
