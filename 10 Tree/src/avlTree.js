const {AVLNode} = require('../src/avlNode');

//http://rosettacode.org/wiki/AVL_tree#TypeScript поправленный по
//http://rosettacode.org/wiki/AVL_tree#Java
class AVLTree {
    #root = null;

    static new(values) {
        const tree = new AVLTree();
        if (values) {
            values.forEach(value => {
                // values может содержать только ключи или массивы из двух элементов [key, value]
                if (Array.isArray(value)) {
                    tree.insert(value[0], value[1]);
                } else {
                    tree.insert(value);
                }
            });
        }

        return tree;
    }

    getSortedKeys() {
        const result = [];
        this._walk(this.#root, node => result.push(node.key));
        return result;
    }

    // возвращает сколько узлов на каждом уровне
    getLevels() {
        const level = [];
        this._walk(this.#root, (node, deep) => level[deep] = (level[deep] || 0) + 1);
        return level;
    }

    // функция для тестирования корректности дерева
    isWrongBalances() {
        let result = false;
        this._walk(this.#root, node => {
            if (![-1, 0, 1].includes(this._getBalance(node))) {
                result = true;
            }
        });
        return result;
    }

    // добавляет узел.
    // если ключ уже есть, переписывается существующее значение
    insert(key, value = null) {
        if (this.#root === null) {
            this.#root = new AVLNode(key, value);
        } else {
            let node = this.#root;
            let parent = null;

            while (true) {
                if (node.key === key) {
                    node.value = value;
                    return;
                }

                parent = node;

                const goLeft = node.key > key;
                node = goLeft ? node.left : node.right;

                if (node === null) {
                    if (goLeft) {
                        parent.left = new AVLNode(key, value, parent);
                    } else {
                        parent.right = new AVLNode(key, value, parent);
                    }

                    this._reBalance(parent);
                    break;
                }
            }
        }
    }

    // возвращает - есть ли ключ
    isKey(key) {
        return !!this._find(key);
    }

    // возвращает значение если есть
    get(key) {
        const node = this._find(key);
        return node ? node.value : undefined;
    }

    remove(key) {
        if (this.#root === null) {
            return;
        }

        let node = this.#root;
        let parent = this.#root;
        let delNode = null;
        let child = this.#root;

        while (child !== null) {
            parent = node;
            node = child;
            child = key >= node.key ? node.right : node.left;
            if (key === node.key) {
                delNode = node;
            }
        }

        if (delNode !== null) {
            delNode.key = node.key;

            child = node.left !== null ? node.left : node.right;

            if (this.#root.key === key) {
                this.#root = child;
            } else {
                if (parent.left === node) {
                    parent.left = child;
                } else {
                    parent.right = child;
                }

                this._reBalance(parent);
            }
        }
    }

    // возвращает узел, соответствующий ключу
    _find(key) {
        let node = this.#root;
        let parent = null;
        while (node) {
            if (node.key === key) {
                break;
            } else {
                parent = node;
                if (key < node.key) {
                    node = node.left;
                } else {
                    node = node.right;
                }
            }
        }
        return node;
    }

    // прямой обход дерева с вызовом fn в каждом узле
    _walk(node, fn) {
        if (!node) {
            return;
        }

        walk(node, 0);

        function walk(node, deep) {
            if (node.left) {
                walk(node.left, deep + 1);
            }
            fn(node, deep);
            if (node.right) {
                walk(node.right, deep + 1);
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
            this.#root = node;
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

    _rotateLeft(a) {
        const b = a.right;
        b.parent = a.parent;
        a.right = b.left;

        if (a.right !== null) {
            a.right.parent = a;
        }

        b.left = a;
        a.parent = b;

        if (b.parent !== null) {
            if (b.parent.right === a) {
                b.parent.right = b;
            } else {
                b.parent.left = b;
            }
        }

        this._reHeight(a);
        this._reHeight(b);

        return b;
    }

    _rotateRight(a) {
        const b = a.left;
        b.parent = a.parent;
        a.left = b.right;

        if (a.left !== null) {
            a.left.parent = a;
        }

        b.right = a;
        a.parent = b;

        if (b.parent !== null) {
            if (b.parent.right === a) {
                b.parent.right = b;
            } else {
                b.parent.left = b;
            }
        }

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
