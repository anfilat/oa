const { bench, randomIntArray, randomElements } = require('testUtils');
const { Tree } = require('../src/tree');
const { AVLTree } = require('../src/avlTree');

const size = 20000;

const randomNumbers = randomIntArray(size);
const sortedNumbers = randomNumbers.slice().sort((a, b) => a - b);

let randomTree;
console.log('random tree');
console.log('fill', bench(() => randomTree = Tree.new(randomNumbers)));
//console.log('levels', randomTree.getLevels());
console.log('search', bench(() => findNumbers(randomTree)));
console.log('remove', bench(() => removeNumbers(randomTree)));

let sortedTree;
console.log('sorted tree');
console.log('fill', bench(() => sortedTree = Tree.new(sortedNumbers)));
//console.log('levels', sortedTree.getLevels());
console.log('search', bench(() => findNumbers(sortedTree)));
console.log('remove', bench(() => removeNumbers(sortedTree)));

let randomAVLTree;
console.log('random AVL tree');
console.log('fill', bench(() => randomAVLTree = AVLTree.new(randomNumbers)));
console.log('rotates', randomAVLTree.leftRot, randomAVLTree.rightRot);
//console.log('levels', randomAVLTree.getLevels());
console.log('search', bench(() => findNumbers(randomAVLTree)));
console.log('remove', bench(() => removeNumbers(randomAVLTree)));

let sortedAVLTree;
console.log('sorted AVL tree');
console.log('fill', bench(() => sortedAVLTree = AVLTree.new(sortedNumbers)));
console.log('rotates', sortedAVLTree.leftRot, sortedAVLTree.rightRot);
//console.log('levels', sortedAVLTree.getLevels());
console.log('search', bench(() => findNumbers(sortedAVLTree)));
console.log('remove', bench(() => removeNumbers(sortedAVLTree)));

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
