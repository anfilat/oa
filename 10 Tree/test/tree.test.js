const {sortedArray, randomIntArray} = require('testUtils');
const {Tree} = require('../src/tree');

describe('tree', () => {
    it('создание дерева', () => {
        const tree = new Tree();

        expect(tree.getSortedKeys()).toEqual([]);
    });

    it('заполнение дерева сортированными ключами', () => {
        const values = sortedArray(10);
        const tree = Tree.new(values);

        expect(tree.getSortedKeys()).toEqual(values);
    });

    it('заполнение дерева случайными ключами', () => {
        const values = randomIntArray(10);
        const tree = Tree.new(values);
        const sorted = values.sort((a, b) => a - b);

        expect(tree.getSortedKeys()).toEqual(sorted);
    });

    it('заполнение дерева с дубликатами', () => {
        const tree = Tree.new([3, 3, 2, 2, 5, 5]);

        expect(tree.getSortedKeys()).toEqual([2, 3, 5]);
    });

    it('заполнение дерева ключами и значениями', () => {
        const tree = Tree.new([[3, 'qwerty'], [2, 'asdf'], [5, 'ghjk']]);

        expect(tree.isKey(2)).toEqual(true);
        expect(tree.isKey(1)).toEqual(false);

        expect(tree.get(2)).toEqual('asdf');
        expect(tree.get(1)).toEqual(undefined);
    });

    it('удаление корня из дерева с одним узлом', () => {
        const values = [6];
        const tree = Tree.new(values);
        tree.remove(6);

        expect(tree.getSortedKeys()).toEqual([]);
    });

    // https://habr.com/ru/post/65617/
    it('удаление элемента с двумя потомками', () => {
        const values = [33, 5, 1, 4, 20, 17, 31];
        const tree = Tree.new(values);
        tree.remove(5);

        expect(tree.getSortedKeys()).toEqual([1, 4, 17, 20, 31, 33]);
    });

    it('удаление значений', () => {
        const values = [6, 2, 7, 4, 5, 1, 3];
        const tree = Tree.new(values);
        tree.remove(3);
        tree.remove(6);
        tree.remove(5);
        tree.remove(13);

        expect(tree.getSortedKeys()).toEqual([1, 2, 4, 7]);
    });
});
