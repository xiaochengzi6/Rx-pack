const MiniCssExtractorPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../production"),
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractorPlugin.loader, "css-loader"],
      },
      {
        test: /\.(js)$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx)$/i,
        // 你如果很确定可以使用
        // include: path.resolve(__dirname, '../src'),
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"],
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
    new MiniCssExtractorPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
    // html 文件
    new HtmlWebpackPlugin({
      /*这里默认使用 index-Production 作为 html 模板*/
      template: "./public/index-production.html",
      // 插入到 html 的底部
      inject: "body",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  optimization: {
    minimizer: true,
    // 开启摇树优化
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        parallel: 5,
        terserOptions: {
          format: {
            comments: false,
          }
        }
      }),
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
  /*用于排除非常大的包文件*/
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
