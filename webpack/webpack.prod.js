const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  }
  // ,
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env.DEBUG_INFO_ENABLED': `'production'`,
  //     'process.env.GATEWAY_SERVER_API_URL': JSON.stringify('http://localhost:3000/api/v1'),
  //     'process.env.GATEWAY_SERVER_API_TOKEN': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjVmODM0NC0yNGFmLTQ4NzktYTI3My1hN2ZlMGU5ZTJmOGEiLCJlbWFpbCI6IkVhY2hhd3lAZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3NjY2MDcxNTcsImV4cCI6MTc2NjYwODA1N30.6rDAQsPJ3hXDq0_IH4uQtNT3jUwHG_nnr5Mev60VuX8'),
  //   })
  // ]
});
