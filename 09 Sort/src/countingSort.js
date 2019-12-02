const fs = require('fs');

const bytesPerElement = Uint16Array.BYTES_PER_ELEMENT;

// сортировка подсчетом файла с 16-битными числами
function countingSort(name, chunkSize) {
    const counts = readUnsortedFile(name, chunkSize);
    writeSortedFile(name, chunkSize, counts);
}

function readUnsortedFile(name, chunkSize) {
    const buffer = new Uint16Array(chunkSize);
    const counts = new Uint16Array(2 ** 16);
    const fd = fs.openSync(name, 'r');

    let readNumbers = readChunk();
    while (readNumbers > 0) {
        for (let i = 0; i < readNumbers; i++) {
            const value = buffer[i];
            counts[value]++;
        }

        readNumbers = readChunk();
    }

    fs.closeSync(fd);

    return counts;

    function readChunk() {
        return fs.readSync(fd, buffer, 0, chunkSize * bytesPerElement) / bytesPerElement;
    }
}

function writeSortedFile(name, chunkSize, counts) {
    const buffer = new Uint16Array(chunkSize);

    const fd = fs.openSync(name, 'w');

    let index = 0;
    for (let value = 0; value < counts.length; value++) {
        let count = counts[value];
        while (count > 0) {
            buffer[index] = value;
            index++;

            // запись заполненного чанка
            if (index === chunkSize) {
                fs.writeSync(fd, buffer, 0, index * bytesPerElement);
                index = 0;
            }

            count--;
        }
    }
    if (index > 0) {
        fs.writeSync(fd, buffer, 0, index * bytesPerElement);
    }

    fs.closeSync(fd);
}

exports.countingSort = countingSort;
