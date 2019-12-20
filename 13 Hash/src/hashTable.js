const {TextEncoder} = require('util');

// сохраняет API встроенного Map
// в bucket последовательно кладутся два значения key и value
class HashTable {
    constructor(initialCapacity = 7) {
        this._count = 0;
        this._buckets = this._createBuckets(initialCapacity);
        this._enc = new TextEncoder();
    }

    get size() {
        return this._count;
    }

    set(key, value) {
        const {bucket, index} = this._search(key);
        if (index === -1) {
            this._count++;
            bucket.push(key, value);

            if (this._shouldRehash()) {
                this._rehash();
            }
        } else {
            bucket[index + 1] = value;
        }
        return this;
    }

    delete(key) {
        const {bucket, index} = this._search(key);
        if (index !== -1) {
            this._count--;
            bucket.splice(index, 2);
            return true;
        }
        return false;
    }

    get(key) {
        const {bucket, index} = this._search(key);
        return index !== -1 ? bucket[index + 1] : undefined;
    }

    has(key) {
        const {index} = this._search(key);
        return index !== -1;
    }

    _rehash() {
        const oldBuckets = this._buckets;
        const newBuckets = this._createBuckets(oldBuckets.length * 2);

        for (let i = 0; i < this._buckets.length; i++) {
            const bucket = oldBuckets[i];
            for (let j = 0; j < bucket.length; j += 2) {
                const key = bucket[j];
                const value = bucket[j + 1];
                const keyHash = this._hash(key);
                const index = keyHash % newBuckets.length;
                newBuckets[index].push(key, value);
            }
        }
        this._buckets = newBuckets;
    }

    _shouldRehash() {
        const load = this._count / this._buckets.length;
        return load >= 6;
    }

    _createBuckets(size) {
        const table = [];
        for (let i = 0; i < size; i += 1) {
            table.push([]);
        }
        return table;
    }

    _search(key) {
        const bucket = this._getBucket(key);
        for (let index = 0; index < bucket.length; index += 2) {
            if (Object.is(key, bucket[index])) {
                return {bucket, index};
            }
        }
        return {bucket, index: -1};
    }

    _getBucket(key) {
        const keyHash = this._hash(key);
        const index = keyHash % this._buckets.length;
        return this._buckets[index];
    }

    _hash(key) {
        const str = this._toString(key);
        const data = this._enc.encode(str);

        // FNV Hash
        let hash = 0x811c9dc5;
        for (let i = 0; i < data.length; ++i) {
            hash ^= data[i];
            hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
        }
        return hash >>> 0;
    }

    _toString(value) {
        const type = typeof value;
        if (type === 'string') {
            return value;
        } else if (type === 'number' || type === 'boolean' || type === 'function') {
            return value.toString();
        }
        return JSON.stringify(value);
    }
}

module.exports = HashTable;
