const path = require('path');

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {loose: true, modules: false}]
          ]
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    publicPath: '/dist/'
  }
}
