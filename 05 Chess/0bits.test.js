const { readCases } = require('./testUtils');
const { Board } = require('./0bits');

describe.each(readCases('./0.BITS/1744.0.Bitboard - FEN'))
('0.BITS/1744.0.Bitboard - FEN', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = Board.fromFEN(inPar[0]);
        expect(board.toBitBoards()).toEqual(outPar);
    });
});
