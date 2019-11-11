const {BaseArray} = require("./baseArray");

class SingleArray extends BaseArray {
    _createInitArray(initLength) {
        this._array = new Array(0);
    }

    _newArray() {
        return new Array(this.length + 1);
    }

    _remove(index) {
        const newArray = new Array(this.length - 1);

        for (let i = 0; i < index; i++) {
            newArray[i] = this._array[i];
        }
        for (let i = index; i < this.length - 1; i++) {
            newArray[i] = this._array[i + 1];
        }

        this._array = newArray;
    }
}

exports.SingleArray = SingleArray;
