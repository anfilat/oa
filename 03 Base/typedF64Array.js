const {BaseArray} = require("./baseArray");

class TypedF64Array extends BaseArray {
    constructor(initLength) {
        super(initLength || 4);
    }

    _createInitArray(initLength) {
        this._array = new Float64Array(initLength);
    }

    _newArray() {
        return new Float64Array(this.length * 2);
    }

    _insert(value, index) {
        if (index < this.length) {
            this._array.copyWithin(index + 1, index, this.length);
        }
        this._array[index] = value;
    }

    _remove(index) {
        if (index < this.length - 1) {
            this._array.copyWithin(index, index + 1, this.length);
        }
    }
}

exports.TypedF64Array = TypedF64Array;
