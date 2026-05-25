# MathVerse — Premium All-in-One Mathematics Learning & Calculation Platform

A comprehensive, intelligent mathematics platform for students, teachers, engineers, competitive exam aspirants, and professionals. Combining powerful calculators, AI-powered problem solving, an extensive formula library, and interactive learning resources.

## Features (Phase 1 - MVP)

### 📊 Multiple Calculators
- **Basic Calculator**: Standard arithmetic operations with step-by-step explanations
- **Scientific Calculator**: Trigonometric, logarithmic, exponential, factorial, and percentage calculations
- **Matrix Calculator**: Matrix operations (add, multiply, transpose, determinant, inverse), linear system solving
- **Geometry Calculator**: Area, perimeter, volume calculations for shapes (circle, triangle, rectangle, sphere, cylinder)
- **Statistics Calculator**: Mean, median, mode, variance, SD, quartiles, correlation, z-score, combinations, permutations
- **Finance Calculator**: Simple interest, compound interest, annuities, loan payments (EMI), ROI, depreciation, break-even analysis

### 📚 Formula Library
- **Searchable database** with 20+ formulas across multiple disciplines
- **Categories**: Algebra, Geometry, Trigonometry, Calculus, Statistics, Physics, Finance
- **Rich formula details**: Definition, variable meanings, derivation, examples, practical uses, related formulas
- **LaTeX rendering** support for mathematical notation

### 🎯 API-Driven Architecture
- **RESTful APIs** for all calculator types and formulas
- **Structured JSON responses** with step-by-step explanations
- **Comprehensive OpenAPI documentation** (see `openapi.yaml`)

### 💾 Database Schema
- **PostgreSQL schema** supporting users, calculations, formulas, learning modules, quizzes, AI chat history, subscriptions
- **Ready for scaling** with proper indexing and relationships (see `server/schema.sql`)

### 🎨 Modern, Responsive UI
- **Beautiful dark/light theme** with gradient effects and smooth animations
- **Tabbed interface** for easy navigation between calculator types
- **Responsive design** works on desktop, tablet, and mobile
- **Real-time calculations** with instant step-by-step explanations

## Tech Stack

- **Frontend**: HTML5, CSS3 (responsive grid, flexbox, animations), JavaScript (ES6+)
- **Backend**: Node.js + Express.js
- **Math Engine**: mathjs (symbolic and numeric math), custom calculator modules
- **Database**: PostgreSQL (schema included)
- **Server**: Development mode on http://localhost:3000

## Project Structure

```
.
├── client/
│   ├── index.html          # Main UI with all tabs
│   └── app.js              # Frontend logic, tab switching, API calls
├── server/
│   ├── index.js            # Express server, route registration
│   ├── schema.sql          # PostgreSQL database schema
│   ├── data/
│   │   └── formulas.js     # Formula library database
│   ├── routes/
│   │   ├── calc.js         # Calculator API endpoint
│   │   └── formulas.js     # Formula search & detail endpoint
│   └── calculators/
│       ├── scientific.js   # Scientific calculator module
│       ├── matrix.js       # Matrix operations module
│       ├── geometry.js     # Geometry calculations module
│       ├── statistics.js   # Statistics operations module
│       └── finance.js      # Finance calculations module
├── openapi.yaml            # API specification
├── package.json            # Dependencies
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Getting Started

### Prerequisites
- Node.js 14+ and npm
- (Optional) PostgreSQL for persistent storage

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

Server runs on `http://localhost:3000`

### Try it Out

1. Open browser to http://localhost:3000
2. **Basic Tab**: Enter any arithmetic expression (e.g., `(10 + 5) * 2`)
3. **Scientific Tab**: Calculate trigonometric, logarithmic, or exponential functions
4. **Matrix Tab**: Perform matrix operations (paste JSON arrays)
5. **Geometry Tab**: Calculate areas, volumes, and dimensions
6. **Statistics Tab**: Analyze datasets (mean, median, standard deviation, etc.)
7. **Finance Tab**: Calculate loans, investments, interest, ROI
8. **Formulas Tab**: Search and explore the formula library

## Example API Calls

### Basic Calculator
```json
{
  "type": "basic",
  "expression": "2 + 3 * 4"
}
```

### Scientific Calculator
```json
{
  "type": "scientific",
  "operation": "trigonometric",
  "params": {
    "func": "sin",
    "angle": 90,
    "unit": "deg"
  }
}
```

### Matrix Calculator
```json
{
  "type": "matrix",
  "operation": "determinant",
  "params": {
    "matrix": [[1, 2], [3, 4]]
  }
}
```

### Geometry Calculator
```json
{
  "type": "geometry",
  "operation": "circle",
  "params": {
    "prop": "area",
    "value": 5
  }
}
```

### Statistics Calculator
```json
{
  "type": "statistics",
  "operation": "mean",
  "params": {
    "values": [1, 2, 3, 4, 5]
  }
}
```

### Finance Calculator
```json
{
  "type": "finance",
  "operation": "compoundInterest",
  "params": {
    "principal": 1000,
    "rate": 0.05,
    "time": 2,
    "compounds": 12
  }
}
```

### Formula Search
```
GET /api/formulas?q=quadratic&category=algebra&limit=10
```

### Formula Details
```
GET /api/formulas/alg001
```

## Next Steps (Phase 2+)

- ✅ **Phase 1 (MVP)**: Basic calculators, formula library, responsive UI
- 🔄 **Phase 2**: Authentication, user dashboard, saving calculations, subscriptions
- 🔄 **Phase 3**: AI assistant integration (LLM), OCR for handwritten questions, voice input
- 🔄 **Phase 4**: Learning modules, quizzes, flashcards, interactive lessons
- 🔄 **Phase 5**: Advanced tools (LaTeX editor, graph plotter, probability simulator)
- 🔄 **Phase 6**: Mobile apps (React Native/Flutter), PWA, offline mode
- 🔄 **Phase 7**: Community features (forums, leaderboards, competitions)
- 🔄 **Phase 8**: Production deployment, CDN, analytics, admin panel

## Database Setup (Optional)

To use PostgreSQL, initialize the schema:

```bash
psql -U postgres -d mathverse < server/schema.sql
```

Then update `server/index.js` to connect to PostgreSQL.

## API Documentation

Full OpenAPI 3.0 specification available in `openapi.yaml`. Import to Swagger UI or similar tools for interactive documentation.

## Contributing

This is a starter scaffold for the MathVerse project vision. Contributions welcome!

## License

Proprietary — MathVerse Product

## Support

For issues, feature requests, or questions, please refer to the project documentation or create an issue in the repository.

---

**Built with ❤️ for mathematics learners worldwide.**
