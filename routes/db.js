var express = require('express');
var router = express.Router();
ModelDb = require('../models/db.js');
var upload = multer({ dest: 'public/images/' })



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('get DB');
  });

/* Post add DB. */
router.post('/add', upload.single('image'), function(req, res, next) {
    var dbBody = req.body;
    //return res.status(200).json(dbBody);
    var dbData = {};
    dbData.serie = dbBody.serie;
    dbData.name  = dbBody.name;
    dbData.type  = dbBody.type;
    ModelDb.addDb(dbData ,function(err,db){
        if(err){
          throw err;
        }
        return res.status(200).json(db);
      });
   
});

module.exports = router;
