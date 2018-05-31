const http = require('http');
const fs = require('fs');
const exec = require('child_process').exec;
const execAsync = require('async-child-process').execAsync;
var path = require('path');
let cmd;

var search = function (searchText) {
  var fetchRoot = path.join(__dirname, '../fetchTest/');
  var searchRoot = path.join(__dirname, '../fetchTest/search.js');
  cmd = `node ${searchRoot} -s ${searchText}`;
  (async function() {
    const {
      stdout
      //调取子进程 执行cmd
    } = await execAsync(cmd, {
      maxBuffer: 1024 * 500
    });
    let data = stdout;
    console.log(stdout)
  })()
}

module.exports = {
  search:search,
}
