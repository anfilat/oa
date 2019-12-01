function benchArray(array, fn) {
    let arr = array.slice();

    const start = new Date();
    fn(arr);
    const end = new Date();

    arr = null;
    global.gc();

    return end - start;
}

function bench(fn) {
    const start = new Date();
    fn();
    const end = new Date();

    return end - start;
}

module.exports = {
    benchArray,
    bench,
};
