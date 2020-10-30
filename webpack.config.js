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
        module: {
            rules: [{
                test: '/\.js/',
                exclude: '/node_modules/',
                // loader: 'babel-loader',     //这是简写 从右至左
                // options: {},
                use: [ //使用use 完整写法
                    {
                        loader: 'babel-loader',
                        // options: { // 也可创建一个.babelrc文件配置
                        //     "preset": [
                        //         [
                        //             "@babel/preset-env",
                        //             {
                        //                 targets: {
                        //                     edge: '17',
                        //                     ie: ">= 8",
                        //                     chrome: "64"
                        //                 },
                        //                 "useBuiltIns": "usage",
                        //                 "corejs": 2
                        //             }
                        //         ]
                        //     ]
                        // }
                    },
                ]
            }]
        },
        externals: {
            jquery: 'jQuery' // 不常更新的外部文件不需要打包 1. html引入CDN的资源
        },
        mode: 'production',
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin()
        ]
    }
    // @babel/core是babel的核心库，所有的核心Api都在这个库里，这些Api供babel-loader调用

// @babel/preset-env 这是一个预设的插件集合，包含了一组相关的插件，Bable中是通过各种插件来指导如何进行代码转换。
// 该插件包含所有es6转化为es5的翻译规则
// 我们需要转换哪些新的语法，都可以将相关的插件一一列出，但是这其实非常复杂，
// 因为我们往往需要根据兼容的浏览器的不同版本来确定需要引入哪些插件，为了解决这个问题，
// babel给我们提供了一个预设插件组，即@babel/preset-env

// @babel/polyfill：浏览器缺失的一些新的功能，如一些内置的方法和对象，如Promise,Array.from等，此时就需要polyfill来做js得垫片，弥补低版本浏览器缺失的这些新功能。
// polyfill的体积是很大的，如果我们不做特殊说明，它会把你目标浏览器中缺失的所有的es6的新的功能都做垫片处理。
// 但是我们没有用到的那部分功能的转换其实是无意义的，造成打包后的体积无谓的增大
// ，所以通常，我们会在presets的选项里，配置"useBuiltIns": "usage",
// 这样一方面只对使用的新功能做垫片，另一方面，也不需要我们单独引入import '@babel/polyfill'了，它会在使用的地方自动注入

// babel-loader: webpack并不知道应该怎么去调用这些规则去编译js。这时就需要babel-loader了，
// 它作为一个中间桥梁，通过调用babel/core中的api来告诉webpack要如何处理js。