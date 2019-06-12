const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.css$/,
            use: ['style-loader', 'css-loader']},
            {test:/\.(png|img|jpg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }}
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'})
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist/js/')
    }
}