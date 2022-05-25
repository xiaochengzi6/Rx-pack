const path = require("path");
const fs = require("fs");
const utils = require('./utils')
const currentPath = process.cwd();
const chalk = require('chalk')
exports.replaceContent = replaceContent

function replaceContent (projectName, templateName) {
  

  try {
    const pkgPath = path.join(currentPath, `/package.json`);
    const pkg = require(pkgPath);
    pkg["rx-entry"] = projectName;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    // todo 这里是去修改 html 文件
    // const indexPath = path.join(currentPath, `${projectName}/index.html`);
    // let html = fs.readFileSync(indexPath).toString();
    // html = html.replace(
    //   /<title>(.*)<\/title>/g,
    //   `<title>${projectName}</title>`
    // );
    // fs.writeFileSync(indexPath, html);
  } catch (err) {
    utils.exit(err);
  }
  install(projectName);
};

exports.install = install;
function install(projectName) {
    utils.infoGreen(`✔ Successful application! ${chalk.yellow(projectName)} form ${chalk.blue(path.join(currentPath,projectName))}`)
    utils.info('')
    utils.info('你可以使用以下命令来开发')
    utils.infoGreen(` yarn server         快速开发`);
    utils.infoGreen(` yarn dev            本地环境打包`);
    utils.infoGreen(` yarn pro            线上环境打包`);
    utils.infoGreen(` yarn clean          清除/dist文件夹`);
    utils.infoGreen(` yarn viewChunks     分析打包的文件`);
    utils.infoGreen(` yarn createFile     生成模板文件文件`);
}
