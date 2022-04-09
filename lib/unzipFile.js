const decompress = require("decompress");
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
/**
 * 用于删除目录
 * @param {string} filePath
 */
 function deletePath (filePath) {
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath);
    for (let index = 0; index < files.length; index++) {
      const fileName = files[index];
      const currentPath = path.join(filePath, fileName);
      if (fs.statSync(currentPath).isDirectory()) {
        deletePath(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    }
    fs.rmdirSync(filePath);
  }
}

/**
 * 解压文件
 * @param {path} file 
 * @param {path} dist 
 * @param {function}} callback 
 * @param {function}} 用与删除目录
 */
exports.unzipFile = function(file, dist, callback, tempProjectPath, outputcallback) {
  decompress(file, dist).then(function(){
    // sucess
    deletePath(tempProjectPath)
    outputcallback();
  }).catch(function(err){
    // fail
    deletePath(tempProjectPath)
    callback(err)
  })
}