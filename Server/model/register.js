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
    name:String, 
    link: String}],
    BadSong: [{
      name:String, 
      link: String}],
}, {collection: 'registerShema'}
);

module.exports = mongoose.model('registerShema', User);