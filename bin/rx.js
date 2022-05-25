#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');

// 版本
program.version(pkg.version, '-v --version');

//初始化项目
program.command('init [projectName]', 'init project')

program
  .command('log')
  .description('打印所有的 Script 命令')
  .action(() => {
    console.log(` yarn server         快速开发`);
    console.log(` yarn dev            本地环境打包`);
    console.log(` yarn pro            线上环境打包`);
    console.log(` yarn clean          清除/dist文件夹`);
    console.log(` yarn viewChunks     分析打包的文件`);
    console.log(` yarn createFile     生成模板文件文件`);
  });


program.parse(process.argv);



