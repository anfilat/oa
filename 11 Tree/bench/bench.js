const { bench, randomIntArray, randomElements } = require('testUtils');
const { AVLTree } = require('../../10 Tree/src/avlTree');
const { RandomTree } = require('../src/randomTree');
const { SplayTree } = require('../src/splayTree');

const size = 5000000;

const randomNumbers = randomIntArray(size);
const sortedNumbers = randomNumbers.slice().sort((a, b) => a - b);

let randomAVLTree;
console.log('random AVL tree');
console.log('fill', bench(() => randomAVLTree = AVLTree.new(randomNumbers)));
console.log('search', bench(() => findNumbers(randomAVLTree)));
console.log('double search', bench(() => doubleFindNumbers(randomAVLTree)));
console.log('remove', bench(() => removeNumbers(randomAVLTree)));
console.log(randomAVLTree.getLevels());

let sortedAVLTree;
console.log('sorted AVL tree');
console.log('fill', bench(() => sortedAVLTree = AVLTree.new(sortedNumbers)));
console.log('search', bench(() => findNumbers(sortedAVLTree)));
console.log('double search', bench(() => doubleFindNumbers(sortedAVLTree)));
console.log('remove', bench(() => removeNumbers(sortedAVLTree)));
console.log(sortedAVLTree.getLevels());

let randomRandomTree;
console.log('random Random tree');
console.log('fill', bench(() => randomRandomTree = RandomTree.new(randomNumbers)));
console.log('search', bench(() => findNumbers(randomRandomTree)));
console.log('double search', bench(() => doubleFindNumbers(randomRandomTree)));
console.log('remove', bench(() => removeNumbers(randomRandomTree)));
console.log(randomRandomTree.getLevels());

let sortedRandomTree;
console.log('sorted Random tree');
console.log('fill', bench(() => sortedRandomTree = RandomTree.new(sortedNumbers)));
console.log('search', bench(() => findNumbers(sortedRandomTree)));
console.log('double search', bench(() => doubleFindNumbers(sortedRandomTree)));
console.log('remove', bench(() => removeNumbers(sortedRandomTree)));
console.log(sortedRandomTree.getLevels());

let randomSplayTree;
console.log('random Splay tree');
console.log('fill', bench(() => randomSplayTree = SplayTree.new(randomNumbers)));
console.log('search', bench(() => findNumbers(randomSplayTree)));
console.log('double search', bench(() => doubleFindNumbers(randomSplayTree)));
console.log('remove', bench(() => removeNumbers(randomSplayTree)));
console.log(randomSplayTree.getLevels());

let sortedSplayTree;
console.log('sorted Splay tree');
console.log('fill', bench(() => sortedSplayTree = SplayTree.new(sortedNumbers)));
console.log('search', bench(() => findNumbers(sortedSplayTree)));
console.log('double search', bench(() => doubleFindNumbers(sortedSplayTree)));
console.log('remove', bench(() => removeNumbers(sortedSplayTree)));
console.log(sortedSplayTree.getLevels());

function findNumbers(tree) {
    const numbers = randomElements(randomNumbers, size / 10);
    let found = 0;
    for (let num of numbers) {
        if (tree.isKey(num)) {
            found++;
        }
    }
    return found;
}

// 4 раза найти один и тот же список чисел
function doubleFindNumbers(tree) {
    const numbers = randomElements(randomNumbers, size / 40);
    let found = 0;
    for (let i = 0; i < 4; i++) {
        for (let num of numbers) {
            if (tree.isKey(num)) {
                found++;
            }
        }
    }
    return found;
}

function removeNumbers(tree) {
    const numbers = randomElements(randomNumbers, size / 10);
    for (let num of numbers) {
        tree.remove(num);
    }
}
