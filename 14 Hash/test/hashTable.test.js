const HashTable = require('../src/hashTable');

describe('hash table', () => {
    it('создает hashTable', () => {
        const ht = new HashTable();

        expect(ht.size).toEqual(0);
    });

    it('сохраняет значения', () => {
        const ht = new HashTable();
        ht.set(3, 777);

        expect(ht.get(3)).toEqual(777);
        expect(ht.get(1)).toEqual(undefined);
        expect(ht.has(3)).toEqual(true);
        expect(ht.has(1)).toEqual(false);
        expect(ht.size).toEqual(1);
    });

    it('сохраняет разнотипные ключи', () => {
        const ht = new HashTable();
        ht.set(true, 'true');
        ht.set(1, '1');
        ht.set('1', '11');
        ht.set(Number.NaN, 'nan');
        const objKey = {k: 7};
        ht.set(objKey, 'k7');

        expect(ht.get(true)).toEqual('true');
        expect(ht.get(1)).toEqual('1');
        expect(ht.get('1')).toEqual('11');
        expect(ht.get(Number.NaN)).toEqual('nan');
        expect(ht.get(objKey)).toEqual('k7');
        expect(ht.size).toEqual(5);
    });

    it('меняет значение при повторном вызове с тем же ключом', () => {
        const ht = new HashTable();
        ht.set(3, 777);

        expect(ht.get(3)).toEqual(777);
        ht.set(3, 'mark');
        expect(ht.get(3)).toEqual('mark');

        expect(ht.size).toEqual(1);
    });

    it('удаляет', () => {
        const ht = new HashTable();
        ht.set(3, 777);

        expect(ht.delete(3)).toEqual(true);
        expect(ht.has(3)).toEqual(false);
        expect(ht.delete(3)).toEqual(false);
        expect(ht.size).toEqual(0);
    });

    it('делает рехеш', () => { // 862ms
        const ht = new HashTable();
        for (let i = 0; i < 5000; i++) {
            ht.set(i, i);
            ht.set(i.toString(), i.toString());
        }

        for (let i = 0; i < 5000; i++) {
            expect(ht.get(i)).toEqual(i);
            expect(ht.get(i.toString())).toEqual(i.toString());
        }
        expect(ht.size).toEqual(10000);
    });

    it('бенчмарк на Map', () => { // 489ms
        const ht = new Map();
        for (let i = 0; i < 5000; i++) {
            ht.set(i, i);
            ht.set(i.toString(), i.toString());
        }

        for (let i = 0; i < 5000; i++) {
            expect(ht.get(i)).toEqual(i);
            expect(ht.get(i.toString())).toEqual(i.toString());
        }
        expect(ht.size).toEqual(10000);
    });
});
