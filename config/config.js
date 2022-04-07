const path = require('path');

module.exports = {
  entry: ["./src/index.js"],
 
 
  optimization: {
    runtimeChunk:{
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    splitChunks: {
      chunks: 'all'
    }
  }
}