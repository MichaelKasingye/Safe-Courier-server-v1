const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ItemSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    question:{
        type:Number,
        required: true
    },
    answer:{
        type:Number,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = item = mongoose.model('pdts',ItemSchema);