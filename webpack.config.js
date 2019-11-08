let path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: true,
    resolveLoader: {
        /* alias: {
            loader1: path.resolve(__dirname, "loaders", "loader1")
        } */
        modules: ['node_modules', path.resolve(__dirname, "loaders")]
    },
    module: {
        rules: [
            /* {
                test: /\.jpg$/,
                use: ['file-loader']
            }, */
            {
                test: /\.jpg$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 200 * 1024
                    }
                }
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            /* {
                test: /\.js$/,
                use: {
                    loader: 'banner-loader',
                    options: {
                        text: '石磊',
                        filename: path.resolve(__dirname, 'banner.js')
                    }
                }
            } */
            // loaders 自后往前执行自下往上执行,pre > normal > inline > post
            /* {
                test: /\.js$/,
                use: ['loader1', 'loader2', 'loader3']
            },
            {
                test: /\.js$/,
                use: ['loader4'],
                enforce: "pre"
            },
            {
                test: /\.js$/,
                use: ['loader5']
            },
            {
                test: /\.js$/,
                use: ['loader6'],
                enforce: "post"
            } */

        ]
    }
}