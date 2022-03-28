// eslint-disable-next-line no-undef
module.exports = {
    presets: ['@babel/preset-env'],
    plugins: [
        [
            'babel-plugin-styled-components',
            {
                pure: true,
                namespace: 'jamespot-react',
            },
        ],
        ["@babel/plugin-transform-runtime"]
    ],
};
