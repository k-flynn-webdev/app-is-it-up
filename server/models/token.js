const mongoose = require('mongoose');

var token = mongoose.Schema({
  token : { type: String, required: true }
})
module.exports = mongoose.model('Token', token);