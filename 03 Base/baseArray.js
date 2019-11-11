class BaseArray {
    _array;
    _length;

    constructor(initLength = 0) {
        this._array = new Array(initLength);
        this._length = 0;
    }

    get length() {
        return this._length;
    }

    add(value, index) {
        if (index === undefined) {
            index = this.length;
        }
        this._checkIndexForAdd(index);
        this._add(value, index);
        this._length++;
    }

    remove(index) {
        this._checkIndex(index);
        const value = this._array[index];
        this._remove(index);
        this._length--;
        return value;
    }

    get(index) {
        this._checkIndex(index);
        return this._array[index];
    }

    set(value, index) {
        this._checkIndex(index);
        this._array[index] = value;
    }

    _checkIndexForAdd(index) {
        if (index < 0 || index > this.length) {
            throw new RangeError(`index ${index} out of range [0, ${this.length}]`);
        }
    }

    _checkIndex(index) {
        if (index === undefined || index < 0 || index >= this.length) {
            throw new RangeError(`index ${index} out of range [0, ${this.length - 1}]`);
        }
    }

    _add(value, index) {
        if (this.length === this._array.length) {
            const newArray = this._newArray();
            this._moveToNewArray(newArray, value, index);
        } else if (index === this.length) {
            this._array[index] = value;
        } else {
            this._array.splice(index, 0, value);
        }
    }

    _newArray() {
        throw new Error(`Don't use BaseArray directly`);
    }

    _moveToNewArray(newArray, value, index) {
        for (let i = 0; i < index; i++) {
            newArray[i] = this._array[i];
        }
        newArray[index] = value;
        for (let i = this.length; i > index; i--) {
            newArray[i] = this._array[i - 1];
        }

        this._array = newArray;
    }

    _remove(index) {
        if (index < this.length) {
            this._array.splice(index, 1);
        }
    }
}

exports.BaseArray = BaseArray;
