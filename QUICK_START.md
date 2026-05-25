# MathVerse - Quick Start Guide

## Installation (First Time Setup)

### 1. Install Node.js
- Download from: https://nodejs.org/ (LTS version recommended)
- Install and verify: `node --version` and `npm --version`

### 2. Install Dependencies
```bash
cd "e:\New folder"
npm install
```

This will install:
- express (web framework)
- body-parser (request parsing)
- mathjs (mathematics engine)
- axios (HTTP client for API calls)

### 3. Start the Server
```bash
npm start
```

You should see: `MathVerse starter running on http://localhost:3000`

### 4. Open in Browser
Navigate to: http://localhost:3000

---

## Using MathVerse

### Tab 1: Basic Calculator
- Enter math expressions like `(10 + 5) * 2`
- Supports all standard operators: `+ - * / ^ ()`
- Click "Calculate" to get result with steps

### Tab 2: Scientific Calculator
- Choose operation type from dropdown
- Example: Calculate sin(90°) or log₁₀(100)
- Shows step-by-step solution

### Tab 3: Matrix Calculator
- Input matrices as JSON arrays: `[[1, 2], [3, 4]]`
- Operations: Add, Multiply, Determinant, Inverse, Transpose
- Returns result matrix with explanation

### Tab 4: Geometry Calculator
- Select shape: Circle, Triangle, Rectangle, Sphere, Cylinder
- Enter dimensions
- Get area, volume, perimeter calculations

### Tab 5: Statistics Calculator
- Calculate: Mean, Median, Mode, Variance, Standard Deviation
- Enter space-separated numbers
- Includes advanced functions like quartiles and correlation

### Tab 6: Finance Calculator
- Calculate interest, loans, ROI, depreciation
- Examples:
  - Simple Interest: Principal=1000, Rate=5, Time=2 years
  - Compound Interest: With compounding frequency
  - Loan Payment (EMI): Amount, Rate, Months

### Tab 7: Formulas
- Search for mathematical formulas
- Filter by category (Algebra, Geometry, Trigonometry, etc.)
- Click formula to see:
  - LaTeX representation
  - Full derivation
  - Practical examples
  - Related formulas

### Tab 8: AI Assistant ⭐ NEW
Three ways to input problems:

**Text Input:**
- Type math problems naturally: "Solve x² + 5x + 6 = 0"
- Click "Solve Problem"
- Get solution with steps and key concepts

**Voice Input:** 
- Click "Start Listening" (requires microphone)
- Speak your math problem clearly
- System transcribes and solves automatically
- Click "Solve from Voice"

**Camera/Image Upload:**
- Upload a photo of handwritten math
- Click "Process Image" (uses OCR)
- Extracted text appears in textarea
- Click "Solve from OCR"

### Tab 9: Learning Modules ⭐ NEW
- Browse 6 curated learning modules:
  - Introduction to Algebra
  - Quadratic Equations
  - Trigonometry Basics
  - Calculus I
  - Statistics Fundamentals
  - Geometry Essentials

**How to use:**
1. Filter by Level (Beginner/Intermediate/Advanced)
2. Filter by Category (algebra, trigonometry, etc.)
3. Click "Apply Filter"
4. Click a module to view full content with examples

### Tab 10: Quizzes ⭐ NEW
- 4 interactive quizzes to test knowledge
- Each quiz has 15-25 minutes of content
- Question types: Multiple choice and short answer

**How to take a quiz:**
1. Select a quiz from the list
2. Answer each question (read explanations as needed)
3. Click "Submit Quiz"
4. See your score and detailed results
5. Review explanations for each question

---

## Example Workflows

### Workflow 1: Learn & Practice
1. Go to **Learning** tab
2. Select "Quadratic Equations" module
3. Read content and examples
4. Go to **Quizzes** tab
5. Take "Quadratic Equations" quiz
6. Review results and retry if needed

### Workflow 2: Solve Problems with AI
1. Go to **AI Assistant** tab
2. Choose input method:
   - **Type**: "Find the derivative of f(x) = x³ + 2x"
   - **Voice**: Click "Start Listening" and speak the problem
   - **Camera**: Upload a photo of handwritten problem
