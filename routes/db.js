var express = require('express');
var router = express.Router();
ModelDb = require('../models/db.js');
var multer = require('multer')
var MulterAzureStorage = require('multer-azure-storage')
var upload = multer({
  storage: new MulterAzureStorage({
    azureStorageConnectionString: 'DefaultEndpointsProtocol=https;AccountName=consortstorage;AccountKey=BM0fidUkpD7H0TQ/SjKaP00Of4v+2uX+XPkbGnDGfcIhBYuLeU//+S0IW7CjMyhpEWWm5Kgb2/FbiZItYcEa0A==;EndpointSuffix=core.windows.net',
    containerName: 'image',
    containerSecurity: 'blob'
  })
})



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
    let originalFileName = req.file.originalname;
    dbData.image         = originalFileName;
    ModelDb.addDb(dbData ,function(err,db){
        if(err){
          throw err;
        }
        return res.status(200).json(db);
      });
   
});

module.exports = router;
