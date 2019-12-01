const fs = require('fs');
const {mergeSort} = require('./mergeSort');

const maxNumber = 2 ** 16;
const bytesPerElement = Uint16Array.BYTES_PER_ELEMENT;

function createFile(name, size, chunkSize) {
    const buffer = new Uint16Array(chunkSize);

    const fd = fs.openSync(name, 'w');

    while (size > 0) {
        const len = Math.min(chunkSize, size);
        size -= len;

        for (let i = 0; i < len; i++) {
            buffer[i] = Math.floor(maxNumber * Math.random());
        }

        fs.writeSync(fd, buffer, 0, len * bytesPerElement);
    }

    fs.closeSync(fd);
}

function isSortedFile(name, chunkSize) {
    let result = true;
    const buffer = new Uint16Array(chunkSize);

    const fd = fs.openSync(name, 'r');

    let readNumbers = readChunk();
    let last = buffer[0];

    nosorted:
    while (readNumbers > 0) {
        for (let i = 0; i < readNumbers; i++) {
            const value = buffer[i];
            if (value < last) {
                result = false;
                break nosorted;
            }
            last = value;
        }

        readNumbers = readChunk();
    }

    fs.closeSync(fd);

    return result;

    function readChunk() {
        return fs.readSync(fd, buffer, 0, chunkSize * bytesPerElement) / bytesPerElement;
    }
}

function sortInMemory(name, m = 0) {
    const buf = fs.readFileSync(name);
    const buffer = new Uint16Array(buf.buffer, 0, buf.byteLength / bytesPerElement);

    mergeSort(buffer, m);

    fs.writeFileSync(name, buffer);
}

module.exports = {
    createFile,
    isSortedFile,
    sortInMemory,
};
