const path = require('path');
const webpack = require('webpack')

module.exports = {
  target: 'node',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'client_bundle.js',
    path: path.resolve(__dirname, 'build/public'),
    publicPath: '/build/public'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        options: {
          presets: [
            'react',
            'stage-0',
            "es2015",
            ['env', {
              target: {
                browsers: ['last 2 versions']
              }
            }]
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      "regenerator": true
    }),
  ],

};