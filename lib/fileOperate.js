const path = require("path");
const os = require('os');
const fs = require("fs");
const utils = require('./utils')
const { downloadTemplate }  = require('./downloadTemplate')


/**
 * 用于下载模板
 * @param {string} projectName
 * @param {string} templateName
 */
exports.DownloadeTemplate = function (projectName, templateName) {
  downloadTemplate(templateName, projectName, (error)=>{
    if(error){
      utils.exit(error)
      return;
    }
  })
}

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

