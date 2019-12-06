const {sortedArray, randomIntArray, randomElements} = require('testUtils');
const {AVLTree} = require('../src/avlTree');

describe('tree', () => {
    it('создание дерева', () => {
        const tree = new AVLTree();

        expect(tree.getSortedKeys()).toEqual([]);
        expect(tree.isWrongBalances()).toEqual(false);
    });

    it('заполнение дерева сортированными ключами', () => {
        const values = sortedArray(10);
        const tree = AVLTree.new(values);

        expect(tree.getSortedKeys()).toEqual(values);
        expect(tree.isWrongBalances()).toEqual(false);
    });

    it('заполнение дерева случайными ключами', () => {
        const values = randomIntArray(10);
        const tree = AVLTree.new(values);
        const sorted = values.sort((a, b) => a - b);

        expect(tree.getSortedKeys()).toEqual(sorted);
        expect(tree.isWrongBalances()).toEqual(false);
    });

    it('заполнение дерева с дубликатами', () => {
        const tree = AVLTree.new([3, 3, 2, 2, 5, 5]);

        expect(tree.getSortedKeys()).toEqual([2, 3, 5]);
        expect(tree.isWrongBalances()).toEqual(false);
    });

    it('заполнение дерева ключами и значениями', () => {
        const tree = AVLTree.new([[3, 'qwerty'], [2, 'asdf'], [5, 'ghjk']]);

        expect(tree.isKey(3)).toEqual(true);
        expect(tree.isKey(2)).toEqual(true);
        expect(tree.isKey(5)).toEqual(true);
        expect(tree.isKey(1)).toEqual(false);

        expect(tree.get(3)).toEqual('qwerty');
        expect(tree.get(2)).toEqual('asdf');
        expect(tree.get(5)).toEqual('ghjk');
        expect(tree.get(1)).toEqual(undefined);

        expect(tree.isWrongBalances()).toEqual(false);
    });

    it('удаление из пустого дерева', () => {
        const tree = new AVLTree();
        tree.remove(6);

        expect(tree.getSortedKeys()).toEqual([]);
        expect(tree.isWrongBalances()).toEqual(false);
    });

    it('удаление корня из дерева с одним узлом', () => {
        const values = [6];
        const tree = AVLTree.new(values);
        tree.remove(6);

        expect(tree.getSortedKeys()).toEqual([]);
        expect(tree.isWrongBalances()).toEqual(false);
    });

    // https://habr.com/ru/post/65617/
    it('удаление элемента с двумя потомками', () => {
        const values = [
            [33, {key: 33}], [5, {key: 5}], [1, {key: 1}], [4, {key: 4}], [20, {key: 20}], [17, {key: 17}], [31, {key: 31}]
        ];
        const tree = AVLTree.new(values);
        tree.remove(5);

        expect(tree.getSortedKeys()).toEqual([1, 4, 17, 20, 31, 33]);
        expect(tree.isWrongBalances()).toEqual(false);
        expect(tree.isWrongValues()).toEqual(false);
    });

    it('удаление элементов', () => {
        const randomNumbers = randomIntArray(200);
        const tree = AVLTree.new(randomNumbers);

        const numbers = randomElements(randomNumbers, 100);
        numbers.forEach(num => tree.remove(num));

        expect(tree.isWrongBalances()).toEqual(false);
    });
});
