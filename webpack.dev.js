const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(config, {
    devtool: 'inline-source-map',
    devServer: {
        index:'D3_demo.html',
        contentBase: './dist',
        hot: true,
        compress: true,
        port: 8080
    },
    plugins:[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
