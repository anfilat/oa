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
    function onStart(ctor) {
        return function() {
            this.in = {
                ctor,
                arrSize
            }
        };
    }

    function setup() {
        if (!this.data) {
            this.data = [];
        }
        for (let c = 0; c < this.count; c++) {
            const arr = new this.in.ctor();
            for (let i = 0; i < this.in.arrSize; i++) {
                arr.add(0);
            }
            this.data.push(arr);
        }
    }

    function options(ctor) {
        return {
            onStart: onStart(ctor),
            setup
        };
    }

    new Benchmark.Suite('Случайное удаление')
        .add('SingleArray', function () {
            const arr = this.data.pop();
            for (let i = 0; i < arrSize; i++) {
                arr.remove(0, arr.length * Math.random() | 0);
            }
        }, options(SingleArray))
        .add('VectorArray', function () {
            const arr = this.data.pop();
            for (let i = 0; i < arrSize; i++) {
                arr.remove(0, arr.length * Math.random() | 0);
            }
        }, options(VectorArray))
        .add('FactorArray', function () {
            const arr = this.data.pop();
            for (let i = 0; i < arrSize; i++) {
                arr.remove(0, arr.length * Math.random() | 0);
            }
        }, options(FactorArray))
        .add('MatrixArray', function () {
            const arr = this.data.pop();
            for (let i = 0; i < arrSize; i++) {
                arr.remove(0, arr.length * Math.random() | 0);
            }
        }, options(MatrixArray))
        .add('SpaceArray', function () {
            const arr = this.data.pop();
            for (let i = 0; i < arrSize; i++) {
                arr.remove(0, arr.length * Math.random() | 0);
            }
        }, options(SpaceArray))
        .add('SystemArray', function () {
            const arr = this.data.pop();
            for (let i = 0; i < arrSize; i++) {
                arr.remove(0, arr.length * Math.random() | 0);
            }
        }, options(SystemArray))
        .add('TypedF64Array', function () {
            const arr = this.data.pop();
            for (let i = 0; i < arrSize; i++) {
                arr.remove(0, arr.length * Math.random() | 0);
            }
        }, options(TypedF64Array))
        .on('cycle', function (event) {
            global.gc();
            console.log('Случайное удаление', arrSize, String(event.target));
        })
        .run();
}
