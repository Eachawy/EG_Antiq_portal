const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    minimize: false,
  },
  cache: {
    type: 'filesystem',
  },
  stats: {
    errorDetails: true,
    warnings: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'development'`,
      'process.env.GATEWAY_SERVER_API_URL': JSON.stringify('http://localhost:3000/api'),
    })
  ]
});
