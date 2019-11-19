const { readCases } = require('./testUtils');
const { Board } = require('./2figures');

describe.each(readCases('./2.FIGURES/3719.2.Сортировка ходов'))
('2.FIGURES/3719.2.Сортировка ходов', (inPar, outPar) => {
    it(`${inPar[0]} ${inPar[1]}`, () => {
        const board = new Board().fromFEN(inPar[0]);
        board.doStep(inPar[1]);
        const result = board.toFEN();

        expect(result).toEqual(outPar[0]);
    });
});
