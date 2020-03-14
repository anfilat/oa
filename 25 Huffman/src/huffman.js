const { Queue } = require('base/queue');

// возвращает data, сжатый кодом Хоффмана
// data - Uint8Array
function encode(data) {
    if (data.length === 0) {
        return new Uint8Array(0);
    }

    const weights = calcWeights(data);
    const codes = buildCodes(buildHuffmanTree(weights));

    return toEncoded(data, weights, codes);
}

// разжимает обратно
function decode(data) {
    if (data.length === 0) {
        return new Uint8Array(0);
    }

    const weightsLength = data[0] || 256;
    const offset = 1 + weightsLength * 2;
    const weights = decodeWeights(data.subarray(1, offset));
    const hTree = buildHuffmanTree(weights);

    return toDecoded(data.subarray(offset), hTree);
}

// возвращает массив длиной 256. Каждый элемент массива содержит вес символа совпадающего с номером элемента
function calcWeights(data) {
    const counts = new Float64Array(256);

    for (let i = 0; i < data.length; i++) {
        counts[data[i]]++;
    }
    const max = counts.reduce((max, value) => Math.max(max, value), 0);

    // нормализация
    const result = [];
    counts.forEach(value => {
        result.push(Math.ceil(255 * value / max));
    });

    return result;
}

// воостанавливает массив весов из таблицы в начале сжатых данных
function decodeWeights(data) {
    const result = [];

    for (let i = 0; i < 256; i++) {
        result.push(0);
    }
    for (let i = 0; i < data.length; i += 2) {
        result[data[i]] = data[i + 1];
    }

    return result;
}

// вместо очереди с приоритетами используем две обычные очереди
// первая - хранит символы, отсортированные по возростанию веса
// вторая - хранит деревья
function buildHuffmanTree(weights) {
    const symbolQueue = buildSymbolQueue(weights);

    // в данных присутствует только один символ
    if (symbolQueue.length === 1) {
        return symbolQueue.dequeue();
    }

    const treeQueue = new Queue();
    while (symbolQueue.length + treeQueue.length > 1) {
        // берем узел с наименьшим весом из двух очередей, с приоритетом у очереди отдельных символов
        let symbolWeight = symbolQueue.length > 0
            ? symbolQueue.head.weight
            : Number.POSITIVE_INFINITY;
        let treeWeight = treeQueue.length > 0
            ? treeQueue.head.weight
            : Number.POSITIVE_INFINITY;
        const tree0 = symbolWeight <= treeWeight
            ? symbolQueue.dequeue()
            : treeQueue.dequeue();

        // берем второй узел
        symbolWeight = symbolQueue.length > 0
            ? symbolQueue.head.weight
            : Number.POSITIVE_INFINITY;
        treeWeight = treeQueue.length > 0
            ? treeQueue.head.weight
            : Number.POSITIVE_INFINITY;
        const tree1 = symbolWeight <= treeWeight
            ? symbolQueue.dequeue()
            : treeQueue.dequeue();

        treeQueue.enqueue(new Node(tree0, tree1));
    }

    return treeQueue.dequeue();
}

// строит очередь символов по приоритетам. Чем более редкий символ, тем больше его приоритет
function buildSymbolQueue(weights) {
    const leafs = [];

    weights.forEach((weight, symbol) => {
        if (weight !== 0) {
            leafs.push(new Leaf(symbol, weight));
        }
    });
    leafs.sort((a, b) => a.weight - b.weight);

    const result = new Queue();
    leafs.forEach(leaf => result.enqueue(leaf));

    return result;
}

function buildCodes(hTree) {
    const codes = new Uint32Array(256);
    const lengths = new Uint8Array(256);

    if (hTree instanceof Leaf) {
        // в данных присутствует только один символ
        codes[hTree.symbol] = 0;
        lengths[hTree.symbol] = 1;
    } else {
        const stack = [{
            node: hTree,
            code: '',
            len: 0
        }];

        while (stack.length > 0) {
            const {node, code, len} = stack.pop();
            if (node instanceof Leaf) {
                codes[node.symbol] = code;
                lengths[node.symbol] = len;
            } else {
                stack.push({
                    node: node[0],
                    code: code << 1,
                    len: len + 1
                }, {
                    node: node[1],
                    code: (code << 1) + 1,
                    len: len + 1
                });
            }
        }
    }

    return {
        code: codes,
        len: lengths,
    };
}

