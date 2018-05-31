var path = require('path');
const fs = require('fs');

const files = {
  explorer (path) {
    var self = this
    var tree = []
    var pa = fs.readdirSync(path);
    pa.forEach(function(ele,index){  
      var info = fs.statSync(path+"/"+ele);
      if(info.isDirectory()){
        var binary = self.explorer(path+"/"+ele);
        tree.push({
          label: ele,
          children: binary,
          full: path+"/"+ele,
          mtime: info.mtime,
          isDir: true
        })
      }else{  
        tree.push({
          label: ele,
          full: path+"/"+ele,
          mtime: info.mtime,
          isDir: false
        })
      }   
    });
    return tree;    
  },
  init () {
    this.removeDir(path.join(__dirname, '../public'), true)
    this.copy(path.join(__dirname, '../front/build/index.html'), path.join(__dirname, '../views/index.html'));
    this.copy(path.join(__dirname, '../react-app/build/index.html'), path.join(__dirname, '../views/config.html'));
    this.copyFolder(path.join(__dirname, '../front/build/static'),path.join(__dirname, '../public'))
    this.copyFolder(path.join(__dirname, '../react-app/build/static'),path.join(__dirname, '../public'))
  },
  copyFolder (srcDir, tarDir, cb) {
    var self = this;
    fs.readdir(srcDir, function(err, files) {
      var count = 0
      var checkEnd = function() {
        ++count == files.length && cb && cb()
      }

      if (err) {
        checkEnd()
        return
      }

      files.forEach(function(file) {
        var srcPath = path.join(srcDir, file)
        var tarPath = path.join(tarDir, file)

        fs.stat(srcPath, function(err, stats) {
          if (stats.isDirectory()) {
            console.log('mkdir', tarPath)
            fs.mkdir(tarPath, function(err) {
              if (err) {
                console.log(err)
                //return
              }
              self.copyFolder(srcPath, tarPath, checkEnd)
            })
          } else {
            self.copyFile(srcPath, tarPath, checkEnd)
          }
        })
      })
      //为空时直接回调
      files.length === 0 && cb && cb()
    })
  },
  copyFile (srcPath, tarPath, cb) {
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function(err) {
      if (err) {
        console.log('read error', srcPath)
      }
      cb && cb(err)
    })

    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function(err) {
      if (err) {
        console.log('write error', tarPath)
      }
      cb && cb(err)
    })
    ws.on('close', function(ex) {
      cb && cb(ex)
    })

    rs.pipe(ws)
  },
  copy (src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
  },
  removeDir (rootFile, root) {
    var emptyDir = function(fileUrl){
        var files = fs.readdirSync(fileUrl);//读取该文件夹
        files.forEach(function(file){
            var stats = fs.statSync(fileUrl+'/'+file);
            if(stats.isDirectory()){
              emptyDir(fileUrl+'/'+file);
            }else{
              fs.unlinkSync(fileUrl+'/'+file);
              console.log("删除文件"+fileUrl+'/'+file+"成功");
            }
        });
    }
    //删除所有的空文件夹
    var rmEmptyDir = function(path){
        var files = [];
        if( fs.existsSync(path) ) {
            files = fs.readdirSync(path);
            files.forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) { // recurse
                    rmEmptyDir(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            if (!root) {
              fs.rmdirSync(path);
            }
        }
    }
    emptyDir(rootFile);
    rmEmptyDir(rootFile);
  },
  removeFile (fileUrl) {
    fs.unlinkSync(fileUrl);
  }
};

module.exports = files
