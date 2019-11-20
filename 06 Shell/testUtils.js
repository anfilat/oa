function randomArray(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Math.random());
    }
    return arr;
}

function sortedArray(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(i);
    }
    return arr;
}

function reversedArray(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(n - i - 1);
    }
    return arr;
}

// n - сколько элементов надо перемешать в массиве
function shuffle(arr, n) {
    const indexes = new Set();

    while (indexes.size < n) {
        indexes.add(Math.floor(Math.random() * arr.length));
    }

    const values = indexes.values();
    let index = values.next().value;
    const value = arr[index];
    for (let i of values) {
        arr[index] = arr[i];
        index = i;
    }
    arr[index] = value;
}

module.exports = {
    randomArray,
    sortedArray,
    reversedArray,
    shuffle
};
