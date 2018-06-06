var express = require('express');
var path = require('path');
var router = express.Router();
const fs = require('fs');
const search = require('../tools/search');
const phantom = require('../tools/phantom');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
