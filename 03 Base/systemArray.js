const {BaseArray} = require("./baseArray");

class SystemArray extends BaseArray {
    _add(value, index) {
        if (index === this.length) {
            this._array[index] = value;
        } else {
            this._array.splice(index, 0, value);
        }
    }
}

exports.SystemArray = SystemArray;
