const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dirDist = path.resolve(__dirname, "../dist");
module.exports = {
  output: {
    filename: "[name].[hash].js",
    assetModuleFilename: "[hash][ext][query]",
    chunkFilename: "static/js/[name].chunk.js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },
  // 是否开启 你自己来规定
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
     
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: "body",
    }),
  ],
  devServer: {
    static: dirDist,
    hot: true,
  },
};
