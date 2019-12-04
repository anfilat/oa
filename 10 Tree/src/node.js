class Node {
    key;
    value;
    left = null;
    right = null;

    constructor(key, value = null) {
        this.key = key;
        this.value = value;
    }
}

exports.Node = Node;
