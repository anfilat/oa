const {TextEncoder, TextDecoder} = require('util');
const { loremIpsum } = require('testUtils');
const {encode, decode} = require('../src/huffman');

describe('сжатие кодами Хоффмана', () => {
    it('работает для пустой строки', () => {
        let s;
        const enc = new TextEncoder();
        const dec = new TextDecoder();

        s = '';
        expect(dec.decode(decode(encode(enc.encode(s))))).toEqual(s);
    });

    it('работает для строки из повторяющегося одного символа', () => {
        let s;
        const enc = new TextEncoder();
        const dec = new TextDecoder();

        s = 'aaaaaaaaaaaaaaa';
        expect(dec.decode(decode(encode(enc.encode(s))))).toEqual(s);
        s = 'ыыыыыыыыыыыыыыыы';
        expect(dec.decode(decode(encode(enc.encode(s))))).toEqual(s);
    });

    it('работает для разных строк', () => {
        let s;
        const enc = new TextEncoder();
        const dec = new TextDecoder();

        s = 'ab';
        expect(dec.decode(decode(encode(enc.encode(s))))).toEqual(s);
        s = '1234567890~qwertyuiopasd\nfghjklzxcvbnm__!';
        expect(dec.decode(decode(encode(enc.encode(s))))).toEqual(s);
        s = 'asdfxdertgdzadsadyuf';
        expect(dec.decode(decode(encode(enc.encode(s))))).toEqual(s);
        s = 'ewytriewudjasvfhdjvcndxk shfdsjf sdjf suief sejfjs';
        expect(dec.decode(decode(encode(enc.encode(s))))).toEqual(s);
        s = 'оркпвыл раты влд вауыгшвцфщш уыуцью';
        expect(dec.decode(decode(encode(enc.encode(s))))).toEqual(s);
        s = 'aG g6. Ывап-qwer! fffYff Ой[-1]!';
        expect(dec.decode(decode(encode(enc.encode(s))))).toEqual(s);
    });

    xit('работает для больших строк', () => {
        let s;
        const enc = new TextEncoder();
        const dec = new TextDecoder();

        s = loremIpsum(1_000_000);
        expect(dec.decode(decode(encode(enc.encode(s))))).toEqual(s);
    });
});
