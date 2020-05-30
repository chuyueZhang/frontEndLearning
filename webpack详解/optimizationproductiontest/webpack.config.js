const {resolve} = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const workboxWebpackPlugin = require('workbox-webpack-plugin')
module.exports = {
    entry: {
        index: './src/js/index.js',
        main: './src/js/main.js'
    },
    output: {
        filename: './js/[name].[contenthash].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.less$/,
                        use: ['style-loader', 'css-loader', 'less-loader']},
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [{
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                presets: [
                                    ['@babel/preset-env', {
                                        useBuiltIns: 'usage',
                                        corejs: 3
                                    }]
                                ]
                            }
                        }, {
                            loader: 'eslint-loader',
                             options: {
                                fix: true
                             }
                        }]
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname, 'dll/manifest.json')
        }),
        new addAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/*.dll.js'),
            outputPath: 'dll',
            publicPath: 'dll'
        }),
        new workboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

}