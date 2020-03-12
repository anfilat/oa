const kmp = require('../src/kmp');

describe('алгоритм Кнута-Морриса-Пратта', () => {
    it('работает для английского алфавита', () => {
        let text;
        let pattern;

        text = 'BARBORA BAR BARBOR BARBARATOR';
        pattern = 'BARBA';
        expect(kmp(text, pattern)).toEqual(text.indexOf(pattern));
        text = 'barbora bar barbor barbarator';
        pattern = 'barba';
        expect(kmp(text, pattern)).toEqual(text.indexOf(pattern));
        text = 'onkollokol kolokola';
        pattern = 'kolokol';
        expect(kmp(text, pattern)).toEqual(text.indexOf(pattern));
        text = 'abbbaccbccbcc';
        pattern = 'aaccbccbcc';
        expect(kmp(text, pattern)).toEqual(text.indexOf(pattern));
    });

    it('работает для русского алфавита', () => {
        let text;
        let pattern;

        text = 'онколлокол колокола';
        pattern = 'колокол';
        expect(kmp(text, pattern)).toEqual(text.indexOf(pattern));
        text = 'давыпал мимимиккол затокол и вот он колокол';
        pattern = 'колокол';
        expect(kmp(text, pattern)).toEqual(text.indexOf(pattern));
    });

    it('ищет пустой паттерн', () => {
        expect(kmp('локо', '')).toEqual(0);
        expect(kmp('', '')).toEqual(0);
    });

    it('возвращает -1 при отсутствии совпадений', () => {
        expect(kmp('локо', 'колокол')).toEqual(-1);
        expect(kmp('', 'колокол')).toEqual(-1);
        expect(kmp('онколлокол колкола', 'колокол')).toEqual(-1);
        expect(kmp('давыпал мимимиккол затокол', 'колокол')).toEqual(-1);
    });
});
