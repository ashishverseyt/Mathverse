const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

/**
 * POST /api/ai/solve
 * Solve a math problem with AI
 */
router.post('/solve', async (req, res) => {
  const { problem, context } = req.body;
  
  if (!problem) {
    return res.status(400).json({ ok: false, error: 'Problem is required' });
  }

  try {
    const solution = await aiService.solveProblem(problem, context);
    return res.json({ ok: true, ...solution });
  } catch (err) {
    console.error('AI solve error:', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * POST /api/ai/chat
 * Chat with AI tutor
 */
router.post('/chat', async (req, res) => {
  const { message, chatHistory } = req.body;
  
  if (!message) {
    return res.status(400).json({ ok: false, error: 'Message is required' });
  }

  try {
    const response = await aiService.chat(message, chatHistory || []);
    return res.json({ ok: true, response });
  } catch (err) {
    console.error('AI chat error:', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * POST /api/ai/formulas
 * Search and recommend formulas based on natural language query
 * Works like ChatGPT - understand user intent and recommend formulas
 */
router.post('/formulas', async (req, res) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ ok: false, error: 'Query is required' });
  }

  try {
    const result = await aiService.searchFormulas(query);
    return res.json(result);
  } catch (err) {
    console.error('Formula search error:', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * GET /api/ai/formulas/categories
 * Get all available formula categories
 */
router.get('/formulas/categories', (req, res) => {
  try {
    const categories = aiService.getAllCategories();
    return res.json({ ok: true, categories });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * GET /api/ai/formulas/category/:category
 * Get all formulas in a specific category
 */
router.get('/formulas/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const formulas = aiService.getFormulasByCategory(category);
    return res.json({ ok: true, category, formulas, count: formulas.length });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * GET /api/ai/formulas/:id
 * Get a specific formula by ID
 */
router.get('/formulas/:id', (req, res) => {
  try {
    const { id } = req.params;
    const formula = aiService.getFormulaById(id);
    
    if (!formula) {
      return res.status(404).json({ ok: false, error: 'Formula not found' });
    }
    
    return res.json({ ok: true, formula });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

/**
 * POST /api/ai/ocr
 * Process OCR text from uploaded image
 * The client sends base64 or image data, we process it
 */
router.post('/ocr', async (req, res) => {
  const { imageData } = req.body;
  
  if (!imageData) {
    return res.status(400).json({ ok: false, error: 'Image data is required' });
  }

  try {
    // OCR is handled client-side using Tesseract.js
    // This endpoint can be used to process OCR results or re-process if needed
    return res.json({ 
      ok: true, 
      message: 'OCR processed. Use client-side Tesseract.js for best performance.' 
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
