import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'

const nextConfig: NextConfig = {
  webpack: (config: Configuration, { dev, isServer }) => {
    // Load the appropriate webpack config based on environment
    const customWebpackConfig = dev
      ? require('./webpack/webpack.dev.js')
      : require('./webpack/webpack.prod.js')

    // Merge custom webpack config with Next.js webpack config
    if (customWebpackConfig.module?.rules) {
      config.module = config.module || { rules: [] }
      config.module.rules = [...(config.module.rules || []), ...customWebpackConfig.module.rules]
    }

    if (customWebpackConfig.resolve) {
      config.resolve = {
        ...config.resolve,
        ...customWebpackConfig.resolve,
        extensions: [
          ...(config.resolve?.extensions || []),
          ...(customWebpackConfig.resolve.extensions || []),
        ],
        alias: {
          ...config.resolve?.alias,
          ...customWebpackConfig.resolve.alias,
        },
      }
    }

    if (customWebpackConfig.optimization && !isServer) {
      config.optimization = {
        ...config.optimization,
        ...customWebpackConfig.optimization,
      }
    }

    if (customWebpackConfig.devtool) {
      config.devtool = customWebpackConfig.devtool
    }

    return config
  },
  sassOptions: {
    includePaths: ['./styles'],
  },
}

export default nextConfig
