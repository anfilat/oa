class SplayNode {
    key;
    value;
    parent;
    left = null;
    right = null;

    constructor(key, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
    }
}

exports.SplayNode = SplayNode;
