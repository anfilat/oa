const { readCases } = require('./testUtils');
const { Board, stepsToList } = require('./2figures');

describe.each(readCases('./2.FIGURES/3719.2.Сортировка ходов'))
('2.FIGURES/3719.2.Сортировка ходов', (inPar, outPar) => {
    it(`${inPar[0]} ${inPar[1]}`, () => {
        const result = stepsToList(inPar.splice(1));

        expect(result).toEqual(outPar);
    });
});
