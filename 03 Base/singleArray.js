const {BaseArray} = require("./baseArray");

class SingleArray extends BaseArray {
    _newArray() {
        return new Array(this.length + 1);
    }
}

exports.SingleArray = SingleArray;
