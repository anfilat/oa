const IdealHashTable = require('../src/hashTable');

describe('hash table', () => {
    it('создает hashTable', () => {
        const ht = new IdealHashTable();

        expect(ht.size).toEqual(0);
    });

    it('сохраняет значения', () => {
        const ht = new IdealHashTable([[3, 777]]);
        expect(ht.get(3)).toEqual(777);
        expect(ht.get(1)).toEqual(undefined);
        expect(ht.has(3)).toEqual(true);
        expect(ht.has(1)).toEqual(false);
        expect(ht.size).toEqual(1);
    });

    it('сохраняет разнотипные ключи', () => {
        const objKey = {k: 7};
        const ht = new IdealHashTable([[true, 'true'], [1, '1'], ['1', '11'], [Number.NaN, 'nan'], [objKey, 'k7']]);

        expect(ht.get(true)).toEqual('true');
        expect(ht.get(1)).toEqual('1');
        expect(ht.get('1')).toEqual('11');
        expect(ht.get(Number.NaN)).toEqual('nan');
        expect(ht.get(objKey)).toEqual('k7');
        expect(ht.size).toEqual(5);
    });

    it('сохраняет одинаковые ключи', () => {
        const ht = new IdealHashTable([[1, '1'], [1, '2'], [1, '3']]);

        expect(ht.get(1)).toEqual('3');
        expect(ht.size).toEqual(1);
    });

    it('ищет несуществующие ключи', () => {
        const ht = new IdealHashTable([[1, '1'], [1, '2'], [1, '3']]);

        expect(ht.has(1)).toEqual(true);
        expect(ht.has(5)).toEqual(false);
        expect(ht.has(55)).toEqual(false);
        expect(ht.has(113)).toEqual(false);
        expect(ht.has(undefined)).toEqual(false);
        expect(ht.size).toEqual(1);
    });

    it('использует undefined как ключ', () => {
        const ht = new IdealHashTable([[undefined, '1'], [2, 2]]);

        expect(ht.get(undefined)).toEqual('1');
        expect(ht.has(undefined)).toEqual(true);
        expect(ht.has(null)).toEqual(false);
        expect(ht.has(2)).toEqual(true);
        expect(ht.size).toEqual(2);
    });

    it('сохраняет множество значений', () => {
        const values = [];
        for (let i = 0; i < 5000; i++) {
            values.push([i, i]);
            values.push([i.toString(), i.toString()]);
        }
        const ht = new IdealHashTable(values);

        for (let i = 0; i < 5000; i++) {
            expect(ht.get(i)).toEqual(i);
            expect(ht.get(i.toString())).toEqual(i.toString());
        }
        expect(ht.size).toEqual(10000);
    });
});
