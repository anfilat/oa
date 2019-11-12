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
    const readSingleArray = new SingleArray();
    for (let i = 0; i < arrSize; i++) {
        readSingleArray.add(0);
    }

    const readVectorArray = new VectorArray();
    for (let i = 0; i < arrSize; i++) {
        readVectorArray.add(0);
    }

    const readFactorArray = new FactorArray();
    for (let i = 0; i < arrSize; i++) {
        readFactorArray.add(0);
    }

    const readMatrixArray = new MatrixArray();
    for (let i = 0; i < arrSize; i++) {
        readMatrixArray.add(0);
    }

    const readSpaceArray = new SpaceArray();
    for (let i = 0; i < arrSize; i++) {
        readSpaceArray.add(0);
    }

    const readSystemArray = new SystemArray();
    for (let i = 0; i < arrSize; i++) {
        readSystemArray.add(0);
    }

    const readTypedF64Array = new TypedF64Array();
    for (let i = 0; i < arrSize; i++) {
        readTypedF64Array.add(0);
    }

    new Benchmark.Suite('Чтение')
        .add('SingleArray', function () {
            for (let i = 0; i < arrSize; i++) {
                readSingleArray.get(readSingleArray.length * Math.random() | 0);
            }
        })
        .add('VectorArray', function () {
            for (let i = 0; i < arrSize; i++) {
                readVectorArray.get(readVectorArray.length * Math.random() | 0);
            }
        })
        .add('FactorArray', function () {
            for (let i = 0; i < arrSize; i++) {
                readFactorArray.get(readFactorArray.length * Math.random() | 0);
            }
        })
        .add('MatrixArray', function () {
            for (let i = 0; i < arrSize; i++) {
                readMatrixArray.get(readMatrixArray.length * Math.random() | 0);
            }
        })
        .add('SpaceArray', function () {
            for (let i = 0; i < arrSize; i++) {
                readSpaceArray.get(readSpaceArray.length * Math.random() | 0);
            }
        })
        .add('SystemArray', function () {
            for (let i = 0; i < arrSize; i++) {
                readSystemArray.get(readSystemArray.length * Math.random() | 0);
            }
        })
        .add('TypedF64Array', function () {
            for (let i = 0; i < arrSize; i++) {
                readTypedF64Array.get(readTypedF64Array.length * Math.random() | 0);
            }
        })
        .on('cycle', function (event) {
            global.gc();
            console.log('Чтение', arrSize, String(event.target));
        })
        .run();
}
