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

exports.Board = Board;
