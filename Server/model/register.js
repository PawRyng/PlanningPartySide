const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  login:  { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: false },
  date: {type: Date, require: false},
  pleace: {type:String, require: false},
  name: {type:String, require: false},
  type: {type:String, require: false},
  time: {type:String, require: false},
  LoveSong: [{
    Title: {type: String, require:true}, 
    Link: {type: String},
    _id: false
  }],
  BadSong: [{
    Title: {type: String, require:true}, 
    Link: {type: String},
    _id: false
  }],
}, {collection: 'registerShema'}
);

module.exports = mongoose.model('registerShema', User);