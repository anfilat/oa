// https://dic.academic.ru/dic.nsf/ruwiki/614126
// https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC_%D0%91%D0%BE%D0%B9%D0%B5%D1%80%D0%B0_%E2%80%94_%D0%9C%D1%83%D1%80%D0%B0
function boyermoore(text, pattern) {
    if (pattern === '') {
        return 0;
    }
    if (pattern.length > text.length || text === '') {
        return -1;
    }

    const prefix = makePrefixTable(pattern);
    const suffix = makeSuffixTable(pattern);

    for (let textPos = 0; textPos <= text.length - pattern.length; ) {
        let patternPos = pattern.length - 1;
        while (pattern[patternPos] === text[patternPos + textPos]) {
            if (patternPos === 0) {
                return textPos;
            }
            patternPos--;
        }
        textPos += Math.max(
            suffix[patternPos + 1],
            patternPos - prefix[text.charCodeAt(patternPos + textPos)]
        );
    }

    return -1;
}

function makePrefixTable(pattern) {
    // для юникода (charCodeAt() всегда возвращает значение, меньшее 65536)
    const prefix = new Int16Array(2 ** 16).fill(-1);

    for (let i = 0; i < pattern.length - 1; i++) {
        prefix[pattern.charCodeAt(i)] = i;
    }

    return prefix;
}

function makeSuffixTable(pattern) {
    const m = pattern.length;
    const suffix = new Int16Array(m + 1).fill(m);
    const z = new Int16Array(m);

    for (let j = 1, maxZidx = 0, maxZ = 0; j < m; ++j) {
        if (j <= maxZ) {
            z[j] = Math.min(maxZ - j + 1, z[j - maxZidx]);
        }
        while (j + z[j] < m && pattern[m - 1 - z[j]] === pattern[m - 1 - (j + z[j])]) {
            z[j]++;
        }
        if (j + z[j] - 1 > maxZ) {
            maxZidx = j;
            maxZ = j + z[j] - 1;
        }
    }
    for (let j = m - 1; j > 0; j--) {
        suffix[m - z[j]] = j;
    }
    for (let j = 1, r = 0; j <= m - 1; j++) {
        if (j + z[j] === m) {
            for (; r <= j; r++)
                if (suffix[r] === m) {
                    suffix[r] = j;
                }
        }
    }

    return suffix;
}

module.exports = boyermoore;
