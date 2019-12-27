const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
let path = require('path');

const devConfig = {
    mode: "development",
    // 在development模式,用cheap-module-eval-source-map; 在production模式下，用cheap-module-source-map
    devtool: 'cheap-module-eval-source-map',
    // 在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
    devServer: {
        contentBase: './dist', // 是指以哪个目录为静态服务
        open: true, //自动打开页面
        port: 8080, // 设置端口号
        // 如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用
        // 在 localhost:3000 上有后端服务的话，你可以这样启用代理：
        // 请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users
        proxy: {
            '/api': 'http://localhost:3000'
        },
        hot: true, // 启用 webpack 的模块热替换特性
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    output: {
        filename: "[name].js", //name 这里name指的就是前面entry中对应的main和sub
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    }
};
module.exports = merge(commonConfig, devConfig);
