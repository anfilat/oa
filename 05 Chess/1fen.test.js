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

describe.each(readCases('./1.FEN/1745.1.Сборка и разборка'))
('1.FEN/1745.1.Сборка и разборка', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = new Board().fromFEN(inPar[0]);
        const result = board.toFEN();

        expect(result).toEqual(outPar[0]);
    });
});

describe.each(readCases('./1.FEN/1746.1.Счётчик ходов'))
('1.FEN/1746.1.Счётчик ходов', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = new Board().fromFEN(inPar[0]);
        board._changeTurn();
        const result = board.toFEN();

        expect(result).toEqual(outPar[0]);
    });
});

describe.each(readCases('./1.FEN/3694.1.Счётчик полуходов'))
('1.FEN/3694.1.Счётчик полуходов', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = new Board().fromFEN(inPar[0]);
        board.doHalfStep(inPar[1]);
        const result = board.toFEN();

        expect(result).toEqual(outPar[0]);
    });
});

describe.each(readCases('./1.FEN/3711.1.Перемещение фигуры'))
('1.FEN/3711.1.Перемещение фигуры', (inPar, outPar) => {
    it(inPar[0], () => {
        const board = new Board().fromFEN(inPar[0]);
        board.doStep(inPar[1]);
        const result = board.toFEN();

        expect(result).toEqual(outPar[0]);
    });
});
