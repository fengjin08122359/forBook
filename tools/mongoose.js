var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('debug', true);

var congfigSchema = new Schema({
  config:  [{ label: String, full: String}],
  directories: [{ id: Number, name: String, dir: String}]
});

var Config = mongoose.model('Config', congfigSchema);

const mongooseSys = {
  database: null,
  init () {
    var self = this;
    var db = mongoose.connect('mongodb://localhost/configSetting');
    db.then((database) => {
      self.database = database;
      database.connection.on("error", function (error) {  
        console.log("数据库连接失败：" + error); 
      }); 
      database.connection.on("open", function () {  
        console.log("数据库连接成功"); 
      });
    })
  },
  get () {
    var promise = new Promise(function (resolve, reject) {
      Config.find({}, function(err, docs) {
        resolve(JSON.stringify(docs));
      });
    });
    return promise;    
  },
  add () {
    var config = new Config({
      config: [{label: '1', full:'1'}],
      directories: [{id: 0, name:'2', dir: '3'}]
    });
    config.save(function(err) {});
  }
};

module.exports = mongooseSys