const {resolve} = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        jquery: ['JQUERY']
    },
    output: {
        filename: './[name].dll.js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: resolve(__dirname, 'dll/manifest.json')
        })
    ],
    mode: 'production'
}