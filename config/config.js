const path = require('path');
const utils = require("../lib/utils");
const currentPath = process.cwd();
const pkg = path.join(currentPath, "/package.json");
const pkg_entry = require(pkg)["rx-entry"]
const resolvePath = path.join(__dirname, '../') /*指定相对目录*/

// 指定入口文件
const rx_entry = path.join(resolvePath, pkg_entry, 'index.tsx')
if (!rx_entry) {
  utils.exit('使用模板的 index.js 文件不存');
}
module.exports = {
  entry: rx_entry,

  optimization: {
    runtimeChunk: {
      // 配置别名 为每一个入口添加一个 只含有 runtime 的包
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    // 分包策略
    splitChunks: {
      chunks: 'all',
      name: false,
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        // 你如果很确定可以使用
        // include: path.resolve(__dirname, '../src'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /(node_modules|bower_components)/
      },
    ]
  },
  resolve: {
    // 遇到导入文件先从 `.tsx` 开始查找
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    modules: [path.resolve(resolvePath, 'node_modules')],
    alias: {
      /*这里要配合着项目中文件夹的使用频率来设置*/
    }
  },
}