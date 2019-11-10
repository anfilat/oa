const Benchmark = require('benchmark');
const { SingleArray } = require('../singleArray');
const { SystemArray } = require('../systemArray');

const arrSize = 10000;

new Benchmark.Suite('Вставка в начало')
    .add('SingleArray', function() {
        const arr = new SingleArray();
        for (let i = 0; i < arrSize; i++) {
            arr.add(0, 0);
        }
    })
    .add('SystemArray', function() {
        const arr = new SystemArray();
        for (let i = 0; i < arrSize; i++) {
            arr.add(0, 0);
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .run();

new Benchmark.Suite('Случайная вставка')
    .add('SingleArray', function() {
        const arr = new SingleArray();
        for (let i = 0; i < arrSize; i++) {
            arr.add(0, arr.size() * Math.random() | 0);
        }
    })
    .add('SystemArray', function() {
        const arr = new SystemArray();
        for (let i = 0; i < arrSize; i++) {
            arr.add(0, arr.size() * Math.random() | 0);
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .run();

new Benchmark.Suite('Вставка в конец')
    .add('SingleArray', function() {
        const arr = new SingleArray();
        for (let i = 0; i < arrSize; i++) {
            arr.add(0, arr.size());
        }
    })
    .add('SystemArray', function() {
        const arr = new SystemArray();
        for (let i = 0; i < arrSize; i++) {
            arr.add(0, arr.size());
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .run();
