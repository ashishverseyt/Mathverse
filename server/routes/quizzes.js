const express = require('express');
const router = express.Router();
const quizzes = require('../data/quizzes');

/**
 * GET /api/quizzes
 * Get all quizzes with optional filtering
 */
router.get('/', (req, res) => {
  const { moduleId, difficulty } = req.query;
  let results = [...quizzes];

  if (moduleId) {
    results = results.filter(q => q.moduleId === moduleId);
  }

  if (difficulty) {
    results = results.filter(q => q.difficulty === difficulty);
  }

  return res.json({
    ok: true,
    count: results.length,
    quizzes: results.map(q => ({
      id: q.id,
      title: q.title,
      description: q.description,
      moduleId: q.moduleId,
      difficulty: q.difficulty,
      timeLimit: q.timeLimit,
      questionCount: q.questions.length
    }))
  });
});

/**
 * GET /api/quizzes/:id
 * Get quiz with all questions (answers hidden)
 */
router.get('/:id', (req, res) => {
  const quiz = quizzes.find(q => q.id === req.params.id);

  if (!quiz) {
    return res.status(404).json({ ok: false, error: 'Quiz not found' });
  }

  // Hide correct answers from client
  const questionsForClient = quiz.questions.map(q => {
    const questionObj = {
      id: q.id,
      type: q.type,
      question: q.question
    };
    
    if (q.type === 'multiple_choice') {
      questionObj.options = q.options.map(o => ({
        id: o.id,
        text: o.text
      }));
    }
    
    return questionObj;
  });

  return res.json({
    ok: true,
    quiz: {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      difficulty: quiz.difficulty,
      timeLimit: quiz.timeLimit,
      questions: questionsForClient
    }
  });
});

/**
 * POST /api/quizzes/:id/submit
 * Submit quiz answers and get score
 */
router.post('/:id/submit', (req, res) => {
  const { answers } = req.body;
  const quiz = quizzes.find(q => q.id === req.params.id);

  if (!quiz) {
    return res.status(404).json({ ok: false, error: 'Quiz not found' });
  }

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ ok: false, error: 'Answers must be an array' });
  }

  let correctCount = 0;
  const results = [];

  quiz.questions.forEach((question, index) => {
    const userAnswer = answers[index];
    let isCorrect = false;

    if (question.type === 'multiple_choice') {
      isCorrect = userAnswer === question.options.find(o => o.correct).id;
    } else if (question.type === 'short_answer') {
      // Simple string comparison (case-insensitive)
      isCorrect = userAnswer.toString().toLowerCase().trim() === 
                  question.correctAnswer.toString().toLowerCase().trim();
    }

    if (isCorrect) correctCount++;

    results.push({
      questionId: question.id,
      userAnswer,
      correct: isCorrect,
      explanation: question.explanation,
      correctAnswer: question.type === 'short_answer' ? question.correctAnswer : undefined
    });
  });

  const score = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = score >= 70; // 70% is passing

  return res.json({
    ok: true,
    score,
    passed,
    correctCount,
    totalCount: quiz.questions.length,
    results
  });
});

module.exports = router;
