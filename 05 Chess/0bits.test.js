const { readCases } = require('./testUtils');
const { Board, bitCount } = require('./0bits');

describe.each(readCases('./0.BITS/1744.0.Bitboard - FEN'))
('0.BITS/1744.0.Bitboard - FEN', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = Board.fromFEN(inPar[0]);
        const result = board.toBitBoards();

        expect(result).toEqual(outPar);
    });
});

describe.each(readCases('./0.BITS/3710.0.Bitboard - Конь'))
('0.BITS/3710.0.Bitboard - Конь', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = new Board();
        const bitBoard = board.knightSteps(parseInt(inPar[0]));
        const count = bitCount(bitBoard);
        const result = [count.toString(), bitBoard.toString()];

        expect(result).toEqual(outPar);
    });
});
