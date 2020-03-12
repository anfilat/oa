//https://e-maxx.ru/algo/prefix_function
function kmp(text, pattern) {
    if (pattern === '') {
        return 0;
    }
    if (pattern.length > text.length || text === '') {
        return -1;
    }

    const pi = makePi(pattern);
    const len = text.length;

    let patternPos = 0;
    for (let textPos = 0; textPos < len; textPos++) {
        while (patternPos > 0 && text[textPos] !== pattern[patternPos]) {
            patternPos = pi[patternPos - 1];
        }
        if (text[textPos] === pattern[patternPos]) {
            patternPos++;
        }
        if (patternPos === pattern.length) {
            return textPos + 1 - pattern.length;
        }
    }

    return -1;
}

function makePi(pattern) {
    const len = pattern.length;
    const pi = [0];

    for (let i = 1; i < len; i++) {
        let q = pi[i - 1];
        while (q > 0 && pattern[i] !== pattern[q]) {
            q = pi[q - 1];
        }
        if (pattern[i] === pattern[q]) {
            q++;
        }
        pi[i] = q;
    }

    return pi;
}

module.exports = kmp;
