const { bench, randomIntArray, randomElements } = require('testUtils');
const { AVLTree } = require('../../10 Tree/src/avlTree');
const { RandomTree } = require('../src/randomTree');

const size = 5000000;

const randomNumbers = randomIntArray(size);
const sortedNumbers = randomNumbers.slice().sort((a, b) => a - b);

let randomAVLTree;
console.log('random AVL tree');
console.log('fill', bench(() => randomAVLTree = AVLTree.new(randomNumbers)));
console.log('search', bench(() => findNumbers(randomAVLTree)));
console.log('remove', bench(() => removeNumbers(randomAVLTree)));
console.log(randomAVLTree.getLevels());

let sortedAVLTree;
console.log('sorted AVL tree');
console.log('fill', bench(() => sortedAVLTree = AVLTree.new(sortedNumbers)));
console.log('search', bench(() => findNumbers(sortedAVLTree)));
console.log('remove', bench(() => removeNumbers(sortedAVLTree)));
console.log(sortedAVLTree.getLevels());

let randomRandomTree;
console.log('random Random tree');
console.log('fill', bench(() => randomRandomTree = RandomTree.new(randomNumbers)));
console.log('search', bench(() => findNumbers(randomRandomTree)));
console.log('remove', bench(() => removeNumbers(randomRandomTree)));
console.log(randomRandomTree.getLevels());

let sortedRandomTree;
console.log('sorted Random tree');
console.log('fill', bench(() => sortedRandomTree = RandomTree.new(sortedNumbers)));
console.log('search', bench(() => findNumbers(sortedRandomTree)));
console.log('remove', bench(() => removeNumbers(sortedRandomTree)));
console.log(sortedRandomTree.getLevels());

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

function removeNumbers(tree) {
    const numbers = randomElements(randomNumbers, size / 10);
    for (let num of numbers) {
        tree.remove(num);
    }
}
