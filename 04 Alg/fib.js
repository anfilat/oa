function fibRec(n) {
    if (n < 3) {
        return 1;
    }
    return fibRec(n - 1) + fibRec(n - 2);
}

function fibIter(n) {
    let f = 1;
    let fMinus1 = 1;
    for (let i = 3; i <= n; i++) {
        const newF = f + fMinus1;
        fMinus1 = f;
        f = newF;
    }
    return f;
}

function fibIterBig(n) {
    let f = 1n;
    let fMinus1 = 1n;
    for (let i = 3; i <= n; i++) {
        const newF = f + fMinus1;
        fMinus1 = f;
        f = newF;
    }
    return f;
}

const phi = (1 + Math.sqrt(5)) / 2;
const sqrt5 = Math.sqrt(5);

function fibGoldenSection(n) {
    return Math.floor(0.5 + Math.pow(phi, n) / sqrt5);
}

function fibMatrix(n) {
    function multiply(m, n) {
        return [
            m[0]*n[0] + m[1]*n[2],
            m[0]*n[1] + m[1]*n[3],
            m[2]*n[0] + m[3]*n[2],
            m[2]*n[1] + m[3]*n[3],
        ];
    }

    if (n < 3) {
        return 1;
    }

    n -= 2;
    let base = [0, 1, 1, 1];
    let res = [0, 1, 1, 1];
    while (n > 1) {
        if (n % 2 === 1) {
            res = multiply(res, base);
        }
        base = multiply(base, base);
        n = (n / 2) | 0;
    }
    if (n > 0) {
        res = multiply(res, base);
    }
    return res[3];
}

module.exports = {
    fibRec,
    fibIter,
    fibIterBig,
    fibGoldenSection,
    fibMatrix,
};
