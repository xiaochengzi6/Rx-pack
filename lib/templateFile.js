const { main } = require("rx-file");

// 默认目录
let templatePath = "./Template.txt"
if(process.argv.length > 2){
  templatePath = process.argv[2]
}
const bundle = main("./Template.txt");
bundle.generFile('src');

console.log(bundle)


// 优化第二个点  脚手架项目
// 项目初始化 的整个过程非常不合理 
// 这里可以做出两种选择
// 1、 自定义模板
// 2、 选择模板下载模板 txt 文件然后在本地创建就行 --> 这回造成模板文件是空的 可以做出一种判断


// 优化的第三点 合理规划 packge.json 文件 想想 这个脚手架的包该安装在哪里比较合适

// 去除一些无用的功能 并合理规划文件和文件名 不因该之际暴露给用户

// 需要增加错误边界的处理 不合理的地方 要及时提醒 而不是错误静默 这很讨厌


// 备注: 面向的是国内的开发者 抛错我信息和提示信息也要人性化一点 