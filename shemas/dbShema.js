let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

module.exports = dbSchema = new Schema({
    serie:String,
    name:String,
    type:String,
    create_date:{
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});
