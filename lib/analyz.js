const config = require("./webpack.config.js");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
if(config.plugins){
    config.plugins.push(new BundleAnalyzerPlugin());
}else{
    config.plugins = [new BundleAnalyzerPlugin()];
}
module.exports = config;