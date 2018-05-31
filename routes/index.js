var express = require('express');
var path = require('path');
var router = express.Router();
const fs = require('fs');
const search = require('../tools/search');
const phantom = require('../tools/phantom');

/* GET home page. */
router.get('/superagentPost', function(req, res, next) {
  search.superagentPost("美丽").then(function(text) {
    console.log(text);
    res.end(text);
  });
});
router.get('/postSearch', function(req, res, next) {
  search.postSearch("美丽").then(function(text) {
    console.log(text);
    res.end(text);
  });
});
router.get('/getSearch', function(req, res, next) {
  search.getSearch("美丽").then(function(text) {
    console.log(text);
    res.end(text);
  });
});
router.get('/search', function(req, res, next) {
  phantom.search('美漫')
  res.end();
});
module.exports = router;
