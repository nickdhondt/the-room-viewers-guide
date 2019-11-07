const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './app/js/app.js',
        styles: './app/css/screen.css',
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './app/index.html',
            filename: './index.html'
        })
    ],
    module: {
        rules: [{
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: "[hash].[name].[ext]"
                    }
                }]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    }
};