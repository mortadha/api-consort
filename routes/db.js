var express = require('express');
var router = express.Router();
ModelDb = require('../models/db.js');




/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('get DB');
  });

/* Post add DB. */
router.post('/add', function(req, res, next) {
    var dbBody = req.body;
    var dbData = {};
    dbData.serie = dbBody.serie;
    dbData.name  = serie.name;
    dbData.type  = serie.type;
    ModelDb.addDb(dbData ,function(err,db){
        if(err){
          throw err;
        }
        return res.status(200).json(db);
      });
   
});

module.exports = router;
