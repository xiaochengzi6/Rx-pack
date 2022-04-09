const ora = require('ora')
const chalk = require('chalk')

const spinner = ora();

/**
 * 开始旋转
 * @param {*} symbol 指定标识
 * @param {*} msg 文本信息
 */
exports.logWithSpinner = function (symbol, msg) {
  if(!msg) {
    msg = symbol;
    symbol = chalk.green('✔');
  }
  spinner.text = ' ' + msg;
  spinner.start();
}

/**
 * 停止旋转
 * @param {Boolean} persist 
 * @returns 
 */
exports.stopSpinner = (persist, isFalse) => {
  if (!spinner.isSpinning) {
    return
  }

  if (persist && isFalse !== false) {
    spinner.stopAndPersist({
      symbol: chalk.green('✔'),
      text: chalk.green(persist)
    })
  } else if(persist && isFalse === false) {
    spinner.stopAndPersist({
      symbol: chalk.red('✘'),
      text: chalk.red(persist)
    })
  }else{
    spinner.stop()
  }
}