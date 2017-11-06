//webpack.config.js

var webpack = require("webpack");

require('jquery');

module.exports = {
    entry: ['./web/app.module.js', './web/app.config.js', './web/app.controller.js'],
    output: {
        path: __dirname + '/web/build/',
        filename: 'app.bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],
    devtool: "#inline-source-map"
}