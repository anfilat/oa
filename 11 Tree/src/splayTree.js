const {SplayNode} = require('./splayNode');
const {BaseTree} = require('../../10 Tree/src/baseTree');

class SplayTree extends BaseTree {
    static new(values) {
        const tree = new SplayTree();
        tree.insertValues(values);

        return tree;
    }

    // добавляет узел.
    // если ключ уже есть, переписывается существующее значение
    insert(key, value) {
        const [node, parent] = this._find(key);
        if (node) {
            node.value = value;
            this._splay(node);
            return;
        }

        const newNode = new SplayNode(key, value, parent);
        if (parent == null) {
            this._root = newNode;
        } else {
            if (key < parent.key) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
            this._splay(newNode);
        }
    }

    // возвращает - есть ли ключ
    isKey(key) {
        const [node] = this._find(key);
        if (node !== null) {
            this._splay(node);
            return true;
        }
        return false;
    }

    // возвращает значение если есть
    get(key) {
        const [node] = this._find(key);
        if (node !== null) {
            this._splay(node);
            return node.value;
        }
        return undefined;
    }

    remove(key) {
        const [node] = this._find(key);
        if (node === null) {
            return;
        }

        this._splay(node);

        if (node.left === null) {
            this._replace(node, node.right);
        } else if (node.right === null) {
            this._replace(node, node.left);
        } else {
            const replaceNode = this._subtreeMinimum(node.right);
            if (replaceNode.parent !== node) {
                this._replace(replaceNode, replaceNode.right);
                replaceNode.right = node.right;
                replaceNode.right.parent = replaceNode;
            }
            this._replace(node, replaceNode);
            replaceNode.left = node.left;
            replaceNode.left.parent = replaceNode;
        }
    }

    _subtreeMinimum(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    _replace(u, v) {
        if (u.parent === null) {
            this._root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        if (v !== null) {
            v.parent = u.parent;
        }
    }

    _splay(x) {
        while (x.parent !== null) {
            if (x.parent.parent === null) {
                if (x.parent.left === x) {
                    this._zigRight(x.parent);
                } else {
                    this._zigLeft(x.parent);
                }
            } else if (x.parent.left === x && x.parent.parent.left === x.parent ) {
                this._zigZigRight(x, x.parent, x.parent.parent);
            } else if (x.parent.right === x && x.parent.parent.right === x.parent ) {
                this._zigZigLeft(x, x.parent, x.parent.parent);
            } else if (x.parent.left === x && x.parent.parent.right === x.parent) {
                this._zigZagLeft(x, x.parent, x.parent.parent);
            } else {
                this._zigZagRight(x, x.parent, x.parent.parent);
            }
        }
    }

    //     parent         parent
    //       p              x
    //    a     x   ->   p     c
    //        b   c    a   b
    _zigLeft(p) {
        const x = p.right;
        const parent = p.parent;
        const b = x.left;

        p.right = b;
        if (b !== null) {
            b.parent = p;
        }

        x.parent = parent;
        if (parent === null) {
            this._root = x;
        }
        x.left = p;
        p.parent = x;
    }

    //     parent          parent
    //       p               x
    //    x     c   ->    a     p
    //  a   b                 b   c
    _zigRight(p) {
        const x = p.left;
        const parent = p.parent;
        const b = x.right;

        p.left = b;
        if (b !== null) {
            b.parent = p;
        }

        x.parent = parent;
        if (parent === null) {
            this._root = x;
        }
        x.right = p;
        p.parent = x;
    }

    //   parent               parent
    //     g                    x
    //  a     p     ->       p     d
    //     b    x         g     c
    //        c   d    a     b
    _zigZigLeft(x, p, g) {
        const parent = g.parent;
        const b = p.left;
        const c = x.left;

        g.right = b;
        if (b !== null) {
            b.parent = g;
        }

        p.right = c;
        if (c !== null) {
            c.parent = p;
        }
        p.left = g;
        g.parent = p;

        x.parent = parent;
        if (parent === null) {
            this._root = x;
        } else if (g === parent.left) {
            parent.left = x;
        } else {
            parent.right = x;
        }
        x.left = p;
        p.parent = x;
    }

    //        parent          parent
    //          g               x
    //       p     d   ->    a     p
    //    x     c               b     g
    // a     b                     c     d
    _zigZigRight(x, p, g) {
        const parent = g.parent;
        const b = x.right;
        const c = p.right;

        g.left = c;
        if (c !== null) {
            c.parent = g;
        }

        p.left = b;
        if (b !== null) {
            b.parent = p;
        }
        p.right = g;
        g.parent = p;

        x.parent = parent;
        if (parent === null) {
            this._root = x;
        } else if (g === parent.left) {
            parent.left = x;
        } else {
            parent.right = x;
        }
        x.right = p;
        p.parent = x;
    }

    //   parent              parent
    //     g                   x
    //  a     p     ->      g     p
    //     x     d        a   b c   d
    //  b     c
    _zigZagLeft(x, p, g) {
        const parent = g.parent;
        const b = x.left;
        const c = x.right;

        g.right = b;
        if (b !== null) {
            b.parent = g;
        }

        p.left = c;
        if (c !== null) {
            c.parent = p;
        }

        x.left = g;
        g.parent = x;
        x.right = p;
        p.parent = x;

        x.parent = parent;
        if (parent === null) {
            this._root = x;
        } else if (g === parent.left) {
            parent.left = x;
        } else {
            parent.right = x;
        }
    }

    //     parent             parent
    //       g                  x
    //    p     d   ->       p     g
    // a     x             a   b c   d
    //    b     c
    _zigZagRight(x, p, g) {
        const parent = g.parent;
        const b = x.left;
        const c = x.right;

        p.right = b;
        if (b !== null) {
            b.parent = p;
        }

        g.left = c;
        if (c !== null) {
            c.parent = g;
        }

        x.left = p;
        p.parent = x;
        x.right = g;
        g.parent = x;

        x.parent = parent;
        if (parent === null) {
            this._root = x;
        } else if (g === parent.left) {
            parent.left = x;
        } else {
            parent.right = x;
        }
    }
}

exports.SplayTree = SplayTree;
