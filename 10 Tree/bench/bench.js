const { bench, randomIntArray, randomElements } = require('testUtils');
const { Tree } = require('../src/tree');

const size = 100000;

const randomNumbers = randomIntArray(size);
const sortedNumbers = randomNumbers.slice().sort((a, b) => a - b);

let randomTree;
console.log('random tree');
console.log('fill', bench(() => randomTree = Tree.new(randomNumbers)));
console.log('search', bench(() => findNumbers(randomTree)));
console.log('remove', bench(() => removeNumbers(randomTree)));

let sortedTree;
console.log('sorted tree');
console.log('fill', bench(() => sortedTree = Tree.new(sortedNumbers)));
console.log('search', bench(() => findNumbers(sortedTree)));
console.log('remove', bench(() => removeNumbers(sortedTree)));

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
