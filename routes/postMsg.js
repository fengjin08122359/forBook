var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var file = require('../tools/file');
var mongoose = require('../tools/mongoose');

/* GET home page. */
router.post('/example', function(req, res, next) {
  var exampleBody = req.body.exampleBody;
  var example = req.body.example;
  var repo = path.join(__dirname, '../database/config.properties');
  var repoTxt = path.join(__dirname, '../database/config.txt');
  if(exampleBody){
    fs.writeFile(repo, exampleBody, (err) => {
      if (err) throw err;
      res.end('{ok:true}');
    });
  }
  if(example){
    fs.writeFile(repoTxt, JSON.stringify(example), (err) => {
      if (err) throw err;
      res.end('{ok:true}');
    });
  }
  res.end('{ok:true}');
});

router.get('/example', function(req, res, next) {
  var repo = path.join(__dirname, '../database/config.txt');
  fs.readFile(repo, 'utf-8', function(err,data){
    if (err) throw err;
    const example = data.toString() || '{}'
    res.end(example);
  });
});

router.get('/repoFiles', function(req, res, next) {
  var repo = path.join(__dirname, '../repo');
  console.log(repo)
  var tree = file.explorer(repo)
  res.end(JSON.stringify(tree));
});

router.delete('/repoFiles', function(req, res, next) {
  var url = req.body.url
  if (req.body.isDir) {
    file.removeDir(url, false)
  } else  {
    file.removeFile(url)
  }
  res.end('{ok:true}');
});

router.get('/getMongo', function(req, res, next) {
  mongoose.get().then(function(text) {
    console.log(text);
    res.end(text);
  });
});

router.get('/addMongo', function(req, res, next) {
  res.end(mongoose.add());
});

router.get('/copyConfig', function(req, res, next) {
  var from = path.join(__dirname, '../database/config.properties');
  file.copy(from, req.query.to)
});

router.post('/directories', function(req, res, next) {
  var directories = req.body.directories;
  var directoriesTxt = path.join(__dirname, '../database/directories.txt');
  if (directories) {
    fs.writeFile(directoriesTxt, JSON.stringify(directories), (err) => {
      if (err) throw err;
      res.end('{ok:true}');
    });
  }
  res.end('{ok:true}');
});

router.get('/directories', function(req, res, next) {
  var directoriesTxt = path.join(__dirname, '../database/directories.txt');
  fs.readFile(directoriesTxt, 'utf-8', function(err,data){
    if (err) throw err;
    const directories = data.toString() || '{}'
    res.end(directories);
  });
});

router.post('/svnSetting', function(req, res, next) {
  var svnSetting = {
    username: req.body.username,
    password: req.body.password,
    svn: req.body.svn,
  };
  var svnTxt = path.join(__dirname, '../database/svnSetting.txt');
  if (svnSetting) {
    fs.writeFile(svnTxt, JSON.stringify(svnSetting), (err) => {
      if (err) throw err;
      res.end('{ok:true}');
    });
  }
  res.end('{ok:true}');
});

router.get('/svnSetting', function(req, res, next) {
  var svnTxt = path.join(__dirname, '../database/svnSetting.txt');
  fs.readFile(svnTxt, 'utf-8', function(err,data){
    if (err) throw err;
    const svnSetting = data.toString() || '{}'
    res.end(svnSetting);
  });
});

module.exports = router;
