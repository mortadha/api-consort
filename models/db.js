var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//admin shema
dbSchema = require('../shemas/dbShema.js')

var DbTest = module.exports = mongoose.model('DbTest',dbSchema)



//Add Db 
module.exports.addDb = function(test,callback){
    DbTest.create(test,callback);
}
//Get DB 
module.exports.getDbs = function (callback, limit) {
    DbTest.find(callback).limit(limit);
}
