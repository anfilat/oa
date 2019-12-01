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

function randomTypedFloatArray(n) {
    const arr = new Float64Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = Math.random();
    }
    return arr;
}

function randomTypedIntArray(n) {
    const arr = new Int32Array(n);
    const max = 2 ** 31;
    for (let i = 0; i < n; i++) {
        arr[i] = Math.random() * max | 0;
    }
    return arr;
}

function randomTypedUint16Array(n) {
    const arr = new Uint16Array(n);
    const max = 2 ** 16;
    for (let i = 0; i < n; i++) {
        arr[i] = Math.random() * max | 0;
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
    randomTypedFloatArray,
    randomTypedIntArray,
    randomTypedUint16Array,
    shuffle
};
