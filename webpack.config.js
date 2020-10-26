const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports= {
    entry: './front/index.js',
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve:{
        extensions: ['.js', '.jsx']
    },
    devServer:{
        hot: true,
        historyApiFallback:true
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
                
            },
            {
                test: /\.htlm$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        })
    ]
};