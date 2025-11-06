/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const COMPONENTS_EXTERNALS = require('jamespot-react-components/externals.json');
const CORE_EXTERNALS = require('jamespot-react-core/externals.json');

const EXTERNALS = { ...COMPONENTS_EXTERNALS, ...CORE_EXTERNALS };

const NODE_ENV = process.env.NODE_ENV === 'development' ? process.env.NODE_ENV : 'production';

const plugins = [];
if (NODE_ENV === 'development') {
  plugins.push(
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        configFile: 'tsconfig.json',
        memoryLimit: 4096,
        diagnosticOptions: {
          semantic: false,
          syntactic: true,
        },
        mode: 'readonly',
      },
    }),
  );
}

const configuration = {
  mode: NODE_ENV,
  devtool: NODE_ENV === 'production' ? 'inline-source-map' : 'eval-source-map',
  devServer: {
    hot: true,
    port: 3040,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: ['**/node_modules/**', '**/build/**', '**/docs/**', '**/production/**'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: NODE_ENV === 'development',
            experimentalFileCaching: true,
            configFile: 'tsconfig.json',
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|bmp|svg|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        loader: 'asset/resource',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'assets',
          publicPath: process.env.PUBLIC_PATH,
        },
      },
    ],
  },
  plugins,
  externals: EXTERNALS,
  entry: {
    app: './src/App.tsx',
  },
  output: {
    clean: {
      keep: /(\.d\.ts)|\.tsbuildinfo/,
    },
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js',
    publicPath:
      NODE_ENV === 'production' || (NODE_ENV === 'development' && process.env.NODE_RUN === 'VM')
        ? '/react-extensions/'
        : NODE_ENV === 'development'
          ? 'http://localhost:3040/'
          : '/themes/EXT-reactjs/js/jamespot-react-core/',
  },
};

module.exports = configuration;
