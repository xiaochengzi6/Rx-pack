const { program } = require("commander");
const chalk = require('chalk');
const inquirer = require('inquirer');
const utils = require('../lib/utils');


// isprojectName: Boolean ;  force: Boolean (-f)
let projectName, force;

program.arguments('[projectName]') // 指定解析的参数
        .description("初始化项目")  
        .option('-f --force','如果存在输入的项目目录，强制删除项目目录') 
        .action((name, cmd)=>{ 
            projectName = name;
            force = cmd.force
        });

// 获取用户输入        
program.parse(process.argv);

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: chalk.yellow('input project name: ')
  },
  {
    type: 'list',
    name: 'template',
    message: chalk.yellow('opt project template: '),
    choices: [
      {name: 'rx-template_1', value: 'rx-template_1'},
      {name: 'rx-template_2', value: 'rx-template_2'},
      {name: 'rx-template_3', value: 'rx-template_3'},
      {name: 'rx-template_4', value: 'rx-template_4'}
    ]
  }
]


if(projectName) {
  questions.splice(0,1);
}

inquirer.prompt(questions).then(result => {
  let templateName

  if(result.projectName) {
     projectName = result.projectName
  }
   templateName = result.template
  if(!templateName || !projectName) {
    utils.exit("No project name was entered, the project name is not a string, or no project name was selected. You should use 'rx init `ProjectName` like this'");
  }
  // else{
  //   console.log("Project name: ", projectName)
  //   console.log('Template: ', templateName)
  // }

  //模板目录是否存在
  utils.isThemeplateList(projectName, templateName, force)

}).catch(error => {
  utils.exit(error)
})

