// поразрядная сортировка массива на месте
function radixSort(array, base = 10, max) {
    for (let exp = 1; exp < max; exp *= base) {
        countingSort(array, base, exp);
    }

    return array;
}

function countingSort(array, base, exp) {
    const counts = new Array(base).fill(0);

    // подсчет
    for (let i = 0; i < array.length; i++) {
        counts[digit(array[i], base, exp)]++;
    }
    // последние индексы частей
    for (let i = 1; i < base; i++) {
        counts[i] += counts[i - 1];
    }
    // копия сортируемого массива
    const b = copyArray(array);
    // перезаписываем оригинальный массив частично отсортированным
    for (let i = array.length - 1; i >= 0; i--) {
        const dig = digit(b[i], base, exp);
        counts[dig]--;
        array[counts[dig]] = b[i];
    }
}

function digit(value, base, exp) {
    return Math.floor(value / exp) % base;
}

function copyArray(array) {
    if (Array.isArray(array)) {
        const result = [];
        for (let i = 0; i < array.length; i++) {
            result.push(array[i]);
        }
        return result;
    }

    // типизированные массивы
    const result = new array.constructor[Symbol.species](array.length);
    for (let i = 0; i < array.length; i++) {
        result[i] = array[i];
    }
    return result;
}

exports.radixSort = radixSort;
