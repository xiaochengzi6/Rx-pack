#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');

// 版本
program.version(pkg.version, '-v --version');

//初始化项目
program.command('init [projectName]', 'init project')



program.parse(process.argv);

