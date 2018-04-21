const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "development",
    entry: {
        app: path.join(__dirname, "./main.js")
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "./dist")
    },

    module: {
        rules: [

        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./index.html")
        })
    ]
}