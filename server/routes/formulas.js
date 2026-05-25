const express = require('express');
const router = express.Router();
const formulas = require('../data/formulas');

/**
 * GET /api/formulas
 * Search formulas by query, category, or limit
 */
router.get('/', (req, res) => {
  const { q, category, limit = 20 } = req.query;
  let results = [...formulas];

  if (category) {
    results = results.filter(f => f.category === category);
  }

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(f =>
      f.name.toLowerCase().includes(query) ||
      f.description.toLowerCase().includes(query) ||
      f.category.toLowerCase().includes(query)
    );
  }

  results = results.slice(0, parseInt(limit));

  return res.json({
    ok: true,
    count: results.length,
    results: results.map(f => ({
      id: f.id,
      name: f.name,
      category: f.category,
      formula: f.formula,
      description: f.description
    }))
  });
});

/**
 * GET /api/formulas/:id
 * Get full formula details
 */
router.get('/:id', (req, res) => {
  const formula = formulas.find(f => f.id === req.params.id);
  if (!formula) {
    return res.status(404).json({ ok: false, error: 'Formula not found' });
  }
  return res.json({ ok: true, formula });
});

/**
 * GET /api/formulas/categories
 * Get all available categories
 */
router.get('/categories/list', (req, res) => {
  const categories = [...new Set(formulas.map(f => f.category))].sort();
  return res.json({ ok: true, categories });
});

module.exports = router;
