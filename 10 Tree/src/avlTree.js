const {AVLNode} = require('../src/avlNode');
const {BaseTree} = require('./baseTree');

//http://rosettacode.org/wiki/AVL_tree#TypeScript поправленный по
//http://rosettacode.org/wiki/AVL_tree#Java
class AVLTree extends BaseTree {
    static new(values) {
        const tree = new AVLTree();
        tree.insertValues(values);

        return tree;
    }

    // функция для тестирования корректности дерева
    isWrongBalances() {
        let result = false;
        this._walk(this._root, node => {
            if (![-1, 0, 1].includes(this._getBalance(node))) {
                result = true;
            }
        });
        return result;
    }

    // добавляет узел.
    // если ключ уже есть, переписывается существующее значение
    insert(key, value = null) {
        const [node, parent] = this._find(key);
        if (node) {
            node.value = value;
            return;
        }

        const newNode = new AVLNode(key, value, parent);
        if (parent == null) {
            this._root = newNode;
        } else {
            if (key < parent.key) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
            this._reBalance(parent);
        }
    }

    remove(key) {
        const [node] = this._find(key);
        if (node) {
            this._delete(node);
        }
    }

    _delete(node) {
        while (true) {
            if (node.left === null && node.right === null) {
                if (node.parent === null) {
                    this._root = null;
                } else {
                    const parent = node.parent;
                    if (parent.left === node) {
                        parent.left = null;
                    } else {
                        parent.right = null;
                    }
                    this._reBalance(parent);
                }
                return;
            }

            if (node.left !== null) {
                let child = node.left;
                while (child.right !== null) {
                    child = child.right;
                }
                node.key = child.key;
                node.value = child.value;

                node = child;
            } else {
                let child = node.right;
                while (child.left !== null) {
                    child = child.left;
                }
                node.key = child.key;
                node.value = child.value;

                node = child;
            }
        }
    }

    _reBalance(node) {
        this._reHeight(node);

        const balance = this._getBalance(node);

        if (balance === -2) {
            if (this._height(node.left.left) >= this._height(node.left.right)) {
                node = this._rotateRight(node);
            } else {
                node = this._rotateLeftThenRight(node);
            }
        } else if (balance === 2) {
            if (this._height(node.right.right) >= this._height(node.right.left)) {
                node = this._rotateLeft(node);
            } else {
                node = this._rotateRightThenLeft(node);
            }
        }

        if (node.parent !== null) {
            this._reBalance(node.parent);
        } else {
            this._root = node;
        }
    }

    _rotateRightThenLeft(node) {
        node.right = this._rotateRight(node.right);
        return this._rotateLeft(node);
    }

    _rotateLeftThenRight(node) {
        node.left = this._rotateLeft(node.left);
        return this._rotateRight(node);
    }

    //     parent         parent
    //       a              b
    //    l     b   ->   a     r
    //        c   r          l   c
    _rotateLeft(a) {
        const b = a.right;
        const c = b.left;
        const parent = a.parent;

        a.parent = b;
        a.right = c;
        if (c !== null) {
            c.parent = a;
        }

        b.parent = parent;
        if (parent !== null) {
            if (parent.right === a) {
                parent.right = b;
            } else {
                parent.left = b;
            }
        }
        b.left = a;

        this._reHeight(a);
        this._reHeight(b);

        return b;
    }

    //     parent        parent
    //       a               b
    //    b     r   ->    l     a
    //  l   c                 c   r
    _rotateRight(a) {
        const b = a.left;
        const c = b.right;
        const parent = a.parent;

        a.parent = b;
        a.left = c;
        if (c !== null) {
            c.parent = a;
        }

        b.parent = parent;
        if (parent !== null) {
            if (parent.right === a) {
                parent.right = b;
            } else {
                parent.left = b;
            }
        }
        b.right = a;

        this._reHeight(a);
        this._reHeight(b);

        return b;
    }

    _getBalance(node) {
        return this._height(node.right) - this._height(node.left);
    }

    _reHeight(node) {
        if (node !== null) {
            node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
        }
    }

    _height(node) {
        if (node === null) {
            return -1;
        }
        return node.height;
    }
}

exports.AVLTree = AVLTree;
