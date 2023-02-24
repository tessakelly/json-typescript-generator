const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputDir = 'docs';

module.exports = {
  entry: './src/app.tsx',
  output: {
    path: __dirname + '/' + outputDir,
    filename: 'app.[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
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
          loader: 'babel-loader'
        }, {
          loader: 'ts-loader'
        }]
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }]
      }
    ]
  }
}
