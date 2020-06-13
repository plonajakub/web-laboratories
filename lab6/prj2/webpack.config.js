const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: path.resolve(__dirname, 'dist/index.html')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/subpage.html'),
      filename: path.resolve(__dirname, 'dist/subpage.html')
    }),
    new MiniCssExtractPlugin({
      filename: '../style/style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Extracts CSS into separate file
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};