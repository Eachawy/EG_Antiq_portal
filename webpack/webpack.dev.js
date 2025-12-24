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
  }
  // ,
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': `'development'`,
  //     'process.env.GATEWAY_SERVER_API_URL': JSON.stringify('http://localhost:3000/api/v1'),
  //     'process.env.GATEWAY_SERVER_API_TOKEN': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjVmODM0NC0yNGFmLTQ4NzktYTI3My1hN2ZlMGU5ZTJmOGEiLCJlbWFpbCI6IkVhY2hhd3lAZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3NjY2MDcxNTcsImV4cCI6MTc2NjYwODA1N30.6rDAQsPJ3hXDq0_IH4uQtNT3jUwHG_nnr5Mev60VuX8'),
  //   })
  // ]
});
