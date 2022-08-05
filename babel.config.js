// eslint-disable-next-line no-undef
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
            },
        ],
        '@babel/preset-typescript',
        '@babel/preset-react',
    ],
    plugins: [
        [
            'babel-plugin-styled-components',
            {
                pure: true,
                namespace: 'jamespot-react',
            },
        ],
    ],
};
