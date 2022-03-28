// eslint-disable-next-line no-undef
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    transform: {
        'src/.+\\.(j|t)sx?$': 'ts-jest',
    },
    setupFiles: ['<rootDir>/jest.setup.tsx'],
    moduleDirectories: ['src', 'node_modules'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    moduleNameMapper: {
        '\\.(less)$': 'identity-obj-proxy',
        '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: ['/node_modules/*', '\\.pnp\\.[^\\/]+$'],
    cacheDirectory: './node_modules/.cache/jest',
};
