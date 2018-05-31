const http = require('http');
const fs = require('fs');
const iconv = require('iconv-lite');
const querystring=require('querystring');  
var superagent = require('superagent');
const config = require('../config');

var postSearch = function (q) {
  var gbkBytes = iconv.encode(q,'gbk');
  var qu = gbkBytes.toString('hex')
  var p = ''
  for (var i=0,len = qu.length;i<len;i=i+1) {
    if (i%2 == 0){
      p+="%";
    }
    p += qu[i]
  }
  console.log(p.toUpperCase())
  console.log(p)
  var reqData={
    SearchKey:q,
    SearchClass:1
  };
  //发送 http Post 请求  
  var postData=querystring.stringify(reqData);  
  var options = {
    host: config.baseUrl,
    path: config.searchUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    },
    originalHostHeaderName: 'Host'
  };
  console.log(config.baseUrl,config.searchUrl)
  return new Promise(function(resolve, reject) {
    var post_req = http.request(options, function (response) {
      console.log('开始');
      var responseText=[];
      var size = 0;
      response.setEncoding('utf-8');
      response.on('data', function (data) {
        responseText.push(data);
        size+=data.length;
      });
      response.on('end', function () {
        // Buffer 是node.js 自带的库，直接使用
        responseText = Buffer.concat(responseText,size);
        resolve(responseText)
      });
    });
    post_req.on('error',function(err){
      console.log('异常,异常原因'+err);
      resolve('{ok:false}')
    })
    post_req.write(postData);  
    post_req.end();  
  });
}

var getSearch = function (q) {
  var gbkBytes = iconv.encode(q,'gbk');
  var qu = gbkBytes.toString('hex')
  var p = ''
  for (var i=0,len = qu.length;i<len;i=i+1) {
    if (i%2 == 0){
      p+="%";
    }
    p += qu[i]
  }
  var url = "http://"+config.baseUrl + config.searchUrl
  url += "?SearchKey="+ p.toUpperCase() + "&SearchClass=1"
  console.log(url)

  return new Promise(function(resolve, reject) {
    var get_req = http.get(url,function(req,res){  
      var html='';  
      req.on('data',function(data){  
          html+=encodeURI(data);  
      });  
      req.on('end',function(){  
        console.log(html);
        resolve(html)
      });  
    }); 
    get_req.on('error',function(err){
      console.log('异常,异常原因'+err);
      resolve('{ok:false}')
    })
  });
}
var superagentPost = function(q){
  return new Promise(function(resolve, reject) {
    console.log("http://"+config.baseUrl + config.searchUrl)
    superagent
    .post("http://"+config.baseUrl + config.searchUrl)
    .send({
      SearchKey:q,
      SearchClass:1
    })
    .end(function(err, res) {
        if (err) {
          console.log(res,err)
          resolve('{ok:false}')
          //do something
        } else {
          console.log(res.text)
          resolve(res.text)
            //do something
        }
    })
  });
}


module.exports = {
  getSearch:getSearch,
  postSearch:postSearch,
  superagentPost:superagentPost
}
