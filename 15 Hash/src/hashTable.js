const {TextEncoder} = require('util');

const p = 4294967311; // первое простое число большее 2^32

// в bucket последовательно кладутся два значения key и value
class IdealHashTable {
    constructor(values = []) {
        this._count = 0;
        this._buckets = this._createBuckets(values.length);
        this._enc = new TextEncoder();
        // параметры для универсальной хеш-функции h(k)=((a*k + b) mod p) mod m)
        // a и b должны быть меньше p
        // a не должно быть равно нулю
        // чтобы a*k не выходило за Number.MAX_SAFE_INTEGER, ограничим a и b 2^16
        this._a = Math.floor(1 + Math.random() * 2 ** 16);
        this._b = Math.floor(Math.random() * 2 ** 16);

        this._insertValues(values);
        this._toIdeal();
    }

    get size() {
        return this._count;
    }

    get(key) {
        const {value, index} = this._searchIdeal(key);
        return index !== -1 ? value : undefined;
    }

    has(key) {
        const {index} = this._searchIdeal(key);
        return index !== -1;
    }

    _createBuckets(size) {
        const table = [];
        for (let i = 0; i < size; i += 1) {
            table.push([]);
        }
        return table;
    }

    _insertValues(values) {
        for (let i = 0; i < values.length; i++) {
            const [key, value] = values[i];
            this._set(key, value);
        }
    }

    _set(key, value) {
        const {bucket, index} = this._search(key);
        if (index === -1) {
            bucket.push(key, value);
            this._count++;
        } else {
            bucket[index + 1] = value;
        }
    }

    _search(key) {
        const ind = this._hash(key, this._a, this._b, this._buckets.length);
        const bucket = this._buckets[ind];
        for (let index = 0; index < bucket.length; index += 2) {
            if (Object.is(key, bucket[index])) {
                return {bucket, index};
            }
        }
        return {bucket, index: -1};
    }

    _searchIdeal(key) {
        const ind = this._hash(key, this._a, this._b, this._buckets.length);
        const bucket = this._buckets[ind];
        if (bucket.m === 0) {
            return {value: null, index: -1};
        }
        const index = this._hash(key, bucket.a, bucket.b, bucket.m) * 2;
        if (Object.is(bucket.values[index], key)) {
            return {value: bucket.values[index + 1], index};
        }
        return {value: null, index: -1};
    }

    _toIdeal() {
        for (let i = 0; i < this._buckets.length; i++) {
            const oldValues = this._buckets[i];
            const n = oldValues.length / 2;
            if (n <= 1) {
                this._buckets[i] = {
                    m: n,
                    a: 0,
                    b: 0,
                    values: oldValues
                }
            } else {
                const m = n * n;
                hashSearch:
                    while (true) {
                        const values = Array(m * 2);
                        const a = Math.floor(1 + Math.random() * 2 ** 16);
                        const b = Math.floor(Math.random() * 2 ** 16);
                        for (let j = 0; j < oldValues.length; j += 2) {
                            const key = oldValues[j];
                            const value = oldValues[j + 1];
                            const ind = this._hash(key, a, b, m) * 2;
                            if (values.hasOwnProperty(ind)) {
                                continue hashSearch;
                            }
                            values[ind] = key;
                            values[ind + 1] = value;
                        }
                        this._buckets[i] = {m, a, b, values};
                        break;
                    }
            }
        }
    }

    _hash(key, a, b, m) {
        const keyHash = this._hashKey(key);
        return (a * keyHash + b) % p % m;
    }

    _hashKey(key) {
        const str = this._toString(key) + typeof key;
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

module.exports = IdealHashTable;
