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
      'process.env.DEBUG_INFO_ENABLED': options.env === 'development',
      'process.env.GATEWAY_SERVER_API_URL': JSON.stringify('http://localhost:3000/api'),
    })
  ]
});
