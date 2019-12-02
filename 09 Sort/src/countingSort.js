// сортировка подсчетом массива с 16-битными числами
function countingSort(array) {
    const counts = countNumbers(array);
    writeSorted(array, counts);

    return array;
}

function countNumbers(array) {
    const counts = new Uint16Array(2 ** 16);

    for (let i = 0; i < array.length; i++) {
        const value = array[i];
        counts[value]++;
    }

    return counts;
}

function writeSorted(array, counts) {
    let index = 0;
    for (let value = 0; value < counts.length; value++) {
        for (let count = counts[value]; count > 0; count--) {
            array[index] = value;
            index++;
        }
    }
}

exports.countingSort = countingSort;
