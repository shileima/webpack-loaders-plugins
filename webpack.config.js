let path = require('path');
let DonePlugin = require('./plugins/DonePlugin');
let AsyncPlugin = require('./plugins/AsyncPlugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let FileListPlugin = require('./plugins/FileListPlugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let InlineSourcePlugin = require('./plugins/InlineSourcePlugin');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: false,
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
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
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
    },
    plugins: [
        new DonePlugin(),
        new AsyncPlugin(),
        new HtmlWebpackPlugin(),
        new FileListPlugin({
            filename: 'list.md'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        /* 用途：将link和script外链文件标签改成内链style和script */
        new InlineSourcePlugin({
            match: /\.(js|css)/
        })
    ]
}