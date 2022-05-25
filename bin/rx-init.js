const { program } = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");
const utils = require("../lib/utils");
const { main } = require("rx-file");
const fs = require("fs");
let { replaceContent } = require("../lib/replaceContent");
let projectName, yes_Name, force;

program
  .arguments("[projectName]") // 指定解析的参数
  .description("初始化项目")
  .option("-y --yes", "初始化项目")
  .option("-f --force", "强制删除文件")
  .action((name, cmd) => {
    projectName = name;
    yes_Name = cmd.yes;
    force = cmd.force;
  });

// 获取用户输入
program.parse(process.argv);

let questions = [
  {
    type: "input",
    name: "projectName",
    message: chalk.yellow("输入工作目录: "),
  },
  {
    type: "confirm",
    name: "isdownLoader",
    message: chalk.yellow("是否选择自定义模板？"),
  },
];

// 默认值
if (yes_Name) {
  projectName = "src";
  questions = questions.slice(1);
}

// 判断是否还需要后续的模板
let isQuestions;

inquirer
  .prompt(questions)
  .then((result) => {
    if (result.projectName) {
      projectName = result.projectName;
    }
    IsDownloader = result.isdownLoader;

    if (!IsDownloader) {
      // 使用网上的模板 需要下载
      isQuestions = !IsDownloader;
      return isOptions(isQuestions);
    }

    // 使用自定义模板
    if (IsDownloader && !fs.existsSync(projectName)) {
      Createtemplate(projectName);
    } else if (IsDownloader && fs.existsSync(projectName) && !force) {
      // 默认模板有值 建议使用 强制删除 或者 换一个目录
      utils.exit(
        `承载模板的项目存在 ${projectName} 建议使用 'rx init -f' 强制删除或者你需要更换模板名`
      );
    } else if (IsDownloader && fs.existsSync(projectName) && force) {
      // 强制删除
      utils.deletePath(projectName);
      Createtemplate(projectName);
    }
  })
  .catch((error) => {
    utils.exit(error);
  });
// 自定义模板
function Createtemplate(projectName) {
  let bundle = main("./Template.txt");
  bundle.generFile(projectName);
  bundle = null;
  // 修改打包入口
  replaceContent(projectName);
}

// 选择模板 文件
function isOptions(isQuestions) {
  let optionsTemplate_question = [
    {
      type: "list",
      name: "template",
      message: chalk.yellow("选择你的模板: "),
      choices: [
        { name: "rx-template_1", value: "rx-template_1" },
        { name: "rx-template_2", value: "rx-template_2" },
        { name: "rx-template_3", value: "rx-template_3" },
        { name: "rx-template_4", value: "rx-template_4" },
      ],
    },
  ];
  if (isQuestions) {
    // 选择下载模板
    inquirer
      .prompt(optionsTemplate_question)
      .then((result) => {
        // 模板名
        let templateName;
        if (result && result.template) {
          templateName = result.template;
        }
        if (projectName && templateName) {
          utils.isThemeplateList(projectName, templateName, force);
        } else {
          utils.warn(`项目名或者模板名的选择出现了问题`);
        }
      })
      .catch((error) => {
        utils.exit(error);
      });
  }
}
