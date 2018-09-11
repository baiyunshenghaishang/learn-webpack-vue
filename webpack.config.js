const path = require('path')
const srcPath = path.resolve(__dirname, 'src')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: srcPath,
        use: 'vue-loader' 
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: srcPath,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: srcPath,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // 自动生成html
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
