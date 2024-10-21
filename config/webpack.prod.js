const EslintWebpackPlugin = require("eslint-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const getStyleLoaders = (pre) => {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader:"postcss-loader",
            options: {
                postcssOptions: {
                    plugin:["postcss-preset-env"],
                },
            },
        },
        pre
    ].filter(Boolean)
}
module.exports  = {
    entry: './src/main.js',
    output: {
        path:path.resolve(__dirname,'../dist'),
        filename:"static/js/[name].[contenthash:10].js",
        chunkFilename:"static/js/[name].[contenthash:10]chunk.js",
        assetModuleFilename:"static/media/[hash:10][ext][query]",
        clean:true,
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use:getStyleLoaders()
            },
            {
                test:/\.less$/,
                use:getStyleLoaders("less-loader")
            },
            {
                test:/\.s[ac]ss$/,
                use:getStyleLoaders("sass-loader")
            },
            {
                test:/\.styl$/,
                use:getStyleLoaders("stylus-loader")
            },
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                }
            },
            {
                test:/\.(woff2?|ttf)$/,
                type: "asset/resource",
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options : {
                    cacheDirectory:true,
                    cacheCompression:false,
                }
            }
        ]
    },
    plugins: [
        new EslintWebpackPlugin({
            context:path.resolve(__dirname,'../src'),
            exclude: "node_modules",
            cache:true,
            cacheLocation:path.resolve(__dirname,"../node_modules/.cache/.eslintcache"),
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname, '../public/index.html'),
        }),
        new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:"static/css/[name].[contenthash:10].css",
            chunkFilename:"static/css/[name].[contenthash:10].chunk.css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from:path.resolve(__dirname,'../public'),
                    to: path.resolve(__dirname,'../dist'),
                    globOptions: {
                        ignore:["**/index.html"]
                    }
                }
            ]
        })
    ],
    mode:"production",
    devtool:"source-map",
    optimization: {
        splitChunks: {
            chunks:'all',
        },
        runtimeChunk: {
            name:(entrypoint) => `runtime~${entrypoint.name}.js`
        },
        minimizer:[
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    },
    resolve: {
        extensions:[".jsx", ".js", ".json"]
    },
}