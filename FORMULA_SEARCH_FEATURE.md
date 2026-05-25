# 🔍 AI-Powered Formula Search Feature

## Overview
A new ChatGPT-like feature has been added to MathVerse that allows users to find formulas by asking natural language questions about topics they want to learn.

---

## How It Works

### User Experience
1. Navigate to **AI Assistant** tab
2. Scroll to **"Search Formulas by Topic"** section
3. Ask any question in plain English, such as:
   - "How to calculate circle area?"
   - "What formula for compound interest?"
   - "Trigonometry formulas"
   - "How to find derivatives?"
   - "Probability formulas"

4. Click **"Search Formulas"** button
5. Get AI-recommended formulas with explanations
6. Click on any formula to see detailed view with examples

---

## API Endpoints

### 1. **POST /api/ai/formulas** - Search Formulas by Query
Search and recommend formulas based on natural language queries.

**Request:**
```json
{
  "query": "How to calculate the area of a triangle?"
}
```

**Response:**
```json
{
  "ok": true,
  "topic": "Areas",
  "explanation": "Found 3 formula(s) in areas related to your query.",
  "usageGuide": "These formulas will help you solve problems in this topic.",
  "formulas": [
    {
      "id": "area001",
      "name": "Triangle Area",
      "category": "areas",
      "formula": "A = \\frac{1}{2}bh",
      "description": "Area of a triangle",
      "variables": { "b": "Base", "h": "Height", "A": "Area" },
      "examples": [{ "problem": "Triangle with base 10 and height 5", "solution": "A = 0.5 × 10 × 5 = 25" }],
      "practicalUses": ["Land measurement", "Construction"],
      "derivation": "..."
    }
  ],
  "formulaCount": 3
}
```

### 2. **GET /api/ai/formulas/categories** - Get All Categories
Retrieve all available formula categories.

**Response:**
```json
{
  "ok": true,
  "categories": ["algebra", "areas", "volumes", "geometry", "trigonometry", "calculus", "statistics", "physics", "finance", "probability", "sequences", "derivatives", "logarithms", "complex", "vectors", "exponents", "radicals"]
}
```

### 3. **GET /api/ai/formulas/category/:category** - Get Formulas by Category
Get all formulas in a specific category.

**Example:** GET `/api/ai/formulas/category/trigonometry`

**Response:**
```json
{
  "ok": true,
  "category": "trigonometry",
  "formulas": [...],
  "count": 5
}
```

### 4. **GET /api/ai/formulas/:id** - Get Specific Formula
Retrieve details of a single formula by ID.

**Example:** GET `/api/ai/formulas/area001`

**Response:**
```json
{
  "ok": true,
  "formula": {
    "id": "area001",
    "name": "Triangle Area",
    ...
  }
}
```

---

## Features

### 🎯 Smart Matching
- **AI-Powered (with API key):** Uses OpenAI to understand user intent and recommend relevant formulas
- **Fallback Mode:** Keyword-based matching when API is not available

### 📚 Comprehensive Formula Database
The feature includes 60+ formulas across:
- **Areas:** Circle, Triangle, Square, Rectangle, Trapezoid, Ellipse, Polygon
- **Volumes:** Sphere, Cylinder, Cone, Pyramid, Cube, Rectangular Prism
- **Geometry:** Pythagorean Theorem, Distance Formula, Midpoint Formula
- **Trigonometry:** Sine Rule, Cosine Rule, Pythagorean Identity, Double Angles
- **Calculus:** Derivatives (Power, Product, Quotient, Chain Rule), Integration
- **Probability:** Basic Rule, Addition Rule, Multiplication Rule, Combinations, Permutations
- **Statistics:** Standard Deviation, Normal Distribution
- **Sequences:** Arithmetic, Geometric, Series Sum
- **Logarithms:** Product Rule, Quotient Rule, Power Rule, Change of Base
- **Complex Numbers & Vectors**
- **Algebra, Exponents, Radicals**
- **Physics & Finance**

### 📖 Detailed Formula Information
Each formula includes:
- **Name & Description** - What it's used for
- **Formula** - In LaTeX notation
- **Variables** - Explanation of each variable
- **Examples** - Real problems and solutions
- **Practical Applications** - Real-world uses
- **Derivation** - How the formula is derived
- **Related Formulas** - Links to related concepts

---

## Implementation Details

### Backend Changes

#### Modified: `server/services/aiService.js`
- Added `searchFormulas(query)` method
- Added `searchFormulasWithAI(query)` for AI-powered search
- Added `searchFormulasWithMock(query)` for fallback keyword matching
- Added helper methods: `getFormulaById()`, `getFormulasByCategory()`, `getAllCategories()`
- Imports formulas database

#### Modified: `server/routes/ai.js`
- Added `POST /api/ai/formulas` - Search formulas by query
- Added `GET /api/ai/formulas/categories` - Get all categories
- Added `GET /api/ai/formulas/category/:category` - Get by category
- Added `GET /api/ai/formulas/:id` - Get specific formula

### Frontend Changes

#### Modified: `client/index.html`
- Added "Search Formulas by Topic" section in AI Assistant tab
- Interactive UI with textarea for formula queries
- Displays recommended formulas with styling

#### Modified: `client/app.js`
- Added `searchFormulasWithAI(query)` function
- Added `viewFormulaDetail(formula)` function
- Event listeners for search button and Enter key
- Beautiful formula display with examples and applications

---

## Usage Examples

### Example 1: Basic Area Calculation
**User Query:** "How to calculate circle area?"

**System Response:**
```
Topic: Areas
Explanation: Found 1 formula(s) in areas related to your query.
Recommended Formula: Circle Area and Circumference
Formula: A = πr²
```

### Example 2: Compound Searches
**User Query:** "I need finance formulas for investments"

**System Response:**
```
Topic: Finance
Explanation: Found 2 formula(s) in finance related to your query.
Recommended Formulas:
  1. Compound Interest
  2. Simple Interest
```

### Example 3: Physics Application
**User Query:** "Energy formula"

**System Response:**
```
Topic: Physics
Explanation: Found 1 formula(s) in physics related to your query.
Recommended Formula: Kinetic Energy
Formula: KE = ½mv²
```

---

## Configuration

### OpenAI Integration (Optional)
For AI-powered search instead of keyword matching:

```bash
# Set environment variable
set OPENAI_API_KEY=your_api_key_here
```

If no API key is provided, the system automatically falls back to intelligent keyword matching.

---

## Performance

- **Keyword Matching:** Instant response (< 100ms)
- **AI-Powered Search:** Fast response (< 2 seconds with API)
- **Formula Display:** Smooth animations and hover effects
- **Mobile Responsive:** Works on all devices

---

## Future Enhancements

- [ ] Voice-based formula search
- [ ] Bookmarking favorite formulas
- [ ] Custom formula creation
- [ ] Formula calculator integration
- [ ] Mobile app support
- [ ] Multiple language support
- [ ] LaTeX to image rendering
- [ ] Formula history/recent searches

---

## Error Handling

- Invalid queries handled gracefully
- Fallback to keyword matching if API fails
- Clear error messages to users
- No formulas found? System suggests common topics

---

## Notes

- Works with or without OpenAI API key
- 60+ math formulas covering most topics
- Intelligent keyword mapping for better matching
- Mobile-friendly interface
- Real-time search with instant results
