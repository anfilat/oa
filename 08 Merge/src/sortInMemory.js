const fs = require('fs');
const {mergeSort} = require('./mergeSort');

const bytesPerElement = Uint16Array.BYTES_PER_ELEMENT;

// сортирует файл, полностью загружая его в память
function sortInMemory(name, m = 0) {
    const buf = fs.readFileSync(name);
    const buffer = new Uint16Array(buf.buffer, 0, buf.byteLength / bytesPerElement);

    mergeSort(buffer, m);

    fs.writeFileSync(name, buffer);
}

exports.sortInMemory = sortInMemory;
