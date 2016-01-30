var initial = require('./config/default.json');

var hpManager = function (config){
  this.db = config.db;/* || throw new Error("DB information not found.");*/
  this.hpKey = config.hpKey || initial.hpKey;
  this.max = config.max || initial.max;
  this.min = config.min || initial.min;
};

hpManager.prototype.attack = function (key,val){
  val = val || initial.attack;
  var hpObj = this.db.get(this.hpKey) || {};
  hpObj[key] = hpObj[key] || this.max;

  hpObj[key] = Math.max(hpObj[key] - val, this.min);
  this.db.set(this.hpKey,hpObj);

  return hpObj[key];
};

hpManager.prototype.care = function (key,val){
  val = val || initial.care;
  var hpObj = this.db.get(this.hpKey) || {};
  hpObj[key] = hpObj[key] || this.max;
  hpObj[key] = Math.min(hpObj[key] + 10, this.max);
  this.db.set(this.hpKey,hpObj);

  return hpObj[key];
};

hpManager.prototype.status = function (key){
  var status = new Array();
  key = key || ''; 
  var listObj = this.db.get(this.hpKey) || {};
  if(key === ''){
    return listObj;
  } else{
    if(listObj[key] !== null){
      var data = {};
      data[key] = listObj[key];
      return data;
    }
  }
  return {};
};

hpManager.prototype.delete = function (key){
  key = key || ''; 
  var listObj = this.db.get(this.hpKey) || {};
  if(listObj[key]){
    delete listObj[key];
    this.db.set(this.hpKey,listObj);
  }
  return listObj;
};

module.exports = hpManager;
