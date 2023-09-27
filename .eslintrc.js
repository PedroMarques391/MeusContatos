module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: 'airbnb-base',
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                '.eslintrc.{js,cjs}',
            ],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'linebreak-style': 'off',
        'class-methods-use-this': 'off',
        'no-console': 'off',
        indent: ['error', 4],
        'import/no-extraneous-dependencies': 'off',
        'consistent-return': 'off',
        'no-promise-executor-return': 'off',
        'no-unused-vars': ['error', { argsIgnorePatters: 'next' }],
    },

};
