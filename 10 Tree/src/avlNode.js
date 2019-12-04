class AVLNode {
    key;
    value;
    balance = 0;
    parent;
    left = null;
    right = null;

    constructor(key, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
    }
}

exports.AVLNode = AVLNode;
