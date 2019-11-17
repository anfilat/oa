const fs = require('fs');
const path = require('path');

function readCases(dirName) {
    return getCaseNames(dirName)
        .map(name => {
            const inPar = readFile(path.join(dirName, name + '.in'));
            const outPar = readFile(path.join(dirName, name + '.out'));

            return [
                toLines(inPar),
                toLines(outPar)
            ];
        });
}

function getCaseNames(dirName) {
    return fs
        .readdirSync(dirName)
        .filter(name => name.endsWith('in'))
        .map(name => name.substr(0, name.length - 3));
}

function readFile(name) {
    return fs.readFileSync(name, {encoding: 'utf8'});
}

function toLines(str) {
    const lines = str.split('\n');
    if (str.endsWith('\n')) {
        lines.pop();
    }
    return lines;
}

exports.readCases = readCases;
