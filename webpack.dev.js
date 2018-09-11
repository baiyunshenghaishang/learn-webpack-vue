const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const srcPath = path.resolve(__dirname, 'src')
const baseConfig = require('./webpack.config')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool:'cheap-eval-source-map',
  output: {},
  devServer: {
    hot: true,  //vue热加载需要使用vue-loader，仅仅开启hot是没用的，开启hot需要HotModuleReplacementPlugin插件
    open: true, //自动打开浏览器
    host:'0.0.0.0',
    useLocalIp:true,
    overlay: true  //页面报错时在页面上显示错误信息
  },
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        include: srcPath,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
