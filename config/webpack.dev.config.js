const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.default.config');

module.exports = new Promise((resolve, _) =>
    resolve(merge(config, {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            contentBase: config.externals.paths.dist,
            overlay: {
                warnings: false,
                errors: true
            }
        },
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            })
        ]
    }))
);