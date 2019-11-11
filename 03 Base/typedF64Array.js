const {BaseArray} = require("./baseArray");

class TypedF64Array extends BaseArray {
    constructor(initLength) {
        super(initLength || 4, Float64Array);
    }

    _add(value, index) {
        if (this.length === this._array.length) {
            const newArray = new Float64Array(this.length * 2);
            this._moveToNewArray(newArray, value, index);
        } else {
            if (index < this.length) {
                this._array.copyWithin(index + 1, index, this.length);
            }
            this._array[index] = value;
        }
    }

    _remove(index) {
        this._array.copyWithin(index, index + 1, this.length);
    }
}

exports.TypedF64Array = TypedF64Array;
