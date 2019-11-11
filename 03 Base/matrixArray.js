const {BaseArray} = require("./baseArray");
const {SingleArray} = require("./singleArray");
const {VectorArray} = require("./vectorArray");

class MatrixArray extends BaseArray {
    #delta;

    constructor(initLength, delta = 100) {
        super(initLength);
        this.#delta = delta;
        if (initLength) {
            const size = Math.ceil(initLength / delta);
            for (let i = 0; i < size; i++) {
                this._array.add(new VectorArray(delta));
            }
        }
    }

    _createInitArray(initLength) {
        this._array = new SingleArray();
    }

    get(index) {
        this._checkIndex(index);
        return this._array.get(this._rowIndex(index)).get(this._colIndex(index));
    }

    set(value, index) {
        this._checkIndex(index);
        this._array.get(this._rowIndex(index)).set(value, this._colIndex(index));
    }

    _add(value, index) {
        const rowIndex = this._rowIndex(index);
        const colIndex = this._colIndex(index);

        if (this._isArrayFull()) {
            this._array.add(new VectorArray(this.#delta));
        }

        if (index === this.length) {
            this._array.get(rowIndex).add(value, colIndex);
        } else {
            const lastUsedVector = this.length / this.#delta | 0;
            for (let i = lastUsedVector; i > rowIndex; i--) {
                const item = this._array.get(i - 1).remove(this.#delta - 1);
                this._array.get(i).add(item, 0);
            }

            this._array.get(rowIndex).add(value, colIndex);
        }
    }

    _isArrayFull() {
        return this.length === this._array.length * this.#delta;
    }

    _remove(index) {
        if (index < this.length) {
            const rowIndex = this._rowIndex(index);
            const colIndex = this._colIndex(index);

            this._array.get(rowIndex).remove(colIndex);

            const lastUsedVector = (this.length - 1) / this.#delta | 0;
            for (let i = rowIndex; i < lastUsedVector; i++) {
                const item = this._array.get(i + 1).remove(0);
                this._array.get(i).add(item, this.#delta - 1);
            }
        }
    }

    _rowIndex(index) {
        return index / this.#delta | 0;
    }

    _colIndex(index) {
        return index % this.#delta;
    }
}

exports.MatrixArray = MatrixArray;
