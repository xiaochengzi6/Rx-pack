const path = require('path');
const currentPath = process.cwd();
const pkg = path.join(currentPath,"/package.json");
const pkg_entry = require(pkg)["rx-entry"]
const rx_entry = path.join(__dirname,'../',`${pkg_entry}` ,'index.js')

module.exports = {
  entry: rx_entry,
 
  optimization: {
    runtimeChunk:{
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    splitChunks: {
      chunks: 'all'
    }
  }
}