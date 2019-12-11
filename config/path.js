const path = require('path');

const PATHS = {
    src: path.resolve(__dirname, '..', 'src'),
    dist: path.resolve(__dirname, '..', 'dist'),
    config: path.resolve(__dirname, '..', 'config'),
    assets: 'assets'
};

module.exports = {
    PATHS
}