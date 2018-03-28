'use strict';

const path = require('path');

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  context: src,

  entry: {
    // vendor: [
    //   'zepto/dist/zepto.min.js',
    //   './js/zepto.fullpage.js',
    // ],
    app: ['./js/app.js'],
  },

  output: {
    filename: '[name].[hash].js',
    path: dist
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ['env']
        }
      },
      {
        test: require.resolve('zepto'),
        loader: 'exports-loader?window.Zepto!script-loader'
      },
      {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/png',
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },

  resolve: {
    alias: {
      images: path.resolve(src, './images'),
      css: path.resolve(src, './css')
    }
  },

  plugins: [
    new CleanWebpackPlugin([dist]),
    // new webpack.ProvidePlugin({ $: 'zepto/dist/zepto.min.js' }),
    new ExtractTextPlugin('[contenthash].css'),
    new HtmlWebpackPlugin({
      template: path.join(src, 'index.html'),
    }),
    new UglifyJSPlugin(),
  ]
};