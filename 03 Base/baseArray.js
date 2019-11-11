class BaseArray {
    _array;
    _size;

    constructor() {
        this._array = [];
        this._size = 0;
    }

    size() {
        return this._size;
    }

    add(value, index) {
        if (index === undefined) {
            index = this.size();
        }
        this._checkIndexForAdd(index);
        this._resizeAndMoveForAdd(index);
        this._size++;
        this._array[index] = value;
    }

    remove(index) {
        this._checkIndex(index);
        const value = this._array[index];
        this._moveForRemove(index);
        this._size--;
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
        if (index < 0 || index > this.size()) {
            throw new RangeError(`index ${index} out of range [0, ${this.size()}]`);
        }
    }

    _checkIndex(index) {
        if (index === undefined || index < 0 || index >= this.size()) {
            throw new RangeError(`index ${index} out of range [0, ${this.size() - 1}]`);
        }
    }

    _resizeAndMoveForAdd(index) {
        throw new Error(`Don't use BaseArray directly`);
    }

    _moveForRemove(index) {
        for (let i = index + 1; i < this.size(); i++) {
            this._array[i - 1] = this._array[i];
        }
    }
}

exports.BaseArray = BaseArray;
