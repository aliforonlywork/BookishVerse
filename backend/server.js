require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');                          // NEW
const mongoSanitize = require('express-mongo-sanitize');    // NEW
const rateLimit = require('express-rate-limit'); 
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authorRoutes = require('./routes/authorRoutes');
const articleRoutes = require('./routes/articleRoutes');

connectDB();

const app = express();
app.set('trust proxy', 1);
app.use(helmet());  
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // CHANGED — exact origin required, no more '*' fallback
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(mongoSanitize());  
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

const apiLimiter = rateLimit({                                // NEW
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: 'Too many requests, please try again later.' }
});

app.use('/api', apiLimiter); 

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/articles', articleRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`BookishVerse API running on port ${PORT}`));
