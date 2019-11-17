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
                    board[vars[index]] |= ceilToBitBoard(col);
                    col++;
                } else if (char >= '0' && char <= '9') {
                    col += parseInt(char, 10);
                }
            }
        }

        return board;
    }

    getPawns(color = 'w') {
        return this._getFigures(color === 'w' ? this._whitePawns : this._blackKnights);
    }

    getKnights(color = 'w') {
        return this._getFigures(color === 'w' ? this._whiteKnights : this._blackPawns);
    }

    getBishops(color = 'w') {
        return this._getFigures(color === 'w' ? this._whiteBishops : this._blackBishops);
    }

    getRooks(color = 'w') {
        return this._getFigures(color === 'w' ? this._whiteRooks : this._blackRooks);
    }

    getQueens(color = 'w') {
        return this._getFigures(color === 'w' ? this._whiteQueens : this._blackQueens);
    }

    getKings(color = 'w') {
        return this._getFigures(color === 'w' ? this._whiteKing : this._blackKing);
    }

    knightSteps(ceil, color = 'w') {
        const nA = 0xFeFeFeFeFeFeFeFen;
        const nAB = 0xFcFcFcFcFcFcFcFcn;
        const nH = 0x7f7f7f7f7f7f7f7fn;
        const nGH = 0x3f3f3f3f3f3f3f3fn;

        const knightBits = ceilToBitBoard(ceil);
        const steps = nGH & (knightBits << 6n | knightBits >> 10n) |
            nH & (knightBits << 15n | knightBits >> 17n) |
            nA  & (knightBits << 17n | knightBits >> 15n) |
            nAB & (knightBits << 10n | knightBits >> 6n);
        return steps & ~this._stepMask(color);
    }

    rookSteps(ceil, color ='w') {
        let steps = 0n;
        const col = ceil % 8;
        const row = (ceil - col) / 8;
        const mask = this._stepMask(color);
        const stopMask = this._oppositeStepMask(color);

        let bitBoard = ceilToBitBoard(ceil);
        for (let i = col - 1; i >= 0; i--) {
            bitBoard >>= 1n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        bitBoard = ceilToBitBoard(ceil);
        for (let i = col + 1; i <= 7; i++) {
            bitBoard <<= 1n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        bitBoard = ceilToBitBoard(ceil);
        for (let i = row - 1; i >= 0; i--) {
            bitBoard >>= 8n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        bitBoard = ceilToBitBoard(ceil);
        for (let i = row + 1; i <= 7; i++) {
            bitBoard <<= 8n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        return steps;

        function applyBitBoard(bitBoard) {
            if ((bitBoard & mask) !== 0n) {
                return true;
            }
            steps |= bitBoard;
            if ((bitBoard & stopMask) !== 0n) {
                return true;
            }
        }
    }

    bishopsSteps(ceil, color ='w') {
        let steps = 0n;
        const col = ceil % 8;
        const row = (ceil - col) / 8;
        const mask = this._stepMask(color);
        const stopMask = this._oppositeStepMask(color);

        let bitBoard = ceilToBitBoard(ceil);
        for (let i = col - 1, j = row - 1; i >= 0 && j >= 0; i--, j--) {
            bitBoard >>= 9n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        bitBoard = ceilToBitBoard(ceil);
        for (let i = col - 1, j = row + 1; i >= 0 && j <= 7; i--, j++) {
            bitBoard <<= 7n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        bitBoard = ceilToBitBoard(ceil);
        for (let i = col + 1, j = row - 1; i <= 7 && j >= 0; i++, j--) {
            bitBoard >>= 7n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        bitBoard = ceilToBitBoard(ceil);
        for (let i = col + 1, j = row + 1; i <= 7 && j <= 7; i++, j++) {
            bitBoard <<= 9n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        return steps;

        function applyBitBoard(bitBoard) {
            if ((bitBoard & mask) !== 0n) {
                return true;
            }
            steps |= bitBoard;
            if ((bitBoard & stopMask) !== 0n) {
                return true;
            }
        }
    }

    queensSteps(ceil, color ='w') {
        return this.rookSteps(ceil, color) | this.bishopsSteps(ceil, color);
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

    // маска для проверки - можно ли ходить в эту клетку
    _stepMask(color) {
        return color === 'w' ? this._whites() : this._blacks();
    }

    // маска для проверки - была фигура противника в клетке
    _oppositeStepMask(color) {
        return color === 'w' ? this._blacks() : this._whites();
    }

    _whites() {
        return this._whitePawns |
            this._whiteKnights |
            this._whiteBishops |
            this._whiteRooks |
            this._whiteQueens |
            this._whiteKing;
    }

    _blacks() {
        return this._blackPawns |
            this._blackKnights |
            this._blackBishops |
            this._blackRooks |
            this._blackQueens |
            this._blackKing;
    }

    // возвращает все фигуры из указанного bitboard
    _getFigures(bitBoard) {
        const result = [];
        for (let i = 0; i < 64; i++) {
            if ((bitBoard & 1n) === 1n) {
                result.push(i);
            }
            bitBoard >>= 1n;
        }
        return result;
    }
}

function ceilToBitBoard(ceil) {
    return 1n << BigInt(ceil);
}

// количество установленных битов
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
