var express = require('express');
var router = express.Router();
const svn = require('../tools/svn');

/* GET users listing. */
router.get('/setSvn', function(req, res, next) {
  svn.setSvn (req.query.username || '', req.query.password || '', req.query.svnroot || '') 
  svn.getInfoUrl(req.query.svnroot).then(function(text) {
    console.log(text);
    res.end(text);
  })
});
router.get('/getInfo', function(req, res, next) {
  svn.getInfo('/any800Chat').then(function(text) {
    console.log(text);
    res.end(text);
  });
});
router.get('/checkout', function(req, res, next) {
  if (req.query.url) {
    svn.checkout(req.query.url).then(function(text) {
      console.log(text);
      res.end(text);
    });
  } else {
    res.end('');
  }
  
});

module.exports = router;
