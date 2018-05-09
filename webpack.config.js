const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

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
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader?url=false'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[path][name].[ext]',
                            limit: 1000000
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin([
            'public/assets/css/*',
            'public/assets/js/*',
            'public/*.html',
        ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack Default Build',
            template: './src/index.html',
            filename: './index.html',
            hash: true,
            minify: {
                collapseWhitespace: inProduction
            }
        }),
        new MiniCssExtractPlugin({
            filename: "./assets/css/[name].css",
            chunkFilename: "[id].css"
        }),
        new FaviconsWebpackPlugin({
            logo: './src/images/favicon.png',
            prefix: 'favicons/'
        }),
        new LiveReloadPlugin()
    ]
}