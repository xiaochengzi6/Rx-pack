const chalk = require("chalk");
const path = require("path");
const spinner = require("./spinner.js");
const { DownloadeTemplate} = require('./fileOperate');
const fs = require("fs");
const inquirer = require('inquirer')
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

// 警告
exports.warn = function (message) {
  console.log(chalk.yellow(message));
};

// 错误
exports.error = function (message) {
  console.log(chalk.red(message));
};

// 提示
exports.info = function (message) {
  console.log(chalk.white(message));
};
exports.infoGreen = function (message) {
  console.log(chalk.green(message));
};

// 退出
exports.exit = function (error) {
  if (error) {
    if (error && error instanceof Error) {
      console.log(chalk.red(error.message));
    } else {
      console.log(chalk.red(error));
    }
  }
  process.exit(-1);
};

/**
 * 判断是否存在 template 目录
 * @param {*} projectName String
 * @param {*} templateName String
 * @param {*} force Boolean
 */
exports.isThemeplateList = function (projectName, templateName, force) {
  const currentPath = process.cwd();
  // 项目路径
  const filePath = path.join(currentPath, `${projectName}`);
  // 强制删除
  if (force) {
    if (fs.existsSync(filePath)) {
      spinner.logWithSpinner(`删除${projectName}...`);
      deletePath(filePath);
      spinner.stopSpinner(false);
    }
    DownloadeTemplate(projectName, templateName);
    return;
  }
  if (fs.existsSync(filePath)) {
    // 文件存在
    inquirer
      .prompt({
        type: "confirm",
        name: "out",
        message: `${projectName}Folder exists, overwrite?`,
      })
      .then((data) => {
        if (!data.out) {
          // 不同意
          exit();
        } else {
          // 同意
          spinner.logWithSpinner(`删除${projectName}...`);
          deletePath(filePath);
          spinner.stopSpinner(false);
          DownloadeTemplate(projectName, templateName);
        }
      }).catch(error=>{
        exit(error)
      })
  } else {
    // 文件不存在
    DownloadeTemplate(projectName, templateName);
  }
};
