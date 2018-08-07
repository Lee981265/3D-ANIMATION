const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'D3_demo.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
                title: 'D3_demo',
                filename:'D3_demo.html',
                template: './src/D3_demo.html'
            }
        )
    ],
    // module: {
    //     rules: [
    //         {
    //             test: /\.exec\.js$/,
    //             use: [ 'script-loader' ]
    //         }
    //     ]
    // }
};