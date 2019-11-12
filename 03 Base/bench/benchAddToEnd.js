const Benchmark = require('benchmark');
const { SingleArray } = require('../singleArray');
const { VectorArray } = require('../vectorArray');
const { FactorArray } = require('../factorArray');
const { MatrixArray } = require('../matrixArray');
const { SpaceArray } = require('../spaceArray');
const { SystemArray } = require('../systemArray');
const { TypedF64Array } = require('../typedF64Array');

[100, 1000, 10000].map(bench);

function bench(arrSize) {
    new Benchmark.Suite('Вставка в конец')
        .add('SingleArray', function () {
            const arr = new SingleArray();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0);
            }
        })
        .add('VectorArray', function () {
            const arr = new VectorArray();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0);
            }
        })
        .add('FactorArray', function () {
            const arr = new FactorArray();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0);
            }
        })
        .add('MatrixArray', function () {
            const arr = new MatrixArray();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0);
            }
        })
        .add('SpaceArray', function () {
            const arr = new SpaceArray();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0);
            }
        })
        .add('SystemArray', function () {
            const arr = new SystemArray();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0);
            }
        })
        .add('TypedF64Array', function () {
            const arr = new TypedF64Array();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0);
            }
        })
        .on('cycle', function (event) {
            global.gc();
            console.log('Вставка в конец', arrSize, String(event.target));
        })
        .run();
}
