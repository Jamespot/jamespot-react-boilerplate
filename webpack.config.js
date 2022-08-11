/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const COMPONENTS_EXTERNALS = require('./node_modules/jamespot-react-components/externals.json');
const CORE_EXTERNALS = require('./node_modules/jamespot-react-core/externals.json');
const EXTERNALS = { ...COMPONENTS_EXTERNALS, ...CORE_EXTERNALS };

module.exports = (env) => ({
    mode: env.NODE_ENV || 'none',
    watch: env.WATCH === 'true' ? true : false,

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    devServer: {
        hot: true,
        port: 3041,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.(jpe?g|png|gif|bmp|svg|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    externals: EXTERNALS,
    entry: {
        app: './src/App.tsx',
    },
    output: {
        clean: true,
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath:
            env.NODE_ENV === 'production' || (env.NODE_ENV === 'development' && env.NODE_RUN === 'VM')
                ? '/react-extensions/'
                : env.NODE_ENV === 'development'
                ? 'http://localhost:3041/'
                : /* env.NODE_ENV === "theme" */ '/themes/EXT-reactjs/js/jamespot-react-core/',
    },
});
