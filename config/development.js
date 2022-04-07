const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const dirDist = path.resolve(__dirname, '../dist')
module.exports = {
    
  output: {
    filename: '[name].[hash].js',
    assetModuleFilename: '[hash][ext][query]',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test:/\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/i,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: "body"
    })
  ],
  devServer: {
    static: dirDist,
    hot: true,
  },
  
}