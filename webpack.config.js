/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const COMPONENTS_EXTERNALS = require('jamespot-react-components/externals.json');
const CORE_EXTERNALS = require('jamespot-react-core/externals.json');

const EXTERNALS = { ...COMPONENTS_EXTERNALS, ...CORE_EXTERNALS };

module.exports = (env) => {
  const NODE_ENV = env.NODE_ENV ?? 'production';
  const devServerPort = 3040;

  const plugins = [];
  if (NODE_ENV === 'development') {
    plugins.push(
      new ForkTsCheckerWebpackPlugin({
        async: true,
        typescript: {
          configFile: 'tsconfig.json',
          memoryLimit: 4096,
          diagnosticOptions: { semantic: false, syntactic: true },
          mode: 'readonly',
        },
      }),
    );
  }

  return {
    mode: NODE_ENV,
    devtool: NODE_ENV === 'production' ? 'inline-source-map' : 'eval-source-map',
    entry: { app: './src/App.tsx' },
    plugins,
    externals: EXTERNALS,
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
          },
        },
      ],
    },
    output: {
      clean: { keep: /(\.d\.ts)|\.tsbuildinfo/ },
      path: path.resolve(__dirname, 'build'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].[contenthash].chunk.js',
      publicPath:
        env.MODE === 'theme'
          ? '/themes/EXT-reactjs/js/bundle/'
          : NODE_ENV === 'development'
            ? `http://localhost:${devServerPort}/`
            : '/',
    },
    devServer: {
      port: devServerPort,
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
};
