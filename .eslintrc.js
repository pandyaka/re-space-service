module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:jest/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended'
    ],
    plugins: ['filenames'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: ['tsconfig.json', '.eslintrc.js']
    },
    rules: {
        'import/no-default-export': 'error',
        'import/no-named-default': 'off',
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        'class-methods-use-this': 'warn',
        'filenames/match-regex': [2, '^[0-9a-z-.]+$', true],
        'no-param-reassign': ['error', { props: false }]
    },
    env: {
        'jest/globals': true
    }
};
