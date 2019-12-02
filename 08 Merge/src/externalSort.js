const fs = require('fs');
const {mergeSort} = require('./mergeSort');
const {PriorityQueueMin} = require('./priorityQueueMin');

const bytesPerElement = Uint16Array.BYTES_PER_ELEMENT;
// какими кусками файл читается и записывается при слиянии всех отсортированных чанков
const mergeChunkSize = 64 * 1024;

// внешняя сортировка, в два этапа
// на первом этапе файл разбивается на чанки размера chunkSize, каждый из них сортируется
// и записывается назад в тот же файл
// на втором этапе все чанки сливаются во временный файл, затем временный файл записывается на место исходного
// для слияния чанков используется очередь с приоритетами
function externalSort(name, m = 0, chunkSize) {
    const size = getSize();
    const tempFile = name + '.tmp';

    sortChunks(size);
    mergeChunksToTempFile(size);
    moveTempFile();


    function getSize() {
        return fs.statSync(name).size / bytesPerElement;
    }

    function sortChunks(size) {
        const buffer = new Uint16Array(chunkSize);
        let readPos = 0;
        let writePos = 0;

        const fd = fs.openSync(name, 'r+');

        while (size > 0) {
            const len = Math.min(chunkSize, size);
            size -= len;

            fs.readSync(fd, buffer, 0, len * bytesPerElement, readPos * bytesPerElement);
            mergeSort(buffer.subarray(0, len), m);
            fs.writeSync(fd, buffer, 0, len * bytesPerElement, writePos * bytesPerElement);
            readPos += len;
            writePos += len;
        }

        fs.closeSync(fd);
    }

    function mergeChunksToTempFile(size) {
        const fdRead = fs.openSync(name, 'r');
        const fdWrite = fs.openSync(tempFile, 'w');

        const queue = createQueue(fdRead, size);

        const buffer = new Uint16Array(mergeChunkSize);
        let index = 0;

        while (!queue.isEmpty()) {
            const value = queue.dequeue();

            buffer[index] = value.key;
            index++;

            // запись заполненного чанка
            if (index === mergeChunkSize) {
                fs.writeSync(fdWrite, buffer, 0, index * bytesPerElement);
                index = 0;
            }

            updateQueue(queue, value);
        }
        if (index > 0) {
            fs.writeSync(fdWrite, buffer, 0, index * bytesPerElement);
        }

        fs.closeSync(fdRead);
        fs.closeSync(fdWrite);
    }

    function createQueue(fdRead, size) {
        const queue = new PriorityQueueMin();

        let pos = 0;
        while (size > 0) {
            const len = Math.min(chunkSize, size);
            size -= len;

            const reader = chunkReader(fdRead, pos, len);
            const data = reader();
            pos += len;

            queue.enqueue({
                reader,
                data,
                index: 1,
                key: data[0]
            });
        }

        return queue;
    }

    function chunkReader(fd, pos, size) {
        const buffer = new Uint16Array(mergeChunkSize);

        return function next() {
            if (size === 0) {
                return null;
            }

            const len = Math.min(mergeChunkSize, size);
            size -= len;

            fs.readSync(fd, buffer, 0, len * bytesPerElement, pos * bytesPerElement);
            pos += len;

            return buffer.subarray(0, len);
        }
    }

    // положить в очередь следующее число из выбраннго чанка
    function updateQueue(queue, value) {
        if (value.index === value.data.length) {
            value.data = value.reader();
            // данных больше нет
            if (!value.data) {
                return;
            }
            value.index = 0;
        }
        value.key = value.data[value.index];
        value.index++;
        queue.enqueue(value);
    }

    function moveTempFile() {
        fs.renameSync(tempFile, name);
    }
}

exports.externalSort = externalSort;
