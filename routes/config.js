var express = require('express');
var path = require('path');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var repo = path.join(__dirname, '../database/config.txt');
  fs.readFile(repo, 'utf-8', function(err,data){
    if (err) throw err;
    const example = data.toString() || '{}'
    console.log(example)
    res.render('config',{example: encodeURIComponent(example)});
  });
});

module.exports = router;
