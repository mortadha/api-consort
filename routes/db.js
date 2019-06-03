var express = require('express');
var router = express.Router();
ModelDb = require('../../api/models/db.js');




/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('get DB');
  });

/* Post add DB. */
router.post('/add', function(req, res, next) {
    var db = req.body;
    console.log('db');
    console.log(db);
    var dbData = {};
    dbData.serie = "serie";
    dbData.name  = "name";
    dbData.type  = "type";
    ModelDb.addDb(dbData ,function(err,db){
        if(err){
          throw err;
        }
        return res.status(200).json(db);
      });
   
});

module.exports = router;
