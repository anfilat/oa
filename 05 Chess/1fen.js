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

    _whites = 0n;
    _blacks = 0n;

    _nextStep;
    _castling;
    _pawnOnPass;
    _halfSteps;
    _stepNum;

    // установка состояния доски из входных данных

    fromFEN(fen) {
        const fenParts = this._splitFenToParts(fen);

        this._parseFENBoard(fenParts[0]);
        this._nextStep = this._parseNextStep(fenParts[1]);
        this._castling = this._parseCastling(fenParts[2]);
        this._pawnOnPass = fenParts[3];
        this._halfSteps = this._parseHalfStep(fenParts[4]);
        this._stepNum = this._parseStepNum(fenParts[5]);

        return this;
    }

    // генерация выходных представлений доски

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

    toPicture() {
        const result = [];
        result.push('  +-----------------+');

        for (let row = 7; row >= 0; row--) {
            let line = `${row + 1} | `;
            for (let col = 0; col <= 7; col++) {
                line += this._getASCIIFigure(col, row) + ' ';
            }
            line += '|';
            result.push(line);
        }

        result.push('  +-----------------+');
        result.push('    a b c d e f g h  ');

        return result;
    }

    toFEN() {
        return `${this._figuresToFEN()} ${this._nextStep} ${this._castling} ${this._pawnOnPass} ${this._halfSteps} ${this._stepNum}`
    }

    // выполнение хода

    doStep(step) {
        const {startCol, startRow, endCol, endRow, promotion} = this._parseStep(step);

        // на каком bitBoard ход
        const figureVar = this._getFigureVar(startCol, startRow);
        // откуда
        const startMask = this._colRowToBitBoard(startCol, startRow);
        // куда
        const endMask = this._colRowToBitBoard(endCol, endRow);

        // на каком bitBoard берется фигура
        let takeFigureVar;
        // где
        let takeMask;

        if (this._isTakeOnPass(figureVar, step)) {
            // перемещение фигуры
            this._moveFigure(figureVar, startMask, endMask);

            // правка хода пешки на два поля
            this._clearPawnOnPass();

            // подготовка переменных для взятия
            takeFigureVar = this._getFigureVar(endCol, startRow);
            takeMask = this._colRowToBitBoard(endCol, startRow);
        } else {
            // перемещение фигуры
            if (promotion) {
                this._promotionPawn(figureVar, startMask, endMask, promotion);
            } else {
                this._moveFigure(figureVar, startMask, endMask);
            }

            // правка хода пешки на два поля
            this._changePawnOnPass(figureVar, startCol, startRow, endRow);

            // подготовка переменных для взятия
            takeFigureVar = this._getFigureVar(endCol, endRow);
            takeMask = endMask;
        }
        this._takeFigure(takeFigureVar, takeMask);
        this._calcWhitesAndBlacksBB();
        this._changeHalfSteps(figureVar, takeFigureVar);
        this._changeTurn();
    }

    doHalfStep(step) {
        const {startCol, startRow, endCol, endRow} = this._parseStep(step);

        const figureVar = this._getFigureVar(startCol, startRow);
        const takeFigureVar = this._getFigureVar(endCol, endRow);

        this._changeHalfSteps(figureVar, takeFigureVar);
        this._changeTurn();
    }

    // генерация возможных ходов

    knightSteps(ceil, color = 'w') {
        const nA = 0xFeFeFeFeFeFeFeFen;
        const nAB = 0xFcFcFcFcFcFcFcFcn;
        const nH = 0x7f7f7f7f7f7f7f7fn;
        const nGH = 0x3f3f3f3f3f3f3f3fn;

        const bitBoard = this._ceilToBitBoard(ceil);
        const steps =
            nGH & (bitBoard << 6n | bitBoard >> 10n) |
            nH & (bitBoard << 15n | bitBoard >> 17n) |
            nA & (bitBoard << 17n | bitBoard >> 15n) |
            nAB & (bitBoard << 10n | bitBoard >> 6n);
        return steps & ~this._stepMask(color);
    }

    bishopsSteps(ceil, color ='w') {
        let steps = 0n;
        const col = ceil % 8;
        const row = (ceil - col) / 8;
        const mask = this._stepMask(color);
        const stopMask = this._oppositeStepMask(color);

        let bitBoard = this._ceilToBitBoard(ceil);
        for (let i = col - 1, j = row - 1; i >= 0 && j >= 0; i--, j--) {
            bitBoard >>= 9n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        bitBoard = this._ceilToBitBoard(ceil);
        for (let i = col - 1, j = row + 1; i >= 0 && j <= 7; i--, j++) {
            bitBoard <<= 7n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        bitBoard = this._ceilToBitBoard(ceil);
        for (let i = col + 1, j = row - 1; i <= 7 && j >= 0; i++, j--) {
            bitBoard >>= 7n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        bitBoard = this._ceilToBitBoard(ceil);
        for (let i = col + 1, j = row + 1; i <= 7 && j <= 7; i++, j++) {
            bitBoard <<= 9n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        return steps;

        function applyBitBoard(bitBoard) {
            // проверка, что ячейка пустая или занята фигурой другого цвета (значит в нее можно ходить)
            if ((bitBoard & mask) !== 0n) {
                return true;
            }
            steps |= bitBoard;
            // проверка, что ячейка занята фигурой другого цвета (значит дальше по этой линии нельзя ходить)
            if ((bitBoard & stopMask) !== 0n) {
                return true;
            }
        }
    }

    rookSteps(ceil, color ='w') {
        let steps = 0n;
        const col = ceil % 8;
        const row = (ceil - col) / 8;
        const mask = this._stepMask(color);
        const stopMask = this._oppositeStepMask(color);

        let bitBoard = this._ceilToBitBoard(ceil);
        for (let i = col - 1; i >= 0; i--) {
            bitBoard >>= 1n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        bitBoard = this._ceilToBitBoard(ceil);
        for (let i = col + 1; i <= 7; i++) {
            bitBoard <<= 1n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        bitBoard = this._ceilToBitBoard(ceil);
        for (let i = row - 1; i >= 0; i--) {
            bitBoard >>= 8n;
            if (applyBitBoard(bitBoard)) {
                break;
            }
        }

        bitBoard = this._ceilToBitBoard(ceil);
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

    queensSteps(ceil, color ='w') {
        return this.rookSteps(ceil, color) | this.bishopsSteps(ceil, color);
    }

    kingSteps(ceil, color = 'w') {
        const nA = 0xFeFeFeFeFeFeFeFen;
        const nH = 0x7f7f7f7f7f7f7f7fn;
        const n9 = 0xffffffffffffffffn;

        const bitBoard = this._ceilToBitBoard(ceil);
        const steps =
            nH & (bitBoard << 7n | bitBoard >> 1n | bitBoard >> 9n) |
            n9 & (bitBoard << 8n | bitBoard >> 8n) |
            nA & (bitBoard << 9n | bitBoard << 1n | bitBoard >> 7n);
        return steps & ~this._stepMask(color);
    }

    // получение состояния доски

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

    // дальше внутренние методы

    // парсинг входных данных

    _splitFenToParts(fen) {
        return fen.split(/\s+/);
    }

    _parseFENBoard(fenBoard) {
        const lines = fenBoard.split('/');

        for (let row = 0; row < 8; row++) {
            const line = lines[7 - row];

            let col = row * 8;
            for (let char of line) {
                const index = figures.indexOf(char);
                if (index !== -1) {
                    this[vars[index]] |= this._ceilToBitBoard(col);
                    col++;
                } else if (char >= '0' && char <= '9') {
                    col += parseInt(char, 10);
                }
            }
        }

        this._calcWhitesAndBlacksBB();
    }

    _parseNextStep(str) {
        return str.toLowerCase();
    }

    _parseCastling(str) {
        if (str === '-') {
            return '-';
        }
        return '' +
            (str.includes('K') ? 'K' : '') +
            (str.includes('Q') ? 'Q' : '') +
            (str.includes('k') ? 'k' : '') +
            (str.includes('q') ? 'q' : '');
    }

    _parseHalfStep(str) {
        return parseInt(str, 10);
    }

    _parseStepNum(str) {
        return parseInt(str, 10);
    }

    _parseStep(step) {
        const startCol = step.charCodeAt(0) - 'a'.charCodeAt(0);
        const startRow = parseInt(step[1], 10) - 1;
        const endCol = step.charCodeAt(2) - 'a'.charCodeAt(0);
        const endRow = parseInt(step[3], 10) - 1;
        const promotion = step[4];

        return {
            startCol,
            startRow,
            endCol,
            endRow,
            promotion
        };
    }

    // генерация выходных представлений доски (вспомогательные методы)

    _figuresToFEN() {
        let result = '';
        for (let row = 7; row > 0; row--) {
            result += this._FENRow(row) + '/';
        }
        result += this._FENRow(0);

        return result;
    }

    _FENRow(row) {
        let line = '';
        let skip = 0;
        for (let col = 0; col <= 7; col++) {
            const figure = this._getASCIIFigure(col, row);
            if (this._isEmptyCeil(figure)) {
                skip++;
            } else {
                if (skip) {
                    line += skip;
                    skip = 0;
                }
                line += figure;
            }
        }
        if (skip) {
            line += skip;
        }

        return line;
    }

    // получение внутреннего состояния в удобном виде

    // для генерации выходных данных
    _getASCIIFigure(col, row) {
        const mask = this._colRowToBitBoard(col, row);

        if ((this._whites & mask) === mask) {
            for (let i = 0; i < 6; i++) {
                if ((this[vars[i]] & mask) === mask) {
                    return figures[i];
                }
            }
        }
        if ((this._blacks & mask) === mask) {
            for (let i = 6; i < 12; i++) {
                if ((this[vars[i]] & mask) === mask) {
                    return figures[i];
                }
            }
        }
        return '.';
    }

    _isEmptyCeil(asciiFigure) {
        return asciiFigure === '.';
    }

    // для выполнения хода
    _getFigureVar(col, row) {
        const mask = this._colRowToBitBoard(col, row);

        if ((this._whites & mask) === mask) {
            for (let i = 0; i < 6; i++) {
                if ((this[vars[i]] & mask) === mask) {
                    return vars[i];
                }
            }
        }
        if ((this._blacks & mask) === mask) {
            for (let i = 6; i < 12; i++) {
                if ((this[vars[i]] & mask) === mask) {
                    return vars[i];
                }
            }
        }
        return null;
    }

    _isPawn(figureVar) {
        return figureVar === '_whitePawns' || figureVar === '_blackPawns';
    }

    // прочие методы получения внутреннего состояния в удобном виде

    // маска для проверки - можно ли ходить в эту клетку
    _stepMask(color) {
        return color === 'w' ? this._whites : this._blacks;
    }

    // маска для проверки - была ли фигура противника в клетке
    _oppositeStepMask(color) {
        return color === 'w' ? this._blacks : this._whites;
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

    // изменение внутреннего состояния

    // переставляем фигуру
    _moveFigure(figureVar, startMask, endMask) {
        this[figureVar] &= ~startMask;
        this[figureVar] |= endMask;
    }

    // превращение пешки
    _promotionPawn(figureVar, startMask, endMask, promotion) {
        // снимаем пешку
        this[figureVar] &= ~startMask;
        // находим переменную с bitBoard для новой фигуры
        const index = figures.indexOf(promotion);
        // добавляем новую фигуру
        this[vars[index]] |= endMask;
    }

    // снимаем фигуру
    _takeFigure(endCeilFigureVar, endMask) {
        if (endCeilFigureVar) {
            this[endCeilFigureVar] &= ~endMask;
        }
    }

    // ход - взятие пешки на проходе
    _isTakeOnPass(figureVar, step) {
        return this._isPawn(figureVar) && step.substr(2, 2) === this._pawnOnPass;
    }

    _changePawnOnPass(figureVar, startCol, startRow, endRow) {
        if (this._isPawnJump(figureVar, startCol, startRow, endRow)) {
            this._pawnOnPass = this._colRowToStep(startCol, (startRow + endRow) >> 1);
        } else {
            this._clearPawnOnPass();
        }
    }

    // надо ли сохранить поле для взятия пешки на проходе
    _isPawnJump(figureVar, startCol, startRow, endRow) {
        if (!this._isPawn(figureVar)) {
            return false;
        }
        if (Math.abs(startRow - endRow) !== 2) {
            return false;
        }
        const oppositePawns = this._nextStep === 'w' ? this._blackPawns : this._whitePawns;
        return (startCol > 0 && ((oppositePawns & this._colRowToBitBoard(startCol - 1, endRow)) !== 0n)) ||
            (startCol < 7 && ((oppositePawns & this._colRowToBitBoard(startCol + 1, endRow)) !== 0n));
    }

    _clearPawnOnPass() {
        this._pawnOnPass = '-';
    }

    _changeHalfSteps(figureVar, endCeilFigureVar) {
        if (this._isPawn(figureVar) || endCeilFigureVar) {
            this._halfSteps = 0;
        } else {
            this._halfSteps++;
        }
    }

    _changeTurn() {
        if (this._nextStep === 'w') {
            this._nextStep = 'b';
        } else {
            this._nextStep = 'w';
            this._stepNum++;
        }
    }

    // подсчет вспомогательной маски всех белых фигур
    _calcWhitesAndBlacksBB() {
        this._whites = this._whitePawns |
            this._whiteKnights |
            this._whiteBishops |
            this._whiteRooks |
            this._whiteQueens |
            this._whiteKing;
        this._blacks = this._blackPawns |
            this._blackKnights |
            this._blackBishops |
            this._blackRooks |
            this._blackQueens |
            this._blackKing;
    }

    // преобразования между форматами

    _colRowToBitBoard(col, row) {
        return 1n << BigInt(row * 8 + col);
    }

    _ceilToBitBoard(ceil) {
        return 1n << BigInt(ceil);
    }

    _colRowToStep(col, row) {
        return String.fromCharCode('a'.charCodeAt(0) + col) + (row + 1);
    }
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
