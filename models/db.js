var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//admin shema
dbSchema = require('../shemas/dbShema.js')

var DbTest = module.exports = mongoose.model('DbTest',dbSchema)



//Add Db 
module.exports.addDb = function(test,callback){
    console.log('test db : ');
    console.log(test);
    DbTest.create(test,callback);
}

