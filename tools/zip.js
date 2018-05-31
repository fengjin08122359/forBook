var nodeJsZip = require("nodeJs-zip");
var path = require('path');
const fs = require('fs');

const jsZip = {
  nodeJsZip: nodeJsZip,
  zip (dir, name) {
    var file = path.join(__dirname, dir + name);
    var repo = path.join(__dirname, dir);
    this.nodeJsZip.zip(file,{name:name,dir:repo});
  },
  unzip (dir, zipFile) {
    var fpath = dir;
    var callback = function(isDir,name,data){
      if(isDir){
          fs.mkdirSync(path.join(fpath,name));
      }else{
          fs.writeFileSync(path.join(fpath,name),data);
      }
    }
    this.nodeJsZip.unzip(zipFile, callback)
  }
};

module.exports = jsZip
