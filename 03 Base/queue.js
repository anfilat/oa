const { Node } = require('./node');

class Queue {
    #head = null;
    #tail = null;
    #length = 0;

    isEmpty() {
        return !this.#head;
    }

    get length() {
        return this.#length;
    }

    get head() {
        return this.#head.item;
    }

    enqueue(item) {
        const node = new Node(item);
        if (this.isEmpty()) {
            this.#head = node;
            this.#tail = node;
        } else {
            this.#tail.next = node;
            this.#tail = node;
        }
        this.#length++;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new RangeError('queue is empty');
        }

        const item = this.#head.item;
        this.#head = this.#head.next;
        this.#length--;
        return item;
    }
}

exports.Queue = Queue;
