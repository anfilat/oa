const { readCases } = require('./testUtils');

describe.each(readCases('./!.TESTS'))
('!.TESTS', (inPar, outPar) => {
    it(`'${inPar[0]}' length == ${outPar[0]}`, () => {
        expect(inPar[0].length).toEqual(parseInt(outPar[0]));
    });
});
