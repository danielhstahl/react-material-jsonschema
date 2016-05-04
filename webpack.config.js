var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');
var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src/client/app'],
        alias: {},
        extensions: ['', '.jsx', '.js', '.css', '.scss']
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : 'babel'
            },
            {
              test: /(\.scss|\.css)$/,
              loader: 'style!css?modules',
              include: /flexboxgrid/,
            }
        ]
    }
};

module.exports = config;