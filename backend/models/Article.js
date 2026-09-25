const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  slug: { type: String, unique: true },
  featuredImage: String,
  content: { type: String, required: true, maxlength: 20000 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  views: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  publishedAt: Date
}, { timestamps: true });

articleSchema.pre('validate', function (next) {
  if (this.title) this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Article', articleSchema);
