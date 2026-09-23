const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: String,
  image: String,
  website: String
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema);
