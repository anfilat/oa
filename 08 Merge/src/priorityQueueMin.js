class PriorityQueueMin {
    #array = [];

    isEmpty() {
        return this.#array.length === 0;
    }

    enqueue(item) {
        this.#array.push(item);
        this._fixUp(this.#array.length - 1);
    }

    dequeue() {
        this._swap(0, this.#array.length - 1);
        const result = this.#array.pop();
        this._fixDown(0);
        return result;
    }

    _fixUp(root) {
        while (true) {
            if (root === 0) {
                return;
            }
            let parent = root >>> 1;

            if (this.#array[parent].key <= this.#array[root].key) {
                return;
            }

            this._swap(parent, root);
            root = parent;
        }
    }

    _fixDown(root) {
        while (true) {
            // левый потомок
            let child = (root << 1) + 1;
            if (child >= this.#array.length) {
                return;
            }
            let childValue = this.#array[child];

            // правый потомок
            const right = child + 1;
            if (right < this.#array.length && childValue.key > this.#array[right].key) {
                child = right;
                childValue = this.#array[right];
            }

            // сравнение корня с потомками
            if (this.#array[root].key <= childValue.key) {
                return;
            }

            this._swap(child, root);
            root = child;
        }
    }

    _swap(i, j) {
        const t = this.#array[i];
        this.#array[i] = this.#array[j];
        this.#array[j] = t;
    }
}

exports.PriorityQueueMin = PriorityQueueMin;
