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
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
}
