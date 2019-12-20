let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: {
        main: './src/index.js'
        // sub: './src/index.js'
    },
    output: {
        filename: "[name].js", //name 这里name指的就是前面entry中对应的main和sub
        path: path.resolve(__dirname, '../dist')
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
        new MiniCssExtractPlugin({
            filename: '[name].css' //打包后的css文件名
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',// 分割所有代码包括同步代码和异步代码,默认chunks:'async'分割异步代码
            chunks: 'all',
            minSize: 30000,
            minChunks: 2, //指的是当一个模块被用了多少次的时候，才对它进行代码分割
            maxAsyncRequests: 5, // 默认是5，指的是同时加载的模块数最大是5个
            maxInitialRequests: 3, // 指入口文件的最大并行请求数，意思是入口文件引入的库如果做代码分割也最多只能分割出3个js文件，超过3个就不会做代码分割了，这些配置一般按照默认配置来即可
            automaticNameDelimiter: '~', //意思是打包生成后的文件中间使用什么连接符
            name: true,//配置true，意思是将根据块和缓存组密钥自动生成名称，一般采用默认值
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    filename: 'vendors.js'
                },
                default: {
                    // minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true, // 以这个参数的意思是如果一个模块已经被打包过了，如果再打包的时候就忽略这个模块，直接使用之前被打包好的那个
                    filename: 'common.js'
                }
            }
        }
    },
};
