const { readCases } = require('./testUtils');
const { Board } = require('./1fen');

describe.each(readCases('./1.FEN/1743.1.FEN - ASCII'))
('1.FEN/1743.1.FEN - ASCII', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = new Board().fromFEN(inPar[0]);
        const result = board.toPicture();

        expect(result).toEqual(outPar);
    });
});
