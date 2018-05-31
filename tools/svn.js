var SVN = require('nodejs-svn');
var path = require('path');

const svn = {
  svnClient: null,
  setSvn (username, password, svnroot) {
    this.svnClient = new SVN({
      username: username,
      password: password,
      root: svnroot,
      debug: true, // 是否在控制台打印调试信息
      cwd: __dirname, //仓库存放的目录
      repoName: '../repo', //仓库name
    });
  },
  getInfoUrl (filepath) {
    var self = this;
    var promise = new Promise(function (resolve, reject) {
      self.svnClient.command({
        command: 'info', // 需要执行的命令 比如：switch
        args: [filepath], // 执行svn命令的参数，比如： list --xml --username xxx --user password ***
        options: { // 运行spawn的一些参数，具体可参考nodejs文档
          cwd: './' //执行command所在的目录
        },
        callback: (code, text, param) => {
          resolve(text);
        },
      });
    });
    return promise;
  },
  getInfo (filepath) {
    var self = this;
    var promise = new Promise(function (resolve, reject) {
      var p = path.join(self.svnClient.cwd, self.svnClient.repoName);
      p = path.join(p, filepath);
      self.svnClient.command({
        command: 'info', // 需要执行的命令 比如：switch
        args: [], // 执行svn命令的参数，比如： list --xml --username xxx --user password ***
        options: { // 运行spawn的一些参数，具体可参考nodejs文档
          cwd: p //执行command所在的目录
        },
        callback: (code, text, param) => {
          console.log(text)
          resolve(text);
        },
      });
    });
    return promise;
  },
  checkout (svnUrl) {
    var self = this;
    var promise = new Promise(function (resolve, reject) {
      var p = path.join(self.svnClient.cwd, self.svnClient.repoName);
      self.svnClient.command({
        command: 'checkout', // 需要执行的命令 比如：switch
        args: [svnUrl], // 执行svn命令的参数，比如： list --xml --username xxx --user password ***
        options: { // 运行spawn的一些参数，具体可参考nodejs文档
          cwd: p //执行command所在的目录
        },
        callback: (code, text, param) => {
          resolve(text);
        },
      });
    });
    return promise;
  },
  getLogs () {
    var self = this;
    var promise = new Promise(function (resolve, reject) {
      var p = path.join(self.svnClient.cwd, self.svnClient.repoName);
      self.svnClient.command({
        command: 'log', // 需要执行的命令 比如：switch
        args: ['https://192.168.11.11/svn/echat/trunk/ucc_golden_easysale/any800Chat'], // 执行svn命令的参数，比如： list --xml --username xxx --user password ***
        options: { // 运行spawn的一些参数，具体可参考nodejs文档
          cwd: p //执行command所在的目录
        },
        callback: (code, text, param) => {
          resolve(text);
        },
      });
    });
    return promise;
  }
};

module.exports = svn
