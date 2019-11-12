const { Node } = require('./node');

class Stack {
    #head = null;
    #length = 0;

    isEmpty() {
        return !this.#head;
    }

    get length() {
        return this.#length;
    }

    push(item) {
        this.#head = new Node(item, this.#head);
        this.#length++;
    }

    pop() {
        if (this.isEmpty()) {
            throw new RangeError('stack is empty');
        }

        const item = this.#head.item;
        this.#head = this.#head.next;
        this.#length--;
        return item;
    }
}

exports.Stack = Stack;
