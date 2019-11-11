class BaseArray {
    _array;
    _length;

    constructor(initLength = 0) {
        if (new.target === BaseArray) {
            throw new Error(`Don't use BaseArray directly`);
        }
        this._createInitArray(initLength);
        this._length = 0;
    }

    _createInitArray(initLength) {
        this._array = new Array(initLength);
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
        const value = this.get(index);
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
        if (this._isArrayFull()) {
            const newArray = this._newArray();
            this._moveToNewArray(newArray, value, index);
            this._array = newArray;
        } else {
            this._insert(value, index);
        }
    }

    _isArrayFull() {
        return this.length === this._array.length;
    }

    // for override in descendant
    _newArray() {
    }

    _moveToNewArray(newArray, value, index) {
        for (let i = 0; i < index; i++) {
            newArray[i] = this._array[i];
        }
        newArray[index] = value;
        for (let i = index; i < this.length; i++) {
            newArray[i + 1] = this._array[i];
        }
    }

    _insert(value, index) {
        for (let i = this.length; i > index; i--) {
            this._array[i] = this._array[i - 1];
        }
        this._array[index] = value;
    }

    _remove(index) {
        for (let i = index; i < this.length - 1; i++) {
            this._array[i] = this._array[i + 1];
        }
    }
}

exports.BaseArray = BaseArray;
