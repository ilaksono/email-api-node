const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const webpack = require('webpack')

module.exports = {
  target: 'node',
  entry: './server/server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build'
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
  externals: [webpackNodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
};