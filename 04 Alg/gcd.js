function gcdMinus(a, b) {
    if (a === 0) {
        return b;
    }
    if (b === 0) {
        return a;
    }

    while (a !== b) {
        if (a > b) {
            a -= b;
        } else {
            b -= a;
        }
    }
    return a;
}

function gcdDiv(a, b) {
    while (b !== 0) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
}

// https://en.wikipedia.org/wiki/Binary_GCD_algorithm
function gcdBinary(a, b) {
    if (a === b) {
        return a;
    }
    if (a === 0) {
        return b;
    }
    if (b === 0) {
        return a;
    }

    let shift = 0;

    while (((a | b) & 1) === 0) {
        shift++;
        a >>= 1;
        b >>= 1;
    }
    while ((a & 1) === 0) {
        a >>= 1;
    }
    do {
        while ((b & 1) === 0) {
            b >>= 1;
        }

        if (a > b) {
            const t = a;
            a = b;
            b = t;
        }

        b -= a;
    } while (b !== 0);

    return a << shift;
}

exports.gcdMinus = gcdMinus;
exports.gcdDiv = gcdDiv;
exports.gcdBinary = gcdBinary;
