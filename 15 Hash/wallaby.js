module.exports = function () {
    return {
        files: [
            'src/*.js',
            'test/*',
            '!test/*.test.js'
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
