
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',
            ],
          },
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: {
              loader: "file-loader",
              options: {
                name: "[name].[hash].[ext]",
                outputPath: "icons"
              }
            }
          }
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }), 
        new MiniCssExtractPlugin({
            filename: '[name].css'
          }),
        new ExtractTextPlugin(
            'main.css'
        )
    ]
}