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
        const steps = board.knightSteps(parseInt(inPar[0]));
        const count = bitCount(steps);
        const result = [
            count.toString(),
            steps.toString(),
        ];

        expect(result).toEqual(outPar);
    });
});

describe.each(readCases('./0.BITS/3718.0.Bitboard - Ферзь'))
('0.BITS/3718.0.Bitboard - Ферзь', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = Board.fromFEN(inPar[0]);
        const rooks = board.getRooks();
        const rookSteps = board.rookSteps(rooks[0]);
        const bishops = board.getBishops();
        const bishopsSteps = board.bishopsSteps(bishops[0]);
        const queens = board.getQueens();
        const queensSteps = board.queensSteps(queens[0]);
        const result = [
            rookSteps.toString(),
            bishopsSteps.toString(),
            queensSteps.toString(),
        ];

        expect(result).toEqual(outPar);
    });
});

describe.each(readCases('./0.BITS/3733.0.Bitboard - Король'))
('0.BITS/3733.0.Bitboard - Король', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = new Board();
        const steps = board.kingSteps(parseInt(inPar[0]));
        const count = bitCount(steps);
        const result = [
            count.toString(),
            steps.toString(),
        ];

        expect(result).toEqual(outPar);
    });
});
