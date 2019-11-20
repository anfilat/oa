const ShellGaps = [131072, 65536, 32768, 6384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1];
const KnuthGaps = [265720, 88573, 29524, 9841, 3280, 1093, 364, 121, 40, 13, 4, 1];
const SedgewickGaps = [146305, 64769, 36289, 16001, 8929, 3905, 2161, 929, 505, 209, 109, 41, 19, 5, 1];
const TokudaGaps = [153401, 68178, 30301, 13467, 5985, 2660, 1182, 525, 233, 103, 46, 20, 9, 4, 1];

function shell(array, gaps) {
    const n = array.length;
    gaps.forEach(gap => {
        for (let i = gap; i < n; i++) {
            const temp = array[i];
            let j = i;
            for (; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
            }
            array[j] = temp;
        }
    });
    return array;
}

module.exports = {
    shell,
    ShellGaps,
    KnuthGaps,
    SedgewickGaps,
    TokudaGaps
};
