const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')       // 默认打包后只能插入<style>标签内，这个插件可以将css单独打包成文件，以<link>形式引入
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');

module.exports = {
    mode: "production",
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
        hotOnly: true // 即使HMR功能不生效，也不让浏览器自动刷新
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    entry: {
        main: './src/index.js'
        // sub: './src/index.js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        filename: "[name].js", //name 这里name指的就是前面entry中对应的main和sub
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
        //     {
        //     test: /\.vue$/,
        //     loader: 'vue-loader'
        // },
        {
            test: /\.js$/,
            exclude: /node_modules/, //如果js文件在node_modules里面，就不使用这个babel-loader了
            loader: 'babel-loader', // webpack与es通信
            options: {
            }
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                // url-loader对于图片较小的可以用base64进行压缩，剩下的大图片进入直接放到指定文件夹
                {
                    loader: "url-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        limit: 2048
                    }
                }
            ]
        }, {
            // css-loader会帮我们分析出所有css文件之间的关系， 最终把这些css文件合并成一段css，
            // style-loader在得到css-loader生成的内容之后，style-loader会把这段内容挂载到页面的head部分
            // test: /\.css$/,
            test: /\.scss$/,
            use: [
                'vue-style-loader',
                'style-loader', // 将 JS 字符串生成为 style 节点
                {
                    loader: 'css-loader',
                    // 查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
                    // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                    options: {
                        importLoaders: 2,
                        modules: true // 开启css的模块化打包,修改一个文件不会影响全局的样式
                    }
                }, // 将 CSS 转化成 CommonJS 模块
                'postcss-loader', // 属性加前缀
                'sass-loader' // 将 Sass 编译成 CSS
            ]
            // 在webpack的配置里面loader是有顺序的，执行顺序是从下到上，从右到左，
            // 所以当我们去打包一个sass文件的时候，首先会执行sass-loader，对sass代码进行翻译，翻译成css代码之后给到css-loader,
            // 然后css-loader把所有的css合并成一个css模块，最后被style-loader挂载到页面的head中去
            // postcss-loader为属性添加厂商前缀
        }, {
            test: /\.css$/,
            use: [
                // 'vue-style-loader',
                'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: ['file-loader']
        }]
    },
    optimization: {
        usedExports: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html', //意思是打包的时候以哪个html文件为模板
            filename: 'index.html', // 默认情况下生成的html文件叫index.html,可以自定义
            title: 'test App', // 为打包后的index.html配置title，这里配置后，在src中的index.html模板中就不能写死了，需要<%= htmlWebpackPlugin.options.title %>这样写才能生效
            minify: {
                collapseWhitespace: true // 把生成的index.html文件的内容的没用空格去掉
            }
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css' //打包后的css文件名
        }),
        new PurifyCSS({
            paths: glob.sync([
                //要做css treeshaking的文件
                path.resolve(__dirname, './src/*.js')
            ])
        })
    ]
};
