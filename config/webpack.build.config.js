const merge = require('webpack-merge');
const config = require('./webpack.default.config');

module.exports = new Promise((resolve, _) =>
    resolve(merge(config, { mode: 'production' }))
);
