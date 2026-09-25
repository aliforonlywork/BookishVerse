const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 150 },
  biography: { type: String, maxlength: 3000 },
  image: String,
  website: { type: String, maxlength: 200 }
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema);
