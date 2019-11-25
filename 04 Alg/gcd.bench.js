const Benchmark = require('benchmark');
const {gcdMinus, gcdDiv, gcdBinary} = require('./gcd');

new Benchmark.Suite('gcd minus')
    .add('1234567890, 12345', function () {
        gcdMinus(1234567890, 12345);
    })
    .add('1234567890, 123456789', function () {
        gcdMinus(1234567890, 123456789);
    })
    .add('1234567800, 100', function () {
        gcdMinus(1234567800, 100)
    })
    .add('1234567800, 10', function () {
        gcdMinus(1234567800, 10)
    })
    .add('1234567800, 1', function () {
        gcdMinus(1234567800, 1)
    })
    .add('3221225469, 3', function () {
        gcdMinus(1610612733, 3)
    })
    .on('cycle', function (event) {
        console.log('gcd minus', String(event.target));
    })
    .run();

new Benchmark.Suite('gcd div')
    .add('1234567890, 12345', function () {
        gcdDiv(1234567890, 12345);
    })
    .add('1234567890, 123456789', function () {
        gcdDiv(1234567890, 123456789);
    })
    .add('1234567800, 100', function () {
        gcdDiv(1234567800, 100)
    })
    .add('1234567800, 10', function () {
        gcdDiv(1234567800, 10)
    })
    .add('1234567800, 1', function () {
        gcdDiv(1234567800, 1)
    })
    .add('3221225469, 3', function () {
        gcdDiv(1610612733, 3)
    })
    .on('cycle', function (event) {
        console.log('gcd div', String(event.target));
    })
    .run();

// worst case (v' = v*2 + 3, 3) == (1610612733, 3)
// https://stackoverflow.com/questions/42681324/what-is-the-worst-case-input-for-steins-algorithm
new Benchmark.Suite('gcd binary')
    .add('1234567890, 12345', function () {
        gcdBinary(1234567890, 12345);
    })
    .add('1234567890, 123456789', function () {
        gcdBinary(1234567890, 123456789);
    })
    .add('1234567800, 100', function () {
        gcdBinary(1234567800, 100)
    })
    .add('1234567800, 10', function () {
        gcdBinary(1234567800, 10)
    })
    .add('1234567800, 1', function () {
        gcdBinary(1234567800, 1)
    })
    .add('3221225469, 3', function () {
        gcdBinary(1610612733, 3)
    })
    .on('cycle', function (event) {
        console.log('gcd binary', String(event.target));
    })
    .run();
