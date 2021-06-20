const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ParcelSchema = new Schema({
    user: {
        type: new mongoose.Schema({
          name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
        }),
        required: true,
      },

      
    parcelName:{
        type:String,
        required: true
    },
    pickUp:{
        type:String,
        required: true
    },
    destination:{
        type:String,
        required: true
    },
    isCancelled:{
        type:Boolean,
        default: false
    },
    status:{
      type:String,
      required: true
  },
    
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = parcel = mongoose.model('parcel',ParcelSchema);