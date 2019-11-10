class SingleArray {
    #array;
    #size;

    constructor() {
        this.#array = [];
        this.#size = 0;
    }

    size() {
        return this.#size;
    }

    add(value, index) {
        if (index === undefined) {
            index = this.size();
        }
        this._checkIndexForAdd(index);
        this._resizeForAdd(index);
        this.#size++;
        this.#array[index] = value;
    }

    remove(index) {
        this._checkIndex(index);
        const value = this.#array[index];
        this._resizeForRemove(index);
        this.#size--;
        return value;
    }

    get(index) {
        this._checkIndex(index);
        return this.#array[index];
    }

    set(value, index) {
        this._checkIndex(index);
        this.#array[index] = value;
    }

    _checkIndexForAdd(index) {
        if (index < 0 || index > this.size()) {
            throw new RangeError(`index ${index} out of range [0, ${this.size()}]`);
        }
    }

    _checkIndex(index) {
        if (index === undefined || index < 0 || index >= this.size()) {
            throw new RangeError(`index ${index} out of range [0, ${this.size() - 1}]`);
        }
    }

    _resizeForAdd(index) {
        const newArray = new Array(this.size() + 1);
        for (let i = 0; i < index; i++) {
            newArray[i] = this.#array[i];
        }
        for (let i = this.size(); i > index; i--) {
            newArray[i] = this.#array[i - 1];
        }
        this.#array = newArray;
    }

    _resizeForRemove(index) {
        const newArray = new Array(this.size() - 1);
        for (let i = 0; i < index; i++) {
            newArray[i] = this.#array[i];
        }
        for (let i = index + 1; i < this.size(); i++) {
            newArray[i - 1] = this.#array[i];
        }
        this.#array = newArray;
    }
}

exports.SingleArray = SingleArray;
