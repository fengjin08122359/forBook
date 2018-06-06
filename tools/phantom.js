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
  return new Promise(function(resolve, reject) {
    (async function() {
      const {
        stdout
        //调取子进程 执行cmd
      } = await execAsync(cmd, {
        maxBuffer: 1024 * 500
      });
      let data = JSON.parse(stdout);
      if (data.dataList) {
        var updateTimeList= asyncFetchUpdateTime(data.dataList);
        console.log(updateTimeList)
      }
      console.log(data)
      resolve(stdout)
    })()
  })
}
var asyncFetchUpdateTime = function(data) {
  return new Promise(function(resolve, reject) {
    if (!data || data.length <= 0) {
      reject("data not exist")
    }
    let resultCollection = [];
    var fetchRoot = path.join(__dirname, '../fetchTest/');
    var bookRoot = path.join(__dirname, '../fetchTest/search.js');
    async.mapLimit(data, number, async function(data, callback) {
      //需要设置延时不然ip会被封掉
      let cmd = `node book.js -b ${data.linkNum}`,
        json,
        //获取一个内容就输出一个
        {
          stdout
        } = await execAsync(cmd, {
          //default value of maxBuffer is 200KB.
          maxBuffer: 1024 * 500
        });
      /*将内容保存到json中*/
      json = JSON.parse(stdout);
      //保存index
      json.index = data.index;
      /*
        目前未知callback为什么是undefined
      */
      resultCollection.push(json);
      // callback(null, json) //not work
    }, function(err) {
      //回调函数在全部都执行完以后执行
      if (err) {
        reject(err)
      }
      resolve(resultCollection)
    })
  })
}

module.exports = {
  search:search,
}