3. See AI solution with steps
4. Learn key concepts

### Workflow 3: Verify Your Math
1. Solve problem manually
2. Use appropriate **Calculator** tab to verify
3. Compare steps with your working

### Workflow 4: Search & Study
1. Go to **Formulas** tab
2. Search for "quadratic" or "pythagorean"
3. Click formula to see full details
4. Study derivation and examples
5. Click related formulas for deeper learning

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Next Tab | Ctrl + Right |
| Previous Tab | Ctrl + Left |
| Calculate | Enter (in input field) |
| Close Modal | Esc |

---

## Troubleshooting

### Server won't start
- **Error: "npm: command not found"**
  - Solution: Install Node.js from nodejs.org
  
- **Error: "Port 3000 already in use"**
  - Solution: Change port in server/index.js line `const port = process.env.PORT || 3000`

### AI Assistant not working
- Without OpenAI API key: Uses mock responses (quadratic, derivative templates)
- To enable real AI: Set environment variable `OPENAI_API_KEY=your_key`
- Run: `SET OPENAI_API_KEY=your_key` (Windows) or `export OPENAI_API_KEY=your_key` (Mac/Linux)

### Voice input not working
- Check browser supports Web Speech API (Chrome, Edge, Safari)
- Verify microphone permissions granted
- Some networks block audio APIs - try different browser

### OCR not reading images
- Upload clearer image with good lighting
- Handwriting should be distinct
- English language supported by default
- Image formats: JPG, PNG, WebP recommended

### Quiz results not showing
- Ensure all questions are answered
- For short answer questions, exact spelling matters
- Enable JavaScript in browser
- Try in different browser if issues persist

---

## Settings & Configuration

### Change AI Model
Edit `server/services/aiService.js`:
```javascript
// Use mock mode (no API key needed)
const aiService = new AIService('mock');

// Use OpenAI mode (requires OPENAI_API_KEY)
const aiService = new AIService('openai');
```

### Adjust Quiz Passing Grade
Edit `server/routes/quizzes.js`, line ~92:
```javascript
const passed = score >= 70; // Change 70 to your threshold
```

### Add Custom Formulas
Edit `server/data/formulas.js` and add new formula objects:
```javascript
{
  id: 'f999',
  name: 'Your Formula',
  category: 'your_category',
  formula: 'Your LaTeX formula',
  description: 'Description',
  variables: {...},
  ...
}
```

---

## Performance Tips

1. **Reduce Loading Time**
   - Use modern browser (Chrome, Firefox, Edge)
   - Disable browser extensions
   - Clear browser cache

2. **Improve Calculation Speed**
   - For very large matrices: break into smaller chunks
   - For large datasets: use Statistics calculator instead of manual

3. **Better AI Responses**
   - Ask clear, specific questions
   - Include context (e.g., "physics" not just "motion")
   - Break complex problems into steps

---

## Data & Privacy

- **Local Storage**: All calculations stored locally in browser
- **No Account Required**: Uses no personal data
- **AI Requests**: If using real OpenAI, requests sent to OpenAI servers
- **Quiz Progress**: Not saved (in-memory only without database)

To enable persistent storage:
1. Set up PostgreSQL database
2. Update connection string in server/index.js
3. Run schema.sql to create tables
4. Restart server

---

## Getting Help

### Common Questions

**Q: Can I use this offline?**
A: Yes! All features work offline except AI (without local model) and OCR (which downloads Tesseract.js once).

**Q: Can I export my results?**
A: Currently shows on screen. Copy/paste or screenshot to save.

**Q: Is there a dark mode?**
A: Yes! Currently using dark theme. Light mode can be added in client/index.html `style` section.

**Q: Can I customize the colors?**
A: Yes! Edit `client/index.html` CSS variables:
- Primary color: `#4a9eff` (blue)
- Secondary color: `#7b68ee` (purple)
- Background: `#0f1724` to `#1a2a3a` (dark)

---

## Support

For issues or feature requests, document:
1. Browser and version
2. Steps to reproduce
3. Error messages (check browser console with F12)
4. OS and Node.js version

---

**Happy Learning! 🚀**

For more details, see `INTEGRATION_SUMMARY.md` and `README.md`
