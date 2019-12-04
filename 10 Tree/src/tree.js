const {Node} = require('./node');

class Tree {
    #root = null;

    static new(values) {
        const tree = new Tree();
        if (values) {
            values.forEach(value => {
                // values содержит только ключи или массивы из двух элементов [key, value]
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

    // добавляет узел.
    // если ключ уже есть, переписывается существующее значение
    insert(key, value = null) {
        const [node, parent] = this._find(key);
        if (node) {
            node.value = value;
            return;
        }

        const newNode = new Node(key, value);
        if (parent == null) {
            this.#root = newNode;
        } else {
            if (key < parent.key) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
        }
    }

    // возвращает - есть ли ключ
    isKey(key) {
        const [node] = this._find(key);
        return !!node;
    }

    // возвращает значение если есть
    get(key) {
        const [node] = this._find(key);
        return node ? node.value : undefined;
    }

    remove(key) {
        const [node, parent] = this._find(key);
        if (!node) {
            return;
        }

        // нет правого поддерева, вставляем на место удаляемого узла его левое поддерево
        if (node.right === null) {
            const leftSubTree = node.left;
            if (parent === null) {
                // удаляем элемент из корня
                this.#root = leftSubTree;
            } else {
                if (node === parent.left) {
                    parent.left = leftSubTree;
                } else {
                    parent.right = leftSubTree;
                }
            }
        } else {
            // ищем минимальный в правом поддереве и ставим его на место удаляемого
            let leftMost = node.right;
            let parentLeftMost = null;
            while (leftMost.left) {
                parentLeftMost = leftMost;
                leftMost = leftMost.left;
            }
            if (parentLeftMost) {
                parentLeftMost.left = leftMost.right;
            } else {
                node.right = leftMost.right;
            }
            node.key = leftMost.key;
            node.value = leftMost.value;
        }
    }

    // возвращает пару - [0: узел, соответствующий ключу, 1: его родитель\последний узел в пути поиска]
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
        return [node, parent];
    }

    // прямой обход дерева с вызовом fn в каждом узле
    _walk(node, fn) {
        if (!node) {
            return;
        }

        walk(node);

        function walk(node) {
            if (node.left) {
                walk(node.left);
            }
            fn(node);
            if (node.right) {
                walk(node.right);
            }
        }
    }
}

exports.Tree = Tree;
