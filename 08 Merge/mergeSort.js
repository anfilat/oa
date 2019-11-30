// https://en.wikipedia.org/wiki/Merge_sort
function mergeSort(a, m = 0) {
    // Array a[] has the items to sort; array b[] is a work array.
    const b = copyArray(a);                // duplicate array A[] into B[]
    topDownSplitMerge(b, 0, a.length, a);  // sort data from B[] into A[]

    return a;

    // Sort the given run of array a[] using array b[] as a source.
    // left is inclusive; right is exclusive (a[right] is not in the set).
    function topDownSplitMerge(b, left, right, a) {
        if (right - left < 2) {                    // if run size == 1
            return;                                //   consider it sorted
        }
        if (right - left <= m) {
            insertion(a, left, right);
            return
        }
        // split the run longer than 1 item into halves
        let middle = left + ((right - left) >> 1); // middle = mid point
        // recursively sort both runs from array a[] into b[]
        topDownSplitMerge(a, left, middle, b);     // sort the left  run
        topDownSplitMerge(a, middle, right, b);    // sort the right run
        // merge the resulting runs from array b[] into a[]
        topDownMerge(b, left, middle, right, a);
    }

    // Left source half is  a[ left:middle - 1].
    // Right source half is a[middle:right - 1].
    // Result is            b[left:right - 1].
    function topDownMerge(a, left, middle, right, b) {
        let i = left;
        let j = middle;

        // While there are elements in the left or right runs...
        for (let k = left; k < right; k++) {
            // If left run head exists and is <= existing right run head.
            if (i < middle && (j >= right || a[i] <= a[j])) {
                b[k] = a[i];
                i++;
            } else {
                b[k] = a[j];
                j++;
            }
        }
    }

    function copyArray(array) {
        const result = [];
        for (let i = 0; i < array.length; i++) {
            result.push(array[i]);
        }
        return result;
    }
}

// сортировка вставками
function insertion(array, left, right) {
    for (let i = left + 1; i < right; i++) {
        for (let j = i; j > left && array[j - 1] > array[j]; j--) {
            const t = array[j - 1];
            array[j - 1] = array[j];
            array[j] = t;
        }
    }
}

exports.mergeSort = mergeSort;
