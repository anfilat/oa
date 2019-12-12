// в API индекс считается от 1, а не от 0
class RSQ {
    _array;
    // исходные данные хранятся начиная с позиции _n
    _n;
    // строим дерево после первого запроса суммы и при последующих модификациях обновляем дерево
    _wasQuery = false;

    // создает дерево отрезков из массива
    static new(values) {
        const rsq = new RSQ(values.length);

        values.forEach((value, index) => rsq.set(index + 1, value));
        return rsq;
    }

    constructor(n) {
        this._n = (1 << (Math.log2(n - 1) + 1));
        this._array = new Float64Array(2 * this._n);
    }

    set(i, x) {
        i += this._n - 1;
        this._array[i] = x;

        if (this._wasQuery) {
            this._update(i);
        }
    }

    sum(l, r) {
        if (!this._wasQuery) {
            this._wasQuery = true;
            this._build();
        }

        let res = 0;
        l += this._n - 1;
        r += this._n - 1;
        while (l <= r) {
            if ((l & 1) === 1) {
                res += this._array[l];
            }
            if ((r & 1) === 0) {
                res += this._array[r];
            }
            l = Math.floor((l + 1) / 2);
            r = Math.floor((r - 1) / 2);
        }
        return res;
    }

    // функция для тестирования, считает сумму стандартным способом
    checkSum(l, r) {
        let res = 0;
        l += this._n - 1;
        r += this._n - 1;
        for (let i = l; i <= r; i++) {
            res += this._array[i];
        }
        return res;
    }

    _build() {
        for (let i = this._n - 1; i > 0; i--) {
            this._array[i] = this._array[2 * i] + this._array[2 * i + 1];
        }
    }

    _update(i) {
        i = Math.floor(i / 2);
        while (i !== 0) {
            this._array[i] = this._array[2 * i] + this._array[2 * i + 1];
            i = Math.floor(i / 2);
        }
    }
}

exports.RSQ = RSQ;
