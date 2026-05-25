const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const calcRouter = require('./routes/calc');
const formulasRouter = require('./routes/formulas');
const aiRouter = require('./routes/ai');
const learningRouter = require('./routes/learning');
const quizzesRouter = require('./routes/quizzes');

const app = express();
app.use(bodyParser.json({ limit: '50mb' })); // Increase limit for image uploads
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// API Routes
app.use('/api/calc', calcRouter);
app.use('/api/formulas', formulasRouter);
app.use('/api/ai', aiRouter);
app.use('/api/learning', learningRouter);
app.use('/api/quizzes', quizzesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'MathVerse backend is running' });
});

// serve client static files
app.use(express.static(path.join(__dirname, '..', 'client')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`MathVerse starter running on http://localhost:${port}`));
