const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { PATHS } = require('./path');

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        main: `${PATHS.src}/main.js`,
    },
    output: {
        filename: `${PATHS.assets}/js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: `${PATHS.config}/postcss.config.js` } }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: `${PATHS.config}/postcss.config.js` } }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            '~': PATHS.src
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}/css/[name].[hash].css`,
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.assets}/images`, to: `${PATHS.assets}/images` },
            { from: `${PATHS.src}/${PATHS.assets}/fonts`, to: `${PATHS.assets}/fonts` },
            { from: `${PATHS.src}/static`, to: '' },
        ], { ignore: ['.DS_Store'] }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: 'index.html',
        })
    ],
}