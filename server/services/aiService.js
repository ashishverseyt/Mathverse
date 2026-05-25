/**
 * AI Math Assistant Service
 * Supports OpenAI API or mock responses for development
 */

const axios = require('axios');
const formulas = require('../data/formulas');

class AIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || null;
    this.modelUsed = this.apiKey ? 'openai' : 'mock';
    this.formulas = formulas;
  }

  /**
   * Solve a math problem using AI
   * @param {string} problem - Math problem in text or LaTeX
   * @param {string} context - Additional context (e.g., topic, level)
   */
  async solveProblem(problem, context = '') {
    if (this.modelUsed === 'openai') {
      return this.solveWithOpenAI(problem, context);
    } else {
      return this.solveWithMock(problem, context);
    }
  }

  /**
   * Solve using OpenAI API
   */
  async solveWithOpenAI(problem, context) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an expert mathematics tutor. When given a problem:
1. Provide a step-by-step solution
2. Explain each step clearly
3. Identify key concepts being used
4. Suggest alternative approaches if applicable
5. Provide practical applications of the concept
Format your response as JSON with fields: solution (string with LaTeX), steps (array), concepts (array), alternateApproaches (array).`
            },
            {
              role: 'user',
              content: `${context ? `Context: ${context}\n` : ''}Problem: ${problem}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.choices[0].message.content;
      try {
        return JSON.parse(content);
      } catch {
        return {
          solution: content,
          steps: [content],
          concepts: [],
          alternateApproaches: []
        };
      }
    } catch (err) {
      console.error('OpenAI API error:', err.message);
      throw new Error(`AI service error: ${err.message}`);
    }
  }

  /**
   * Mock AI response (for development without API key)
   */
  async solveWithMock(problem, context) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock responses for common problem types
    const mockSolutions = {
      quadratic: {
        solution: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
        steps: [
          'Identify coefficients: a, b, c from ax² + bx + c = 0',
          'Calculate discriminant: Δ = b² - 4ac',
          'Apply quadratic formula',
          'Simplify to find solutions'
        ],
        concepts: ['Quadratic equations', 'Discriminant', 'Real vs Complex roots'],
        alternateApproaches: [
          'Factoring (if possible)',
          'Completing the square',
          'Graphical method'
        ]
      },
      derivative: {
        solution: 'f\'(x) = lim_{h→0} \\frac{f(x+h) - f(x)}{h}',
        steps: [
          'Understand that derivative measures rate of change',
          'Apply power rule: d/dx[x^n] = nx^(n-1)',
          'Use chain rule for composite functions',
          'Simplify the result'
        ],
        concepts: ['Limits', 'Rate of change', 'Differentiation rules'],
        alternateApproaches: [
          'Using limit definition directly',
          'Numerical differentiation',
          'Symbolic differentiation tools'
        ]
      },
      probability: {
        solution: 'P(A) = \\frac{\\text{favorable outcomes}}{\\text{total outcomes}}',
        steps: [
          'Identify the sample space',
          'Count favorable outcomes for event A',
          'Count total possible outcomes',
          'Calculate probability as ratio'
        ],
        concepts: ['Sample space', 'Events', 'Counting principles'],
        alternateApproaches: [
          'Conditional probability',
          'Using probability distributions',
          'Simulation/empirical method'
        ]
      },
      default: {
        solution: 'To solve this problem, follow the structured approach below.',
        steps: [
          'Read and understand the problem carefully',
          'Identify what is given and what needs to be found',
          'Choose an appropriate method or formula',
          'Perform calculations step-by-step',
          'Verify the solution and check if it makes sense'
        ],
        concepts: ['Problem-solving methodology', 'Mathematical reasoning'],
        alternateApproaches: [
          'Try a different formula or method',
          'Work backwards from the answer',
          'Use graphical representation'
        ]
      }
    };

    // Determine which mock to use based on problem keywords
    let mockType = 'default';
    if (problem.toLowerCase().includes('quadratic') || problem.toLowerCase().includes('ax²')) {
      mockType = 'quadratic';
    } else if (problem.toLowerCase().includes('derivative') || problem.toLowerCase().includes('differentiate')) {
      mockType = 'derivative';
    } else if (problem.toLowerCase().includes('probability') || problem.toLowerCase().includes('chance')) {
      mockType = 'probability';
    }

    return mockSolutions[mockType];
  }

  /**
   * Chat with AI tutor
   * @param {string} message - User message
   * @param {Array} chatHistory - Previous conversation
   */
  async chat(message, chatHistory = []) {
    if (this.modelUsed === 'openai') {
      return this.chatWithOpenAI(message, chatHistory);
    } else {
      return this.chatWithMock(message, chatHistory);
    }
  }

  /**
   * Chat with OpenAI
   */
  async chatWithOpenAI(message, chatHistory) {
    try {
      const messages = [
        {
          role: 'system',
          content: 'You are a friendly and knowledgeable mathematics tutor. Help students understand concepts, solve problems, and build confidence in mathematics. Be encouraging and clear in your explanations.'
        },
        ...chatHistory.map(h => ({
          role: h.role,
          content: h.content
        })),
        {
          role: 'user',
          content: message
        }
      ];

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages,
          temperature: 0.8,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (err) {
      console.error('OpenAI chat error:', err.message);
      throw new Error(`Chat service error: ${err.message}`);
    }
  }

  /**
   * Mock chat response
   */
  async chatWithMock(message, chatHistory) {
    await new Promise(resolve => setTimeout(resolve, 200));

    const responses = [
      'That\'s a great question! Let me break this down for you...',
      'Excellent! You\'re thinking about this correctly. Here\'s how it works...',
      'I\'m glad you asked! This is a fundamental concept in mathematics...',
      'That\'s exactly right! To understand this better, consider...',
      'Good observation! This relates to the concept of...'
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Search and recommend formulas based on user query
   * Works like ChatGPT - understands natural language prompts
   * @param {string} query - User's question or prompt about formulas
   */
  async searchFormulas(query) {
    if (this.modelUsed === 'openai') {
      return this.searchFormulasWithAI(query);
    } else {
      return this.searchFormulasWithMock(query);
    }
  }

  /**
   * Search formulas using AI understanding
   */
  async searchFormulasWithAI(query) {
    try {
      // Get keywords and context from the query
      const systemPrompt = `You are a mathematics expert assistant. The user is asking about formulas.
Analyze their query and:
1. Identify the mathematical topic or concept they're asking about
2. Suggest relevant formula IDs from this list: ${this.formulas.map(f => f.id).join(', ')}
3. Explain why these formulas are relevant
4. Provide a brief explanation of how to use the recommended formulas

Return your response as JSON with fields:
- topic (string): The identified mathematical topic
- recommendedFormulaIds (array): IDs of relevant formulas
- explanation (string): Explanation of the topic and recommended formulas
- usageGuide (string): How to apply these formulas`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: query
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const content = response.data.choices[0].message.content;
      let parsedResponse;
      
      try {
        parsedResponse = JSON.parse(content);
      } catch {
        parsedResponse = {
          topic: 'Mathematics',
          explanation: content,
          usageGuide: 'Please try a more specific query for better results.'
        };
      }

      // Get the actual formula objects
      const recommendedFormulas = (parsedResponse.recommendedFormulaIds || [])
        .map(id => this.formulas.find(f => f.id === id))
        .filter(f => f !== undefined);

      return {
        ok: true,
        topic: parsedResponse.topic,
        explanation: parsedResponse.explanation,
        usageGuide: parsedResponse.usageGuide,
        formulas: recommendedFormulas,
        formulaCount: recommendedFormulas.length
      };
    } catch (err) {
      console.error('Formula search AI error:', err.message);
      // Fallback to mock if API fails
      return this.searchFormulasWithMock(query);
    }
  }

  /**
   * Search formulas using keyword matching (mock/fallback)
   */
  async searchFormulasWithMock(query) {
    await new Promise(resolve => setTimeout(resolve, 300));

    const queryLower = query.toLowerCase();
    
    // Keyword mapping to formula categories and specific topics
    const keywordMap = {
      'area|circle|square|triangle|polygon|rectangle|trapezoid': 'areas',
      'volume|sphere|cylinder|cone|pyramid|box': 'volumes',
      'quadratic|polynomial|equation|algebra': 'algebra',
      'trigonometry|sine|cosine|tangent|angle|sin|cos|tan': 'trigonometry',
      'geometry|distance|midpoint|hypotenuse|pythagorean': 'geometry',
      'exponent|power|base|logarithm|log': 'exponents',
      'radical|root|square root|cube root': 'radicals',
      'derivative|differentiate|calculus|differential': 'derivatives',
      'integral|integrate|antiderivative': 'calculus',
      'probability|chance|combination|permutation|factorial': 'probability',
      'sequence|series|arithmetic|geometric': 'sequences',
      'statistics|standard deviation|distribution|mean|median|variance': 'statistics',
      'complex|imaginary|i|real part': 'complex',
      'vector|magnitude|dot product|cross product': 'vectors',
      'finance|interest|compound|investment|loan': 'finance',
      'physics|energy|force|velocity|voltage|current|resistance': 'physics'
    };

    // Find matching categories
    let matchedCategories = new Set();
    for (const [keywords, category] of Object.entries(keywordMap)) {
      const keywordArray = keywords.split('|');
      if (keywordArray.some(kw => queryLower.includes(kw))) {
        matchedCategories.add(category);
      }
    }

    // If no categories matched, search by keywords in descriptions
    if (matchedCategories.size === 0) {
      const matchedFormulas = this.formulas.filter(f => 
        queryLower.includes(f.name.toLowerCase()) ||
        queryLower.includes(f.category.toLowerCase()) ||
        f.description.toLowerCase().includes(queryLower)
      );
      
      if (matchedFormulas.length > 0) {
        return {
          ok: true,
          topic: 'General Search',
          explanation: `Found ${matchedFormulas.length} formula(s) matching your query: "${query}"`,
          usageGuide: 'These formulas are relevant to your topic. Click on any formula to see examples and applications.',
          formulas: matchedFormulas.slice(0, 10),
          formulaCount: matchedFormulas.length
        };
      }

      return {
        ok: true,
        topic: 'No Exact Match',
        explanation: `We couldn't find formulas exactly matching "${query}". Try searching for:`,
        usageGuide: 'Common topics: Area, Volume, Trigonometry, Calculus, Probability, Statistics, Physics, Finance',
        formulas: this.formulas.slice(0, 5),
        formulaCount: 0
      };
    }

    // Filter formulas by matched categories
    const matchedFormulas = this.formulas.filter(f => matchedCategories.has(f.category));

    // Determine topic name from categories
    const categoryNames = Array.from(matchedCategories);
    const topicName = categoryNames.length === 1 
      ? categoryNames[0].charAt(0).toUpperCase() + categoryNames[0].slice(1)
      : 'Multiple Topics';

    return {
      ok: true,
      topic: topicName,
      explanation: `Found ${matchedFormulas.length} formula(s) in ${categoryNames.join(', ')} related to your query.`,
      usageGuide: 'These formulas will help you solve problems in this topic. Each has examples and practical applications.',
      formulas: matchedFormulas,
      formulaCount: matchedFormulas.length
    };
  }

  /**
   * Get formula by ID or name
   */
  getFormulaById(id) {
    return this.formulas.find(f => f.id === id);
  }

  /**
   * Get all formulas in a category
   */
  getFormulasByCategory(category) {
    return this.formulas.filter(f => f.category === category);
  }

  /**
   * Get all available categories
   */
  getAllCategories() {
    const categories = new Set(this.formulas.map(f => f.category));
    return Array.from(categories).sort();
  }
}

module.exports = new AIService();
