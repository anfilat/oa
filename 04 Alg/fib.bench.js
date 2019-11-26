const Benchmark = require('benchmark');
const {fibRec, fibIter, fibIterBig, fibGoldenSection, fibMatrix} = require('./fib');

new Benchmark.Suite('fib')
    .add('fibRec 10', function () {
        fibRec(10);
    })
    .add('fibRec 30', function () {
        fibRec(30);
    })
    .add('fibIter 10', function () {
        fibIter(10);
    })
    .add('fibIter 30', function () {
        fibIter(30);
    })
    .add('fibIter 75', function () {
        fibIter(75);
    })
    .add('fibIterBig 10', function () {
        fibIterBig(10);
    })
    .add('fibIterBig 30', function () {
        fibIterBig(30);
    })
    .add('fibIterBig 75', function () {
        fibIterBig(75);
    })
    .add('fibIterBig 90', function () {
        fibIterBig(90);
    })
    .add('fibIterBig 300', function () {
        fibIterBig(300);
    })
    .add('fibGoldenSection 10', function () {
        fibGoldenSection(10);
    })
    .add('fibGoldenSection 30', function () {
        fibGoldenSection(30);
    })
    .add('fibGoldenSection 75', function () {
        fibGoldenSection(75);
    })
    .add('fibMatrix 10', function () {
        fibMatrix(10);
    })
    .add('fibMatrix 30', function () {
        fibMatrix(30);
    })
    .add('fibMatrix 75', function () {
        fibMatrix(75);
    })
    .on('cycle', function (event) {
        console.log('fib', String(event.target));
    })
    .run();
