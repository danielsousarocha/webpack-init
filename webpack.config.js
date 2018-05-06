const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const inProduction = process.env.NODE_ENV === 'production' ? true : false;
const publicPath = path.resolve(__dirname, 'public');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: './assets/js/[name].js',
        path: publicPath
    },

    devServer: {
        contentBase: publicPath,
        port: 9000,
        hot: true,
        open: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    inProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['public']),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            hash: true,
            minify: {
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: "./assets/css/[name].css",
            chunkFilename: "[id].css"
        })
    ]
}