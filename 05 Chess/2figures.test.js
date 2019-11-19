const { readCases } = require('./testUtils');
const { Board, stepsToList, generateKBRQStepsTable } = require('./2figures');

describe.each(readCases('./2.FIGURES/3719.2.Сортировка ходов'))
('2.FIGURES/3719.2.Сортировка ходов', (inPar, outPar) => {
    it(`${inPar[0]} ${inPar[1]}`, () => {
        const result = stepsToList(inPar.splice(1));

        expect(result).toEqual(outPar);
    });
});

describe.each(readCases('./2.FIGURES/3721.2.Ход конём'))
('2.FIGURES/3721.2.Ход конём', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = new Board().fromFEN(inPar[0]);
        const result = board.allKnightSteps();

        expect(result).toEqual(outPar);
    });
});

describe.each(readCases('./2.FIGURES/3722.2.Ход слоном'))
('2.FIGURES/3722.2.Ход слоном', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = new Board().fromFEN(inPar[0]);
        const result = board.allBishopsSteps();

        expect(result).toEqual(outPar);
    });
});

describe.each(readCases('./2.FIGURES/3723.2.Ход ладьёй'))
('2.FIGURES/3723.2.Ход ладьёй', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = new Board().fromFEN(inPar[0]);
        const result = board.allRooksSteps();

        expect(result).toEqual(outPar);
    });
});

describe.each(readCases('./2.FIGURES/3724.2.Ход ферзём'))
('2.FIGURES/3724.2.Ход ферзём', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = new Board().fromFEN(inPar[0]);
        const result = board.allQueensSteps();

        expect(result).toEqual(outPar);
    });
});

describe.each(readCases('./2.FIGURES/3725.2.Хоровод'))
('2.FIGURES/3725.2.Хоровод', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = new Board().fromFEN(inPar[0]);
        const result = board.allKBRQSteps();

        expect(result).toEqual(outPar);
    });
});

describe.each(readCases('./2.FIGURES/3726.2.Все ходы записаны'))
('2.FIGURES/3726.2.Все ходы записаны', (inPar, outPar) => {
    let table;

    beforeAll(() => {
        table = generateKBRQStepsTable();
    });

    it(inPar[0], () => {
        const result = table[inPar[0]].length.toString();

        expect(result).toEqual(outPar[0]);
    });
});
