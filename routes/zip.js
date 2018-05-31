var express = require('express');
var router = express.Router();
const jsZip = require('../tools/zip');

/* GET users listing. */
router.get('/zip', function(req, res, next) {
  jsZip.zip(req.query.root || '../repo', req.query.file || '/Jtalk')
  res.end('zip');
});
router.get('/unzip', function(req, res, next) {
  jsZip.unzip(req.query.zip || '../repo', req.query.root || '/Jtalk.zip')
  res.end('unzip');
});

module.exports = router;
