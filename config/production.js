const MiniCssExtractorPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// var HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const path = require("path");

module.exports = {
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../production"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractorPlugin.loader, "css-loader"],
      },
      {
        test: /\.(js|jsx)$/i,
        // 你如果很确定可以使用
        // include: path.resolve(__dirname, '../src'),
        exclude: /(node_modules|bower_components)/,
        use: [ "babel-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondtion: {
            maxSize: 4 * 1024,
          },
        },
        generator: {
          filename: "/dist/images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "/dist/fonts/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    // css 文件
    new MiniCssExtractorPlugin(),
    // html 文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: "body",
    }),
    
  ],
  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin({
        // 多进程
        parallel: true,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      // 使用默认注释
      "...",
    ],
  },
  externals: {
    react: "React",
    reactdom: "ReactDOM",
  },
};
