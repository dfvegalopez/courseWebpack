const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPluging = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',//identificar cada build con un hash
        assetModuleFilename: "assets/images/[hash][ext][query]" 
    },
    resolve: {
        extensions : [".js"],
        alias: {
            '@utils' : path.resolve(__dirname, 'src/utils/'), //el @utils crea el alias, el path.resolve sirve para identificar donde estamos
            '@templates' : path.resolve(__dirname, 'src/templates/'),
            '@styles' : path.resolve(__dirname, 'src/styles/'),
            '@images' : path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module : {
        rules: [
            {
                test: /\.m?js$/,     
                exclude: /node_modules/, 
                use: { 
                    loader: "babel-loader"
                }
            } ,
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                    "css-loader",
                    "stylus-loader"
                ],
            }, 
            {
               test: /\.png/,
               type: "asset/resource" 
            },
            {
                test: /\.(woff|woff2)$/,//expresion regular para leer el tipo de archivo wolff
                use: {
                    loader: "url-loader",//el loader q vamos a trabajar
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",//tipo de dato q estamos usando, caracteristicas del recuros
                        name: "[name][contenthash].[ext]",//como queremos que sea el nombre, en este caso q respete el nombre y la extension
                        outputPath:"./assets/fonts",//hacia donde queiro llevar los archivos
                        publicPath:"../assets/fonts/",
                        esModule: false,
                    }
                }
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from : path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPluging()
        ]
    }
}