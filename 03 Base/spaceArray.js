const {BaseArray} = require("./baseArray");
const {FactorArray} = require("./factorArray");
const {VectorArray} = require("./vectorArray");

class SpaceArray extends BaseArray {
    #delta;

    constructor(initLength, delta = 100) {
        super(initLength);
        this.#delta = delta;
        // для упрощения логики пусть всегда будет хотя бы один блок
        this._array.add(new VectorArray(this.#delta));
    }

    _createInitArray(initLength) {
        this._array = new FactorArray();
    }

    _get(index) {
        const {blockIndex, itemIndex} = this._find(index);
        return this._array.get(blockIndex).get(itemIndex);
    }

    _set(value, index) {
        const {blockIndex, itemIndex} = this._find(index);
        this._array.get(blockIndex).set(value, itemIndex);
    }

    _add(value, index) {
        let {blockIndex, itemIndex} = this._find(index);
        let block = this._array.get(blockIndex);

        if (block.length === this.#delta) {
            this._divideBlock(blockIndex);
            ({blockIndex, itemIndex} = this._find(index));
            block = this._array.get(blockIndex);
        }

        block.add(value, itemIndex);
    }

    _remove(index) {
        const {blockIndex, itemIndex} = this._find(index);
        let block = this._array.get(blockIndex);

        block.remove(itemIndex);
        // удаляем все пустые блоки, кроме случая, когда остался один блок
        if (block.length === 0 && this._array.length > 1) {
            this._array.remove(blockIndex);
        }
    }

    _find(index) {
        const lastBlock = this._array.get(this._array.length - 1);
        if (this.length - index <= lastBlock.length) {
            return {
                blockIndex: this._array.length - 1,
                itemIndex: index - (this.length - lastBlock.length)
            };
        }

        for (let i = 0; ; i++) {
            const block = this._array.get(i);
            if (index < block.length) {
                return {
                    blockIndex: i,
                    itemIndex: index
                };
            } else {
                index -= block.length;
            }
        }
    }

    _divideBlock(blockIndex) {
        const block = this._array.get(blockIndex);

        const newBlock = new VectorArray(this.#delta);
        this._array.add(newBlock, blockIndex + 1);

        const count = this.#delta / 2 | 0;
        for (let i = 0; i < count; i++) {
            const item = block.remove(block.length - 1);
            newBlock.add(item, 0);
        }
    }
}

exports.SpaceArray = SpaceArray;
