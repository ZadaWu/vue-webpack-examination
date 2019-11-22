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
                // url-loader对于图片较小的可以用base64进行压缩，剩下的大图片进入file-loader进行处理
                {
                    loader: "url-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        limit: 2048
                    }
                },
                {
                    loader: 'file-loader',
                    // 放到指定的文件夹，并且对名字进行处理
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
            }]
        }]
    }
}
