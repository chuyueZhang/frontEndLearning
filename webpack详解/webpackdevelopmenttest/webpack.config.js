const {resolve} = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(png|jpg|jpeg)$/,
            loader: 'url-loader',
            options: {
                limit: 8 * 1024,
                name: '[hash:10].[ext]'
            }
        },{
            test: /\.html$/,
            loader: 'html-loader'
        },{
            exclude: /\.(js|html|jpg|png|jpeg|css|less)$/,
            loader: 'url-loader',
            options: {
                limit: 8*1024,
                name: '[hash:10].[ext]'
            }
        }]
    },
    plugins: [new htmlWebpackPlugin({
        template: resolve(__dirname, 'index.html')
        //HMR相关, 在优化开发环境配置中讲述
    }), new webpack.HotModuleReplacementPlugin()],
    mode: 'development',
    //source map相关, 在优化开发环境配置中讲述
    devtool: 'eval-source-map',
    devServer: {
        //指定服务器根目录
        contentBase: './src',
        open: true,
        hot: true
    }
}