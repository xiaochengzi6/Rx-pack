const MiniCssExtractorPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// var HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const path = require("path");

module.exports = {
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../pro"),
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
        include: path.resolve(__dirname, '../src'),
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
      template: "./public/pro-index.html",
      inject: "body",
    }),
    // new HtmlWebpackTagsPlugin({
    //   tags: [
    //    {
    //     path:"https://unpkg.com/react@16/umd/react.production.min.js",
    //     scripts: [
    //       {
    //         path: 'asset/path',
    //         external: {
    //           packageName: 'react',
    //           variableName: 'React'
    //         },
    //         attributes: {
    //           type: 'text/javascript'
    //         }
    //       }
    //     ]
    //    },
    //    {
    //     path:"https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
    //     scripts: [
    //       {
    //         path: 'asset/path',
    //         external: {
    //           packageName: 'react-dom',
    //           variableName: 'ReactDOM'
    //         },
    //         attributes: {
    //           type: 'text/javascript'
    //         }
    //       }
    //     ]
    //    }
    //   ],

    // })
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
