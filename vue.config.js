const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const PreloadPlugin = require('@vue/preload-webpack-plugin')
const { isDevelopment } = require('./src/config')
const pages = require('./getPages')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: isDevelopment,
  productionSourceMap: false,
  transpileDependencies: true,
  pages,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "~@style/variables";
        `,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@api': resolve('src/api'),
        '@util': resolve('src/utils'),
        '@style': resolve('src/styles'),
        '@plugin': resolve('src/plugins'),
        '@comp': resolve('src/components'),
      },
      extensions: [
        '.mjs',
        '.js',
        '.jsx',
        '.vue',
        '.json',
        '.wasm',
        'js',
        'jsx',
        'ts',
        'tsx',
        'css',
        'scss',
        'vue',
      ],
    },
    cache: {
      // 将缓存类型设置为文件系统,默认是memory
      type: 'filesystem',
      buildDependencies: {
        // 更改配置文件时，重新缓存
        config: [__filename],
      },
    },
    optimization: {
      // 值为"single"会创建一个在所有生成chunk之间共享的运行时文件
      runtimeChunk: 'single',
      // 用来保证模块的id不会随着解析顺序的变化而变化
      moduleIds: 'deterministic',
    },
  },
  chainWebpack(config) {
    // 利用 splitChunks 单独打包第三方模块
    config.when(!isDevelopment, config => {
      // 防止多页面打包卡顿
      config.plugins.delete('named-chunks')

      // 预读取，当有很多页面时，会导致太多无意义的请求
      config.plugins.delete('prefetch')

      Object.keys(pages).forEach(page => {
        // 预加载，它可以提高第一屏的速度，建议打开
        config
          .plugin('preload-' + page)
          .use(PreloadPlugin, [
            {
              rel: 'preload',
              // 添加忽略 runtime.js，vue-cli默认没有 runtime
              fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
              include: 'initial',
              as(entry) {
                if (/\.css$/.test(entry)) return 'style'
                return 'script'
              },
            },
          ])
          .after('html')

        // 预读取，当有很多页面时，会导致太多无意义的请求
        config.plugins.delete('prefetch-' + page)
      })

      // 防止多页面打包卡顿
      config.plugins.delete('named-chunks')
      // 删除生产环境下的console和debugger
      config.optimization
        .minimize(true)
        .minimizer('terser')
        .tap(args => {
          let { terserOptions } = args[0]
          terserOptions.compress.drop_console = true
          terserOptions.compress.drop_debugger = true
          return args
        })
      // 利用 splitChunks 单独打包第三方模块
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          common: {
            name: 'chunk-common',
            minChunks: 2,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true,
          },
          elementUI: {
            name: 'chunk-elementui',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true,
          },
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
            chunks: 'all',
            priority: 4,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      })
    })
  },
  devServer: {
    open: true,
    devMiddleware: {
      serverSideRender: true,
      writeToDisk: true,
    },
    allowedHosts: 'all',
    // 后续加上
    onBeforeSetupMiddleware: require('./mocks'),
  },
})
