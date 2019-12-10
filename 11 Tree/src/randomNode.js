class RandomNode {
    key;
    value;
    size = 1;
    left = null;
    right = null;

    constructor(key, value = null) {
        this.key = key;
        this.value = value;
    }
}

exports.RandomNode = RandomNode;
