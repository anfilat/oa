const Benchmark = require('benchmark');
const { SingleArray } = require('../singleArray');
const { VectorArray } = require('../vectorArray');
const { FactorArray } = require('../factorArray');
const { MatrixArray } = require('../matrixArray');
const { SystemArray } = require('../systemArray');
const { TypedF64Array } = require('../typedF64Array');

[100, 1000, 10000].map(bench);

function bench(arrSize) {
    new Benchmark.Suite('Случайная вставка без роста')
        .add('SingleArray', function () {
            const arr = new SingleArray(arrSize);
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, arr.length * Math.random() | 0);
            }
        })
        .add('VectorArray', function () {
            const arr = new VectorArray(arrSize);
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, arr.length * Math.random() | 0);
            }
        })
        .add('FactorArray', function () {
            const arr = new FactorArray(arrSize);
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, arr.length * Math.random() | 0);
            }
        })
        .add('MatrixArray', function () {
            const arr = new MatrixArray(arrSize);
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, arr.length * Math.random() | 0);
            }
        })
        .add('SystemArray', function () {
            const arr = new SystemArray(arrSize);
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, arr.length * Math.random() | 0);
            }
        })
        .add('TypedF64Array', function () {
            const arr = new TypedF64Array(arrSize);
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, arr.length * Math.random() | 0);
            }
        })
        .on('cycle', function (event) {
            global.gc();
            console.log('Случайная вставка без роста', arrSize, String(event.target));
        })
        .run();
}
