const mongoose = require('mongoose');

const { Schema } = mongoose;

const Music = new Schema({
  Title:  { type: String, require: false },
  Link: { type: String, require: false },
}, {collection: 'musicShema'}
);

module.exports = mongoose.model('musicShema', Music);