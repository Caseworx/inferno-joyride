/*eslint-disable func-names, prefer-arrow-callback, object-shorthand, no-console, prefer-template */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const webpackConfig = require('./webpack.config');

const config = merge.smart(webpackConfig, {
  entry: {
    'scripts/app': './scripts/index.jsx',
    'scripts/modernizr': './scripts/vendor/modernizr-custom.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
  },
  devtool: 'source-map',
  plugins: [
    new CleanPlugin(['dist'], { root: path.join(__dirname, '../') }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractText('styles/app.[hash].css'),
    new HtmlPlugin({
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      mobile: true,
      template: './index.ejs',
      title: 'React Joyride',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: '/',
        postcss: function() {
          return {
            defaults: [autoprefixer],
            custom: [
              autoprefixer({
                browsers: [
                  'ie >= 9',
                  'ie_mob >= 10',
                  'ff >= 30',
                  'chrome >= 34',
                  'safari >= 7',
                  'opera >= 23',
                  'ios >= 7',
                  'android >= 4.4',
                  'bb >= 10',
                ],
              }),
            ],
          };
        },
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: true,
        keep_fnames: false,
      },
      compress: {
        booleans: true,
        conditionals: true,
        dead_code: true, // big one--strip code that will never execute
        evaluate: true,
        screw_ie8: true,
        unused: true,
        warnings: false, // good for prod apps so users can't peek behind curtain
      },
      comments: false,
      sourceMap: true,
    }),
  ],
  watch: false,
});

module.exports = config;
