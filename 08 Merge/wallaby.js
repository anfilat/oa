module.exports = function () {
    return {
        files: [
            'src/*.js',
            'externalUtils.js'
        ],

        tests: [
            'test/*.test.js'
        ],

        env: {
            type: 'node'
        },

        testFramework: 'jest'
    };
};
