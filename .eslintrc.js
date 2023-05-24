/**
 * 通用配置
 */
const configRules = {
  // 开启 prettier
  'prettier/prettier': 'error',
  'no-caller': 1, //禁止使用arguments.caller或arguments.callee

  'no-const-assign': 2, //禁止修改const声明的变量
  'no-constant-condition': 2, //禁止在条件中使用常量表达式 if(true) if(1)
  'no-dupe-keys': 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
  'no-dupe-args': 2, //函数参数不能重复
  'no-duplicate-case': 2, //switch中的case标签不能重复
  'no-else-return': 2, //如果if语句里面有return,后面不能跟else语句
  'no-empty': 2, //块语句中的内容不能为空

  'no-eval': 1, //禁止使用eval
  'no-extra-parens': 2, //禁止非必要的括号
  'no-extra-semi': 2, //禁止多余的冒号
  'no-fallthrough': 1, //禁止switch穿透
  'no-floating-decimal': 2, //禁止省略浮点数中的0 .5 3.
  'no-func-assign': 2, //禁止重复的函数声明
  'no-implied-eval': 2, //禁止使用隐式eval
  'no-invalid-regexp': 2, //禁止无效的正则表达式
  'no-mixed-spaces-and-tabs': [2, false], //禁止混用tab和空格
  'linebreak-style': [0, 'windows'], //换行风格
  'no-multi-spaces': 1, //不能用多余的空格
  'no-redeclare': 2, //禁止重复声明变量
  'no-regex-spaces': 2, //禁止在正则表达式字面量中使用多个空格 /foo bar/

  'no-return-assign': 1, //return 语句中不能有赋值表达式
  'no-sequences': 0, //禁止使用逗号运算符
  'no-shadow': 2, //外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
  'no-shadow-restricted-names': 2, //严格模式中规定的限制标识符不能作为声明时的变量名使用

  'no-sparse-arrays': 2, //禁止稀疏数组， [1,,2]

  'no-ternary': 0, //禁止使用三目运算符
  'no-trailing-spaces': 1, //一行结束后面不要有空格
  'no-unused-expressions': 2, //禁止无用的表达式
  'no-unused-vars': [2, { vars: 'all', args: 'after-used' }], //不能有声明后未被使用的变量或参数
  'no-use-before-define': 2, //未定义前不能使用
  'no-useless-call': 2, //禁止不必要的call和apply
  'no-var': 1, //禁用var，用let和const代替
  'no-warning-comments': [1, { terms: ['todo', 'fixme', 'xxx'], location: 'start' }], //不能有警告备注
  'no-with': 2, //禁用with
  'array-bracket-spacing': [2, 'never'], //是否允许非空数组里面有多余的空格
  'arrow-spacing': 1, //=>的前/后括号
  'block-scoped-var': 1, //块语句中使用var
  'brace-style': [1, '1tbs'], //大括号风格

  'comma-spacing': 0, //逗号前后的空格
  'consistent-return': 0, //return 后面是否允许省略
  curly: [2, 'all'], //必须使用 if(){} 中的{}
  eqeqeq: 2, //必须使用全等
  'func-style': [0, 'declaration'], //函数风格，规定只能使用函数声明/函数表达式

  'key-spacing': [1, { beforeColon: false, afterColon: true }], //对象字面量中冒号的前后空格
  'new-cap': 2, //函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
  'new-parens': 2, //new时必须加小括号
  'padded-blocks': 0, //块语句内行首行尾是否要空行
  'prefer-const': 0, //首选const

  'require-yield': 0, //生成器函数必须有yield
  'space-unary-ops': [0, { words: true, nonwords: false }], //一元运算符的前/后要不要加空格
  'valid-typeof': 2, //必须使用合法的typeof的值
}

/**
 * 本地环境
 */
const proRules = {}

/**
 * 生产环境
 */
const devRules = {
  'no-console': 2,
  'no-debugger': 2,
}

const mode = process.env.NODE_ENV
const rulesObj = mode === 'production' ? proRules : devRules

// 根据环境配置校验规则
const rules = Object.assign({}, configRules, rulesObj)

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  globals: {},
  plugins: ['react', 'prettier'],
  ignorePatterns: ['**/test/*.js'],
  rules,
}
