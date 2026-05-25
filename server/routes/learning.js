const express = require('express');
const router = express.Router();
const learningModules = require('../data/learningModules');
const quizzes = require('../data/quizzes');

/**
 * GET /api/learning
 * Get all learning modules with optional filtering
 */
router.get('/', (req, res) => {
  const { category, level } = req.query;
  let results = [...learningModules];

  if (category) {
    results = results.filter(m => m.category === category);
  }
  
  if (level) {
    results = results.filter(m => m.level === level);
  }

  return res.json({
    ok: true,
    count: results.length,
    modules: results.map(m => ({
      id: m.id,
      title: m.title,
      description: m.description,
      category: m.category,
      level: m.level,
      duration: m.duration
    }))
  });
});

/**
 * GET /api/learning/:id
 * Get full module content
 */
router.get('/:id', (req, res) => {
  const module = learningModules.find(m => m.id === req.params.id);
  
  if (!module) {
    return res.status(404).json({ ok: false, error: 'Module not found' });
  }

  return res.json({ ok: true, module });
});

/**
 * GET /api/learning/categories/list
 * Get all available categories
 */
router.get('/categories/list', (req, res) => {
  const categories = [...new Set(learningModules.map(m => m.category))].sort();
  return res.json({ ok: true, categories });
});

/**
 * GET /api/learning/levels/list
 * Get all available levels
 */
router.get('/levels/list', (req, res) => {
  const levels = [...new Set(learningModules.map(m => m.level))].sort();
  return res.json({ ok: true, levels });
});

module.exports = router;
