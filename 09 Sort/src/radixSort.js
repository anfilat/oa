// поразрядная сортировка массива на месте
// массив целых чисел, maxBits - максимальная битность чисел
function radixSort(array, maxBits) {
    let exp;
    for (exp = 0; exp < maxBits; exp += 4) {
        countingSort(array);
    }

    return array;

    function countingSort(array) {
        const counts = new Uint32Array(16);

        // подсчет
        for (let i = 0; i < array.length; i++) {
            counts[digit(array[i])]++;
        }
        // последние индексы частей
        for (let i = 1; i < 16; i++) {
            counts[i] += counts[i - 1];
        }
        // копия сортируемого массива
        const b = copyArray(array);
        // перезаписываем оригинальный массив частично отсортированным
        for (let i = array.length - 1; i >= 0; i--) {
            const dig = digit(b[i]);
            counts[dig]--;
            array[counts[dig]] = b[i];
        }
    }

    function digit(value) {
        return (value >> exp) & 15;
    }
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
