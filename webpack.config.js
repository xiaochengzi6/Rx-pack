const config = require("./config/config");
const development = require('./config/development')
const production = require('./config/production');
const {merge} = require('webpack-merge');
const mode = process.env.NODE_ENV;
if(mode === 'production'){
  module.exports = merge(config, production)
}else{
  module.exports = merge(config, development)
}
