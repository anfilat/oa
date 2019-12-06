class BaseTree {
    _root = null;

    getSortedKeys() {
        const result = [];
        this._walk(this._root, node => result.push(node.key));
        return result;
    }

    // возвращает сколько узлов на каждом уровне (для примерной оценки сбалансированности)
    getLevels() {
        const level = [];
        this._walk(this._root, (node, deep) => level[deep] = (level[deep] || 0) + 1);
        return level;
    }

    // сранивает ключи и свойство key в value. Для проверки корректности удалений
    isWrongValues() {
        let result = false;
        this._walk(this._root, node => {
            if (node.key !== node.value.key) {
                result = true;
            }
        });
        return result;
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

    // вставляет все значения из values
    insertValues(values) {
        if (values) {
            values.forEach(value => {
                // values может содержать только ключи или массивы из двух элементов [key, value]
                if (Array.isArray(value)) {
                    this.insert(value[0], value[1]);
                } else {
                    this.insert(value);
                }
            });
        }
    }

    // возвращает пару - [0: узел, соответствующий ключу, 1: его родитель\последний узел в пути поиска]
    _find(key) {
        let node = this._root;
        let parent = null;
        while (node) {
            if (node.key === key) {
                break;
            } else {
                parent = node;
                node = key < node.key ? node.left : node.right;
            }
        }
        return [node, parent];
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
}

exports.BaseTree = BaseTree;
