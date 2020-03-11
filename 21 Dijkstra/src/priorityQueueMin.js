class PriorityQueueMin {
    #array = [];
    #keys = [];

    isEmpty() {
        return this.#array.length === 0;
    }

    enqueue(item) {
        const position = this.#array.length;
        this.#array.push(item);
        this.#keys[item.key] = position;
        this._fixUp(position);
    }

    dequeue() {
        this._swap(0, this.#array.length - 1);
        const result = this.#array.pop();
        this._fixDown(0);
        this.#keys[result.key] = undefined;
        return result;
    }

    // уменьшить вес указанного итема
    decWeight(key, weight) {
        const index = this.#keys[key];
        this.#array[index].weight = weight;
        this._fixUp(index);
    }

    // есть ли итем с указанным ключом в очереди
    has(key) {
        return this.#keys[key] != null;
    }

    get(key) {
        return this.#array[this.#keys[key]];
    }

    _fixUp(root) {
        while (true) {
            if (root === 0) {
                return;
            }
            let parent = root >>> 1;

            if (this.#array[parent].weight <= this.#array[root].weight) {
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
            if (right < this.#array.length && childValue.weight > this.#array[right].weight) {
                child = right;
                childValue = this.#array[right];
            }

            // сравнение корня с потомками
            if (this.#array[root].weight <= childValue.weight) {
                return;
            }

            this._swap(child, root);
            root = child;
        }
    }

    _swap(i, j) {
        const ti = this.#array[i];
        const tj = this.#array[j];

        this.#array[i] = tj;
        this.#array[j] = ti;

        this.#keys[tj.key] = i;
        this.#keys[ti.key] = j;
    }
}

exports.PriorityQueueMin = PriorityQueueMin;
