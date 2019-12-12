const fs = require('fs');

function readTest() {
    const inPar = readFile('./test/sum.in');
    const outPar = readFile('./test/sum.out');

    return [
        toLines(inPar),
        toLines(outPar)
    ];
}

function readFile(name) {
    return fs.readFileSync(name, {encoding: 'utf8'});
}

function toLines(str) {
    const lines = str.split('\n');
    while (lines.length > 1 && !lines[lines.length - 1]) {
        lines.pop();
    }
    return lines;
}

exports.readTest = readTest;
