const {BaseArray} = require("./baseArray");

class SystemArray extends BaseArray {
    _resizeAndMoveForAdd(index) {
        for (let i = this.size(); i > index; i--) {
            this._array[i] = this._array[i - 1];
        }
    }
}

exports.SystemArray = SystemArray;
