const {Node} = require('./node');
const {BaseTree} = require('./baseTree');

class Tree extends BaseTree {
    static new(values) {
        const tree = new Tree();
        tree.insertValues(values);

        return tree;
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
            this._root = newNode;
        } else {
            if (key < parent.key) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }
        }
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
                this._root = leftSubTree;
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
}

exports.Tree = Tree;
