// поразрядная сортировка массива на месте
// массив целых чисел, maxBits - максимальная битность чисел (16 - 2 байтные целые, 32 - 4 байтные)

// сортировка идет по одной шестнадцатитеричной цифре за раз (4 бита)
const baseBits = 4;
const base = 1 << baseBits;
const baseMask = base - 1;

function radixSort(array, maxBits) {
    for (let exp = 0; exp < maxBits; exp += baseBits) {
        countingSort(array, exp);
    }

    return array;
}

function countingSort(array, exp) {
    const counts = new Uint32Array(base);

    // подсчет
    for (let i = 0; i < array.length; i++) {
        counts[digit(array[i], exp)]++;
    }
    // последние индексы частей
    for (let i = 1; i < base; i++) {
        counts[i] += counts[i - 1];
    }
    // копия сортируемого массива
    const prevArray = copyArray(array);
    // перезаписываем оригинальный массив частично отсортированным
    for (let i = prevArray.length - 1; i >= 0; i--) {
        const dig = digit(prevArray[i], exp);
        counts[dig]--;
        array[counts[dig]] = prevArray[i];
    }
}

function digit(value, exp) {
    return (value >> exp) & baseMask;
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
