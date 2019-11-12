class Node {
    #item;
    #next;

    constructor(item, next = null) {
        this.#item = item;
        this.#next = next;
    }

    get item() {
        return this.#item;
    }

    get next() {
        return this.#next;
    }

    set next(value) {
        this.#next = value;
    }
}

exports.Node = Node;
