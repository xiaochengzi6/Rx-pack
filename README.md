## 环境
主要打包环境：`webpack5 + babel` 

选型：`React 生态`
> 主要支持 react 生态环境、暂时不考虑支持其他


环境：`Browser`

ES6版本：`ES6+`

node版本：`Node 14+`
> 过高版本有可能存在问题 如 node_18 尽量使用 14 or 16 

包管理工具：`yarn`
> 绝对不能用 pnpm 不然运行不起来

UI组件库：`Antd`
> 默认为 antd 可以去修改


## 功能
1. 自动化检测提交代码
2. 下载模板文件（下载作者提供的）
3. 分析 build 文件
4. 自定义创建模板文件（根据根目录`Template.txt`文件）
5. 根据不同环境打包、校验代码
6. 支持 TS（默认 react_17 版本）
7. 支持 react_17 和 react_18 （切换分支使用）
### 初次运行
> yarn install


### 使用模板文件 

~~~shell
rx init projectName
~~~
projectName: 承载模板文件的文件夹

简单使用 `rx init -y`

之后你可以选择一个是根据模板文件去创建（速度快，而且完全的自定义，缺点就是生成的模板文件为空） 另一个是去下载模板文件（速度缓慢，优点是：文件夹内存有代码能跑起来）

你需要做的是是否要更换模板来创建合适的项目。默认使用 `src` 作为你的初始模板，如果你也可以去这里浏览 [rx-template](https://github.com/xiaochengzi6/Rx-template)

`rx log` 打印所有的 `npm Script` 命令

### 开始打包文件 (development)
~~~js
yarn run dev
~~~
打包后的文件存放在 `./dist`

### 或者开始打包文件 (production)
~~~js
npm run pro
~~~
打包后的文件存放在 `./production`

### 开发
~~~js
npm run server
~~~
用来热刷新，你也可以使用热替换来使局部刷新

### 清除打包后的文件夹
~~~js
npm run clean
~~~
这里默认清除 `./dist` 文件 如果需要可以在 `package.json` 手动更改

### 分析build文件
~~~js
npm run viewChunks
~~~
用于分析，将较大的文件切割，但文件越多请求数也会随之增加按照自己的方式配置(灵活性 🤣)

~~~js
npm run createFile
~~~
用来创建模板文件 前提是你需要提供 './Template.txt' 模板才行。

## 问题
1、如果你不能使用 `rx` 你可以在命令行键入 `yarn link` 
> 前提这需要你使用 yarn 并且它在你的全局环境下

2、遇到下载模板时下载不成功是因为网速太慢或者国内不允许访问，大家也已自行拷贝去使用合适的方法去拷贝[模板文件](https://github.com/xiaochengzi6/Rx-template)。
错误类型：
~~~shell
Error: read ECONNRESET
    at TLSWrap.onStreamRead (internal/stream_base_commons.js:209:20) {
  errno: -4077,
  code: 'ECONNRESET',
  syscall: 'read'
}
~~~
解决方法 使用 [git](https://gitee.com/xiaochengzi6/rx-template) 手动下载或者去模板文件处下载

3、你不使用配置的模板文件也能进行工作，你只需要在 `./src`文件夹放入 `index.js` 文件也能完成打包工作。(默认是存在的)
> 需要注意的是这里的模板是模仿功能并没有实际的用途，有关于这个脚手架的开发及问题也欢迎大家联系我 


## 后续
1. 设计一个 cli 能够自动化的选择开发环境使用不同的打包工具
     比如选择 `node` 环境就使用 `Rollup` 打包
     选择 `Browser` 环境就使用 `webpack` 打包
2. 支持 monorepo 环境
3. 能够在 1 的基础上无缝切换 vite 
4. 能否设计成类似于 `create-react-app` 那样