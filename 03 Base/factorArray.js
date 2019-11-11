const {BaseArray} = require("./baseArray");

class FactorArray extends BaseArray {
    #factor;

    constructor(initLength, factor = 100) {
        super(initLength || 4);
        this.#factor = factor;
    }

    _newArray() {
        return new Array(this.length + this.length * this.#factor / 100 | 0);
    }
}

exports.FactorArray = FactorArray;
