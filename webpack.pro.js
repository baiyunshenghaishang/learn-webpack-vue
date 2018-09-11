const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const srcPath = path.resolve(__dirname, 'src')
const baseConfig = require('./webpack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:6].js'
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        include: srcPath,
        //抽取css，每个chunk都会抽取一个。可以在splitChunks中配置成只抽取一个css，感觉意义不大，因为其它chunk的css多半来自ui库和懒加载组件
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] 
      }
    ]
  },
  optimization: {
    // 压缩css和js。重写minimizer会覆盖原有的默认压缩js选项，所以此处需要在加上js压缩
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    // 抽取chunk配置，此处只配置了把node_modules下的包抽取成一个chunk
    // moment好像可以通过插件减小打包体积，此处没有处理
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10
        }
        // 尝试将不同的第三方包分别抽取成一个chunk，可行
        // moment: {
        //   name: 'moment',
        //   test: /[\\/]node_modules[\\/]moment/,
        //   chunks: 'all',
        //   priority: 10
        // },
        // vue: {
        //   name: 'vue',
        //   test: /[\\/]node_modules[\\/]vue/,
        //   chunks: 'all',
        //   priority: 10
        // },
        // lodash: {
        //   name: 'lodash',
        //   test: /[\\/]node_modules[\\/]lodash/,
        //   chunks: 'all',
        //   priority: 10
        // }
      }
    },
    // 将runtimeChunk单独抽取成一个文件
    runtimeChunk: 'single'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // 抽取css的文件名
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:6].css'
    }),
    // 用于module数量改变时导致的module的id发生变化，导致打包后chunk文件hash变化的问题。webpack默认使用自增的id，所以module数量发生变化时，module的id可能发生变化
    // 此插件以文件路径为基础进行hash作为id，所以增加或删除module时module的id不会发生变化
    new webpack.HashedModuleIdsPlugin(),
    // 解决chunk数量发生变化时chunk的hash变化的问题。chunk的id默认也是使用自增的id，所以chunk数量发生变化时，chunk的id也可能发生变化
    // 据说在使用路由懒加载时，此插件无效，chunk的hash还是会变化，但是未发现此问题，所以没有配置相关
    // 参考路径 https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651554816&idx=1&sn=4eab9c16f1371c1b3f8c2f0791bd8fdf&chksm=802553c1b752dad72ab5878dd4d4f574cee9de5c3be1249c7c71df5816cdd9d060d26b13d522&mpshare=1&scene=1&srcid=0830cywQFe36acSBbyMOLemq#rd
    new webpack.NamedChunksPlugin(),
    // 将runtime插入到html，因为runtimeJs很小，不需要单独引入
    new ScriptExtHtmlWebpackPlugin({
      inline: /runtime..*.js$/
    })
  ]
})
