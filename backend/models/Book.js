const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  description: String,
  coverImage: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  publicationYear: Number,
  summary: String,
  keyIdeas: [String],
  lessons: [String],
  chapterSummaries: [{ title: String, content: String }],
  whoShouldRead: String,
  relatedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  affiliateLink: String,
  views: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

bookSchema.pre('validate', function (next) {
  if (this.title) this.slug = slugify(this.title, { lower: true }) + '-summary';
  next();
});

module.exports = mongoose.model('Book', bookSchema);
