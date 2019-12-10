const {RandomNode} = require('./randomNode');
const {BaseTree} = require('../../10 Tree/src/baseTree');

class RandomTree extends BaseTree {
    static new(values) {
        const tree = new RandomTree();
        tree.insertValues(values);

        return tree;
    }

    // добавляет узел.
    // если ключ уже есть, переписывается существующее значение
    insert(key, value) {
        this._root = this._insert(this._root, key, value);
    }

    _insert(p, key, value) {
        if (p === null) {
            return new RandomNode(key, value);
        }
        if (key === p.key) {
            p.value = value;
            return p;
        }

        if (Math.random() * (p.size + 1) < 1) {
            return this._insertRoot(p, key, value);
        }

        if (key < p.key) {
            p.left = this._insert(p.left, key, value);
        } else {
            p.right = this._insert(p.right, key, value);
        }
        this._fixSize(p);
        return p;
    }

    _insertRoot(p, key, value) {
        if (p === null) {
            return new RandomNode(key, value);
        }
        if (key === p.key) {
            p.value = value;
            return p;
        }

        if (key < p.key) {
            p.left = this._insertRoot(p.left, key, value);
            return this._rotateRight(p);
        } else {
            p.right = this._insertRoot(p.right, key, value);
            return this._rotateLeft(p);
        }
    }

    remove(key) {
        const [node, parent] = this._find(key);
        if (node === null) {
            return;
        }

        const p = this._join(node.left, node.right);
        if (parent === null) {
            this._root = p;
        } else {
            if (parent.left === node) {
                parent.left = p;
            } else {
                parent.right = p;
            }
        }
    }

    // объединение двух деревьев
    _join(p, q) {
        if (p === null) {
            return q;
        }
        if (q === null) {
            return p;
        }

        if (Math.random() * (p.size + q.size) < p.size) {
            p.right = this._join(p.right, q);
            this._fixSize(p);
            return p;
        } else {
            q.left = this._join(p, q.left);
            this._fixSize(q);
            return q;
        }
    }

    //       a              b
    //    l     b   ->   a     r
    //        c   r    l   c
    _rotateLeft(a) {
        const b = a.right;
        a.right = b.left;
        b.left = a;
        b.size = a.size;
        this._fixSize(a);
        return b;
    }

    //       a               b
    //    b     r   ->    l     a
    //  l   c                 c   r
    _rotateRight(a) {
        const b = a.left;
        a.left = b.right;
        b.right = a;
        b.size = a.size;
        this._fixSize(a);
        return b;
    }

    _fixSize(node) {
        node.size = this._getSize(node.left) + this._getSize(node.right) + 1;
    }

    _getSize(node) {
        if (node === null) {
            return 0;
        }
        return node.size;
    }
}

exports.RandomTree = RandomTree;
