const figures = ['P', 'N', 'B', 'R', 'Q', 'K', 'p', 'n', 'b', 'r', 'q', 'k'];
const vars = [
    '_whitePawns', '_whiteKnights', '_whiteBishops', '_whiteRooks', '_whiteQueens', '_whiteKing',
    '_blackPawns', '_blackKnights', '_blackBishops', '_blackRooks', '_blackQueens', '_blackKing'
];

class Board {
    _whitePawns = 0n;
    _whiteKnights = 0n;
    _whiteBishops = 0n;
    _whiteRooks = 0n;
    _whiteQueens = 0n;
    _whiteKing = 0n;

    _blackPawns = 0n;
    _blackKnights = 0n;
    _blackBishops = 0n;
    _blackRooks = 0n;
    _blackQueens = 0n;
    _blackKing = 0n;

    static fromFEN(fen) {
        const board = new Board();
        const lines = fen.split('/');

        for (let row = 0; row < 8; row++) {
            const line = lines[7 - row];

            let col = row * 8;
            for (let char of line) {
                const index = figures.indexOf(char);
                if (index !== -1) {
                    board[vars[index]] |= 1n << BigInt(col);
                    col++;
                } else if (char >= '0' && char <= '9') {
                    col += parseInt(char, 10);
                }
            }
        }

        return board;
    }

    /*setPawn(num, color = 'w') {
        this._setFigure(num, color, '_whitePawns', '_blackKnights');
    }

    setKnight(num, color = 'w') {
        this._setFigure(num, color, '_whiteKnights', '_blackPawns');
    }

    setBishop(num, color = 'w') {
        this._setFigure(num, color, '_whiteBishops', '_blackBishops');
    }

    setRook(num, color = 'w') {
        this._setFigure(num, color, '_whiteRooks', '_blackRooks');
    }

    setQueen(num, color = 'w') {
        this._setFigure(num, color, '_whiteQueens', '_blackQueens');
    }

    setKing(num, color = 'w') {
        this._setFigure(num, color, '_whiteKing', '_blackKing');
    }

    _setFigure(num, color, whiteBitBoard, blackBitBoard) {
        const bit = 1n << BigInt(num);
        if (color === 'w') {
            this[whiteBitBoard] |= bit;
        } else {
            this[blackBitBoard] |= bit;
        }
    }*/

    knightSteps(num) {
        const nA = 0xFeFeFeFeFeFeFeFen;
        const nAB = 0xFcFcFcFcFcFcFcFcn;
        const nH = 0x7f7f7f7f7f7f7f7fn;
        const nGH = 0x3f3f3f3f3f3f3f3fn;

        const knightBits = 1n << BigInt(num);
        return nGH & (knightBits << 6n | knightBits >> 10n) |
            nH & (knightBits << 15n | knightBits >> 17n) |
            nA  & (knightBits << 17n | knightBits >> 15n) |
            nAB & (knightBits << 10n | knightBits >> 6n);
    }

    toBitBoards() {
        return [
            this._whitePawns.toString(),
            this._whiteKnights.toString(),
            this._whiteBishops.toString(),
            this._whiteRooks.toString(),
            this._whiteQueens.toString(),
            this._whiteKing.toString(),

            this._blackPawns.toString(),
            this._blackKnights.toString(),
            this._blackBishops.toString(),
            this._blackRooks.toString(),
            this._blackQueens.toString(),
            this._blackKing.toString(),
        ]
    }
}

function bitCount(bitBoard) {
    let count = 0;
    while (bitBoard !== 0n) {
        bitBoard &= (bitBoard - 1n);
        count++;
    }

    return count;
}

exports.Board = Board;
exports.bitCount = bitCount;
