const {BaseArray} = require("./baseArray");

class VectorArray extends BaseArray {
    #delta;

    constructor(initLength = 0, delta = 10) {
        super(initLength);
        this.#delta = delta;
    }

    _newArray() {
        return new Array(this.length + this.#delta);
    }
}

exports.VectorArray = VectorArray;
