const decompress = require("decompress");
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const request = require('request');

request('https://github.com/xiaochengzi6/Rx-template/raw/main/rx-template_4.zip')
    .pipe(fs.createWriteStream('kk.zip'))
    

// https://gitee.com/xiaochengzi6/rx-template/raw/master/rx-template_4.zip