const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  featuredImage: String,
  content: { type: String, required: true },
  category: String,
  tags: [String],
  author: String,
  views: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  publishedAt: Date
}, { timestamps: true });

articleSchema.pre('validate', function (next) {
  if (this.title) this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Article', articleSchema);
