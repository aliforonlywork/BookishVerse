const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true },
  description: String,
  image: String
}, { timestamps: true });

categorySchema.pre('validate', function (next) {
  if (this.name) this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Category', categorySchema);
