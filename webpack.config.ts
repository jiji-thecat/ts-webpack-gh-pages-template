const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: './dist',
    },
  },
  entry: ['./src/index.ts', './src/styles.css'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.png/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      scriptLoading: 'defer',
    }),
    new CopyPlugin({
      patterns: [{ from: 'assets', to: 'assets' }],
    }),
  ],
};
