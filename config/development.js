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
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // 这里需要在面对 mjs js 能够清楚的判断而不会导致抛错
      {
        test: /\.(js)$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js)$/,
        // 你如果很确定可以使用
        // include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
        resolve: {
          fullySpecified: false,
        },
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
