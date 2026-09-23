require('dotenv').config();
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const Category = require('../models/Category');
const Author = require('../models/Author');
const Book = require('../models/Book');

const categories = ['Self-Help', 'Business', 'Psychology', 'History', 'Biography', 'Philosophy', 'Science', 'Adventure'];

const run = async () => {
  await connectDB();
  await Promise.all([Admin.deleteMany(), Category.deleteMany(), Author.deleteMany(), Book.deleteMany()]);

  await Admin.create({ name: 'Admin', email: 'admin@bookishverse.com', password: 'admin123' });

  const catDocs = await Category.insertMany(categories.map((name) => ({ name })));
  const catId = (name) => catDocs.find((c) => c.name === name)._id;

  const authorNames = ['James Clear', 'Cal Newport', 'Charles Duhigg', 'Daniel Kahneman', 'Yuval Noah Harari', 'Peter Thiel'];
  const authorDocs = await Author.insertMany(
    authorNames.map((name) => ({ name, biography: `${name} is an author known for influential nonfiction work.` }))
  );
  const authId = (name) => authorDocs.find((a) => a.name === name)._id;

  await Book.insertMany([
    { title: 'Atomic Habits', author: authId('James Clear'), category: catId('Self-Help'), publicationYear: 2018, description: 'A practical guide to building good habits.', summary: 'Clear argues that remarkable results come from tiny, compounding improvements.', keyIdeas: ['Habits compound over time', 'Focus on systems, not goals'], lessons: ['Small changes compound'], whoShouldRead: 'Anyone seeking a practical change framework.', featured: true, views: 18420 },
    { title: 'Deep Work', author: authId('Cal Newport'), category: catId('Self-Help'), publicationYear: 2016, description: 'Why focused work is valuable.', summary: 'Newport argues distraction-free focus is a rare, valuable skill.', keyIdeas: ['Deep work produces outsized value'], lessons: ['Schedule deep work like meetings'], whoShouldRead: 'Knowledge workers.', featured: true, views: 9840 },
    { title: 'The Power of Habit', author: authId('Charles Duhigg'), category: catId('Psychology'), publicationYear: 2012, description: 'The science of habits.', summary: 'Duhigg explains the cue-routine-reward habit loop.', keyIdeas: ['Habit loop: cue, routine, reward'], lessons: ['Identify the cue before changing a habit'], whoShouldRead: 'Curious readers.', featured: false, views: 14200 },
    { title: 'Thinking, Fast and Slow', author: authId('Daniel Kahneman'), category: catId('Psychology'), publicationYear: 2011, description: 'Two systems of thought.', summary: 'Kahneman explains System 1 and System 2 thinking.', keyIdeas: ['Two systems drive thought'], lessons: ['Question your first instinct'], whoShouldRead: 'Decision-making enthusiasts.', featured: true, views: 21030 },
    { title: 'Sapiens', author: authId('Yuval Noah Harari'), category: catId('History'), publicationYear: 2011, description: 'A brief history of humankind.', summary: 'Harari traces humanity through cognitive, agricultural, and scientific revolutions.', keyIdeas: ['Shared myths enable cooperation'], lessons: ['Question societal stories'], whoShouldRead: 'Big-picture history fans.', featured: true, views: 26710 },
    { title: 'Zero to One', author: authId('Peter Thiel'), category: catId('Business'), publicationYear: 2014, description: 'Notes on startups.', summary: 'Thiel argues true innovation goes from 0 to 1.', keyIdeas: ['Aim for monopoly through innovation'], lessons: ['Build proprietary technology'], whoShouldRead: 'Founders.', featured: false, views: 11250 }
  ]);

  console.log('Seed complete. Admin login: admin@bookishverse.com / admin123');
  process.exit();
};

run();
