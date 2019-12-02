const fs = require('fs');

const bytesPerElement = Uint16Array.BYTES_PER_ELEMENT;
const maxNumber = 2 ** 16;

// создает файл со случайными 16-битными числами
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

// проверяет, что файл содержит отсортированные 16-битные числа
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

module.exports = {
    createFile,
    isSortedFile,
};
