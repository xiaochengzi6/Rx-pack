## 使用的技术栈
webpack5 + React + babel

## 功能

### 初次运行
> yarn install
你需要做的是是否要更换模板来创建合适的项目。默认使用 `src` 作为你的初始模板，如果你也可以去这里浏览 [rx-template](https://github.com/xiaochengzi6/Rx-template)

### 使用模板文件 
projectName: 你的目录名
~~~shell
rx init "projectName"
~~~
> **非常建议使用 `src` 来创建 如果指定别的可能需要手动更改 `config/config.js` 的 `entry` 选项**

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

3、你不使用配置的模板文件也能进行工作，你只需要在 `./src`文件夹放入 `index.js` `index.html` 文件也能完成打包工作。(默认是存在的)