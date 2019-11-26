const path = require('path');

module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
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
        }]
    }
}
