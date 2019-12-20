const {TextEncoder} = require('util');

const p = 4294967311; // первое простое число большее 2^32

// сохраняет API встроенного Map
// в bucket последовательно кладутся два значения key и value
class HashTable {
    constructor(initialCapacity = 7) {
        this._count = 0;
        this._buckets = this._createBuckets(initialCapacity);
        this._enc = new TextEncoder();
        // параметры для универсальной хеш-функции h(k)=((a*k + b) mod p) mod m)
        // a и b должны быть меньше p
        // a не должно быть равно нулю
        // чтобы a*k не выходило за Number.MAX_SAFE_INTEGER, ограничим a и b 2^16
        this._a = Math.floor(1 + Math.random() * 2 ** 16);
        this._b = Math.floor(Math.random() * 2 ** 16);
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
                const index = this._getBucketIndex(key, newBuckets.length);
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
        const ind = this._getBucketIndex(key, this._buckets.length);
        const bucket = this._buckets[ind];
        for (let index = 0; index < bucket.length; index += 2) {
            if (Object.is(key, bucket[index])) {
                return {bucket, index};
            }
        }
        return {bucket, index: -1};
    }

    _getBucketIndex(key, m) {
        const keyHash = this._hash(key);
        return (this._a * keyHash + this._b) % p % m;
    }

    _hash(key) {
        const str = this._toString(key);
        const data = this._enc.encode(str);

        let hash = 0;
        for (let i = 0; i < data.length; ++i) {
            hash = (hash * 31 + data[i]) >>> 0;
        }
        return hash;
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
