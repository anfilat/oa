const Benchmark = require('benchmark');
const { SingleArray } = require('../singleArray');
const { VectorArray } = require('../vectorArray');
const { SystemArray } = require('../systemArray');
const { TypedF64Array } = require('../typedF64Array');

[100, 1000, 10000].map(bench);

function bench(arrSize) {
    new Benchmark.Suite('Вставка в начало')
        .add('SingleArray', function () {
            const arr = new SingleArray();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, 0);
            }
        })
        .add('VectorArray', function () {
            const arr = new VectorArray();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, 0);
            }
        })
        .add('SystemArray', function () {
            const arr = new SystemArray();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, 0);
            }
        })
        .add('TypedF64Array', function () {
            const arr = new TypedF64Array();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, 0);
            }
        })
        .on('cycle', function (event) {
            console.log('Вставка в начало', arrSize, String(event.target));
        })
        .run();

    new Benchmark.Suite('Случайная вставка')
        .add('SingleArray', function () {
            const arr = new SingleArray();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, arr.length * Math.random() | 0);
            }
        })
        .add('VectorArray', function () {
            const arr = new VectorArray();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, arr.length * Math.random() | 0);
            }
        })
        .add('SystemArray', function () {
            const arr = new SystemArray();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, arr.length * Math.random() | 0);
            }
        })
        .add('TypedF64Array', function () {
            const arr = new TypedF64Array();
            for (let i = 0; i < arrSize; i++) {
                arr.add(0, arr.length * Math.random() | 0);
            }
        })
        .on('cycle', function (event) {
            console.log('Случайная вставка', arrSize, String(event.target));
        })
        .run();

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
            console.log('Случайная вставка без роста', arrSize, String(event.target));
        })
        .run();

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
            console.log('Вставка в конец', arrSize, String(event.target));
        })
        .run();

    const readSingleArray = new SingleArray();
    for (let i = 0; i < arrSize; i++) {
        readSingleArray.add(0);
    }

    const readVectorArray = new VectorArray();
    for (let i = 0; i < arrSize; i++) {
        readVectorArray.add(0);
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
            console.log('Чтение', arrSize, String(event.target));
        })
        .run();
}
