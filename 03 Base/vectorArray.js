const {BaseArray} = require("./baseArray");

class VectorArray extends BaseArray {
    #delta;

    constructor(delta = 10) {
        super();
        this.#delta = delta;
    }

    _resizeAndMoveForAdd(index) {
        let newArray;

        if (this.size() === this._array.length) {
            newArray = new Array(this.size() + this.#delta);

            for (let i = 0; i < index; i++) {
                newArray[i] = this._array[i];
            }
        } else {
            newArray = this._array;
        }

        for (let i = this.size(); i > index; i--) {
            newArray[i] = this._array[i - 1];
        }

        this._array = newArray;
    }
}

exports.VectorArray = VectorArray;
