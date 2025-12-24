import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  env: {
    GATEWAY_SERVER_API_URL: process.env.NODE_ENV === 'production'
      ? 'http://localhost:3000/api/v1'
      : 'http://localhost:3000/api/v1',
    GATEWAY_SERVER_API_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjVmODM0NC0yNGFmLTQ4NzktYTI3My1hN2ZlMGU5ZTJmOGEiLCJlbWFpbCI6IkVhY2hhd3lAZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3NjY2MDgyMTEsImV4cCI6MTc2NjYwOTExMX0.bQ50YWgZAKIuU7XqmxExoC0Voap9J7DKUsLQtrDPNRg',
  },
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

export default withNextIntl(nextConfig)
