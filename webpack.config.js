const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 打包之前删除webpack缓存
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 会自动生成html 并引入entry里面的文件
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name]-[chunkhash].js'
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ]
}