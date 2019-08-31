const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

const outputDir = 'docs';

const babelOptions = {
  presets: [
    'react',
    [
      'es2015',
      {
        modules: false
      }
    ],
    'es2016'
  ]
};

module.exports = {
  entry: './src/app.tsx',
  output: {
    path: __dirname + '/' + outputDir,
    filename: 'app.[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin([outputDir]),
    new HtmlWebpackPlugin({
      template: 'index.template.html',
      inject: 'body'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: babelOptions
        }, {
          loader: 'ts-loader'
        }]
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader",
            options: {
              includePaths: ['node_modules']
            }
        }]
      }
    ]
  }
}
