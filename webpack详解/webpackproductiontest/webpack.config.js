const {resolve} = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const commonCssConfig = [miniCssExtractPlugin.loader, 'css-loader', {
    loader: 'postcss-loader',
    options: {
        plugins: () => [require('postcss-preset-env')]
    }
}]

// process.env.NODE_ENV = 'production'

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/bundle.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: commonCssConfig
            }, {
                test: /\.less$/,
                use: [...commonCssConfig, 'less-loader']
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                useBuiltIns: 'usage',
                                corejs: 3,
                            }]
                        ]
                    }
                }, {
                    loader: 'eslint-loader',
                    options: {
                        fix: true
                    }
                }]
            }, {
                test: /\.(png|jpg|gif|jpeg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8*1024,
                    outputPath: 'img'
                }
            }, {
                test: /\.html/,
                loader: 'html-loader'
            },{
                exclude: /\.(js|css|less|png|gif|jpg|jpeg|html)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets'
                }
            }
        ]
    },
    plugins: [new htmlWebpackPlugin({
        template: resolve(__dirname, 'src/index.html'),
        minify: true,
        filename: 'index.html'
    }), new miniCssExtractPlugin({
        filename: 'css/main.css'
    })],
    mode: 'production'
}
//, new optimizeCSSAssetsWebpackPlugin()