const {sortedArray, randomIntArray} = require('testUtils');
const {SplayTree} = require('../src/splayTree');

describe('tree', () => {
    it('создание дерева', () => {
        const tree = new SplayTree();

        expect(tree.getSortedKeys()).toEqual([]);
    });

    it('заполнение дерева сортированными ключами', () => {
        const values = sortedArray(10);
        const tree = SplayTree.new(values);

        expect(tree.getSortedKeys()).toEqual(values);
    });

    it('заполнение дерева случайными ключами', () => {
        const values = randomIntArray(100);
        const tree = SplayTree.new(values);
        const sorted = values.sort((a, b) => a - b);

        expect(tree.getSortedKeys()).toEqual(sorted);
    });

    it('заполнение дерева с дубликатами', () => {
        const tree = SplayTree.new([3, 3, 2, 2, 5, 5]);

        expect(tree.getSortedKeys()).toEqual([2, 3, 5]);
    });

    it('заполнение дерева ключами и значениями', () => {
        const tree = SplayTree.new([[3, 'qwerty'], [2, 'asdf'], [5, 'ghjk']]);

        expect(tree.isKey(3)).toEqual(true);
        expect(tree.isKey(2)).toEqual(true);
        expect(tree.isKey(5)).toEqual(true);
        expect(tree.isKey(1)).toEqual(false);

        expect(tree.get(3)).toEqual('qwerty');
        expect(tree.get(2)).toEqual('asdf');
        expect(tree.get(5)).toEqual('ghjk');
        expect(tree.get(1)).toEqual(undefined);
    });

    it('удаление из пустого дерева', () => {
        const tree = new SplayTree();
        tree.remove(6);

        expect(tree.getSortedKeys()).toEqual([]);
    });

    it('удаление корня из дерева с одним узлом', () => {
        const values = [6];
        const tree = SplayTree.new(values);
        tree.remove(6);

        expect(tree.getSortedKeys()).toEqual([]);
    });

    // https://habr.com/ru/post/65617/
    it('удаление элемента с двумя потомками', () => {
        const values = [
            [33, {key: 33}], [5, {key: 5}], [1, {key: 1}], [4, {key: 4}], [20, {key: 20}], [17, {key: 17}], [31, {key: 31}]
        ];
        const tree = SplayTree.new(values);
        tree.remove(5);

        expect(tree.getSortedKeys()).toEqual([1, 4, 17, 20, 31, 33]);
        expect(tree.isWrongValues()).toEqual(false);
    });

    it('удаление элементов', () => {
        const values = [
            [6, {key: 6}], [2, {key: 2}], [7, {key: 7}], [4, {key: 4}], [5, {key: 5}], [1, {key: 1}], [3, {key: 3}]
        ];
        const tree = SplayTree.new(values);
        tree.remove(3);
        tree.remove(6);
        tree.remove(5);
        tree.remove(13);

        expect(tree.getSortedKeys()).toEqual([1, 2, 4, 7]);
        expect(tree.isWrongValues()).toEqual(false);
    });

    it('массовое удаление элементов', () => {
        const randomNumbers = randomIntArray(200);
        const tree = SplayTree.new(randomNumbers);

        randomNumbers.forEach(num => tree.remove(num));

        expect(tree.getSortedKeys()).toEqual([]);
    });
});
