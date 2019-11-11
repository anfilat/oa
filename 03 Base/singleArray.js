const {BaseArray} = require("./baseArray");

class SingleArray extends BaseArray {
    _resizeAndMoveForAdd(index) {
        const newArray = new Array(this.size() + 1);

        for (let i = 0; i < index; i++) {
            newArray[i] = this._array[i];
        }

        for (let i = this.size(); i > index; i--) {
            newArray[i] = this._array[i - 1];
        }

        this._array = newArray;
    }
}

exports.SingleArray = SingleArray;