const growFactor = 4 * 1024 * 1024;

function toEncoded(data, weights, codes) {
    let result = new Uint8Array(growFactor);

    let offset = copyWeightsToResult(result, weights);
    // сколько бит в последнем байте
    const lastBitsOffset = offset;
    offset++;

    let buffer = 0;
    let bufferOffset = 31;
    data.forEach(symbol => {
        // берем очередной код и его длину
        let code = codes.code[symbol];
        let len = codes.len[symbol];

        // кладем в 32-битный буфер
        buffer = buffer | (code << (bufferOffset - len + 1));
        bufferOffset -= len;

        // если массив с результатом почти заполнен, то увеличиваем его
        if (result.length - offset <= 4) {
            const newResult = new Uint8Array(result.length + growFactor);
            newResult.set(result);
            result = newResult;
        }

        // если есть полностью заполненный байт в буфере, то кладем его в результат
        while (bufferOffset < 24) {
            result[offset++] = (buffer & 0xff000000) >> 24;
            buffer = (buffer & 0xffffff) << 8;
            bufferOffset += 8;
        }
    });
    // добавляем последний, неполный байт
    if (bufferOffset !== 31) {
        result[offset++] = (buffer & 0xff000000) >> 24;
        result[lastBitsOffset] = 31 - bufferOffset;
    }

    return result.subarray(0, offset);
}

function copyWeightsToResult(result, weights) {
    let offset = 1;

    weights.forEach((weight, symbol) => {
        if (weight !== 0) {
            result[offset++] = symbol;
            result[offset++] = weight;
        }
    });
    result[0] = (offset - 1) / 2;

    return offset;
}

function toDecoded(data, hTree) {
    const lastBits = data[0];
    let bits = lastBits
        ? (data.length - 2) * 8 + lastBits
        : (data.length - 1) * 8;

    // особый случай - строка из повторяющегося одного символа
    if (hTree instanceof Leaf) {
        return new Uint8Array(bits).fill(hTree.symbol);
    }

    let result = new Uint8Array(growFactor);
    let offsetResult = 0;

    let offsetData = 1;
    let byte = 0;
    let offsetInByte = -1;
    let node = hTree;

    while (bits > 0) {
        if (offsetInByte === -1) {
            byte = data[offsetData++];
            offsetInByte = 7;
        }
        const bit = getBit(byte, offsetInByte--);
        bits--;
        node = bit ? node[1] : node[0];
        if (node instanceof Leaf) {
            // если массив с результатом заполнен, то увеличиваем его
            if (result.length === offsetResult) {
                const newResult = new Uint8Array(result.length + growFactor);
                newResult.set(result);
                result = newResult;
            }
            // очередной символ в результат
            result[offsetResult++] = node.symbol;
            // начинаем декодировать следующий символ
            node = hTree;
        }
    }

    return result.subarray(0, offsetResult);
}

function getBit(byte, offset) {
    switch (offset) {
        case 0:
            return byte & 0b1;
        case 1:
            return (byte & 0b10) >> 1;
        case 2:
            return (byte & 0b100) >> 2;
        case 3:
            return (byte & 0b1000) >> 2;
        case 4:
            return (byte & 0b10000) >> 2;
        case 5:
            return (byte & 0b100000) >> 2;
        case 6:
            return (byte & 0b1000000) >> 2;
        case 7:
            return (byte & 0b10000000) >> 2;
    }
}

// листья дерева Хоффмана
function Leaf(symbol, weight) {
    this.symbol = symbol;
    this.weight = weight;
}

function Node(tree0, tree1) {
    this[0] = tree0;
    this[1] = tree1;
    this.weight = tree0.weight + tree1.weight;
}

module.exports = {
    encode,
    decode,
};
