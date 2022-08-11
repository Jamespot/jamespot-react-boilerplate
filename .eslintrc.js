// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-namespace': ['off'],
        '@typescript-eslint/no-empty-interface': ['off'],
        '@typescript-eslint/ban-types': ['off'],
        'no-case-declarations': ['off'],
        'no-console': ['error', { allow: ['warn', 'error'] }],
    },
};