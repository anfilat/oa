const boyermoore = require('../src/boyermoore');

describe('алгоритм Бойера — Мура', () => {
    it('работает для английского алфавита', () => {
        let text;
        let pattern;

        text = 'BARBORA BAR BARBOR BARBARATOR';
        pattern = 'BARBA';
        expect(boyermoore(text, pattern)).toEqual(text.indexOf(pattern));
        text = 'barbora bar barbor barbarator';
        pattern = 'barba';
        expect(boyermoore(text, pattern)).toEqual(text.indexOf(pattern));
        text = 'onkollokol kolokola';
        pattern = 'kolokol';
        expect(boyermoore(text, pattern)).toEqual(text.indexOf(pattern));
        text = 'abbbaccbccbcc';
        pattern = 'aaccbccbcc';
        expect(boyermoore(text, pattern)).toEqual(text.indexOf(pattern));
    });

    it('работает для русского алфавита', () => {
        let text;
        let pattern;

        text = 'онколлокол колокола';
        pattern = 'колокол';
        expect(boyermoore(text, pattern)).toEqual(text.indexOf(pattern));
        text = 'давыпал мимимиккол затокол и вот он колокол';
        pattern = 'колокол';
        expect(boyermoore(text, pattern)).toEqual(text.indexOf(pattern));
    });

    it('ищет пустой паттерн', () => {
        expect(boyermoore('локо', '')).toEqual(0);
        expect(boyermoore('', '')).toEqual(0);
    });

    it('возвращает -1 при отсутствии совпадений', () => {
        expect(boyermoore('локо', 'колокол')).toEqual(-1);
        expect(boyermoore('', 'колокол')).toEqual(-1);
        expect(boyermoore('онколлокол колкола', 'колокол')).toEqual(-1);
        expect(boyermoore('давыпал мимимиккол затокол', 'колокол')).toEqual(-1);
    });
});
