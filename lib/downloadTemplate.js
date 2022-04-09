const request = require("request");
const fs = require("fs");
const spinner = require("./spinner");
const os = require("os");
const path = require("path");
const { unzipFile } = require("./unzipFile");
const chalk = require("chalk");
const { replaceContent } = require("./replaceContent");
const dir = process.cwd();

exports.downloadTemplate = function (templateName, projectName, callback) {
  const url = `https://github.com/xiaochengzi6/Rx-template/raw/main/${templateName}.zip`;
  // const url = `https://gitee.com/xiaochengzi6/rx-template/raw/master/${templateName}.zip`
  const tempProjectPath = fs.mkdtempSync(
    path.join(os.tmpdir(), `${projectName}`)
  );

  // 文件存储在临时文件 且文件名是 `${templateName}.zip`
  const file = path.join(tempProjectPath, `${templateName}.zip`);

  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
  spinner.logWithSpinner("Loading...");
  // 读写完后要关闭 {autoClose:true}
  let stream = fs.createWriteStream(file, { autoClose: true });
  // 下载文件
  request(url)
    .pipe(stream)
    .on("error", function (err) {
      deletePath(tempProjectPath);
      if (err) {
        spinner.stopSpinner(
          `Error Download failed ${templateName} Template`,
          false
        );

        callback(err);
        return;
      }
    })
    .on("close", function (err) {
      spinner.stopSpinner(`Successful download ${chalk.yellow(templateName)} template`);
      if (err) {
        callback(err);
        return;
      }
      const destPath = path.join(dir, `${projectName}`);

      // 解压文件
      unzipFile(file, destPath, callback, tempProjectPath, function () {
        // 修改webpack的入口
        replaceContent(projectName, templateName);
      });
    });
};

/**
 * 用于删除目录
 * @param {string} filePath
 */
function deletePath(filePath) {
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
