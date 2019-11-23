function heap(array) {
    const n = array.length;

    for (let node = Math.floor(n / 2) - 1; node >= 0; node--) {
        down(n, node);
    }

    for (let size = n - 1; size > 0; size--) {
        swap(0, size);
        down(size, 0);
    }

    return array;

    function down(size, root) {
        while (true) {
            // левый потомок
            let child = (root << 1) + 1;
            if (child >= size) {
                return;
            }
            let childValue = array[child];

            // правый потомок
            const right = child + 1;
            if (right < size && childValue < array[right]) {
                child = right;
                childValue = array[right];
            }

            // сравнение корня с потомками
            let rootValue = array[root];
            if (rootValue >= childValue) {
                return;
            }

            // делаем инлайн свопа за компилятор (дает ускорение сортировки в 2-3 раза)
            array[root] = childValue;
            array[child] = rootValue;

            root = child;
        }
    }

    function swap(i, j) {
        const t = array[i];
        array[i] = array[j];
        array[j] = t;
    }
}

module.exports = {
    heap,
};
