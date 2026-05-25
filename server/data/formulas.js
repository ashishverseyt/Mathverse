/**
 * MathVerse Formula Library
 * Comprehensive collection of formulas across mathematics, physics, chemistry, finance
 */

const formulas = [
  // Algebra
  {
    id: 'alg001',
    name: 'Quadratic Formula',
    category: 'algebra',
    formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    description: 'Solves ax² + bx + c = 0',
    variables: {
      'a': 'Coefficient of x²',
      'b': 'Coefficient of x',
      'c': 'Constant term',
      'x': 'Solution(s)'
    },
    derivation: 'Completing the square method applied to ax² + bx + c = 0',
    examples: [
      {
        problem: 'Solve x² + 5x + 6 = 0',
        solution: 'a=1, b=5, c=6 → x = -2, -3'
      }
    ],
    practicalUses: [
      'Finding roots of polynomial equations',
      'Physics projectile motion',
      'Engineering optimization'
    ],
    relatedFormulas: ['alg002', 'alg003']
  },
  {
    id: 'alg002',
    name: 'Arithmetic Sequence Sum',
    category: 'algebra',
    formula: 'S_n = \\frac{n(a_1 + a_n)}{2}',
    description: 'Sum of first n terms of arithmetic sequence',
    variables: {
      'n': 'Number of terms',
      'a₁': 'First term',
      'aₙ': 'Last term',
      'Sₙ': 'Sum'
    },
    derivation: 'Sum = (first + last)/2 × count',
    examples: [
      {
        problem: 'Sum of 1 + 2 + 3 + ... + 100',
        solution: 'n=100, a₁=1, a₁₀₀=100 → S₁₀₀ = 5050'
      }
    ],
    practicalUses: ['Financial calculations', 'Total distance/time problems'],
    relatedFormulas: ['alg003']
  },

  // Geometry
  {
    id: 'geo001',
    name: 'Pythagorean Theorem',
    category: 'geometry',
    formula: 'a^2 + b^2 = c^2',
    description: 'Relationship in right triangles',
    variables: {
      'a': 'First leg',
      'b': 'Second leg',
      'c': 'Hypotenuse'
    },
    derivation: 'Proven through geometric dissection and area equivalence',
    examples: [
      {
        problem: 'Find hypotenuse when a=3, b=4',
        solution: 'c² = 9 + 16 = 25 → c = 5'
      }
    ],
    practicalUses: ['Architecture', 'Construction', 'Navigation'],
    relatedFormulas: ['geo002']
  },
  {
    id: 'geo002',
    name: 'Circle Area and Circumference',
    category: 'geometry',
    formula: 'A = \\pi r^2, \\quad C = 2\\pi r',
    description: 'Area and circumference of a circle',
    variables: {
      'r': 'Radius',
      'A': 'Area',
      'C': 'Circumference',
      'π': 'Pi (≈3.14159)'
    },
    derivation: 'Derived from limit of regular polygons as sides increase',
    examples: [
      {
        problem: 'Circle with radius 5',
        solution: 'A = 25π ≈ 78.54, C = 10π ≈ 31.42'
      }
    ],
    practicalUses: ['Land surveying', 'Engineering', 'Astronomy'],
    relatedFormulas: ['geo001']
  },

  // Trigonometry
  {
    id: 'trig001',
    name: 'Sine Rule',
    category: 'trigonometry',
    formula: '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}',
    description: 'Relates sides and angles in any triangle',
    variables: {
      'a, b, c': 'Side lengths',
      'A, B, C': 'Opposite angles'
    },
    derivation: 'Derived from area formula and trigonometric identities',
    examples: [
      {
        problem: 'Find side b when a=10, A=30°, B=60°',
        solution: 'b = 10 × sin(60°)/sin(30°) ≈ 17.32'
      }
    ],
    practicalUses: ['Surveying', 'Navigation', 'Astronomy'],
    relatedFormulas: ['trig002']
  },
  {
    id: 'trig002',
    name: 'Cosine Rule',
    category: 'trigonometry',
    formula: 'c^2 = a^2 + b^2 - 2ab\\cos C',
    description: 'Generalizes Pythagorean theorem to any triangle',
    variables: {
      'a, b, c': 'Side lengths',
      'C': 'Angle opposite side c'
    },
    derivation: 'Extension of Pythagorean theorem using projection',
    examples: [
      {
        problem: 'Find side c when a=5, b=6, C=60°',
        solution: 'c² = 25 + 36 - 60cos(60°) = 31 → c ≈ 5.57'
      }
    ],
    practicalUses: ['Engineering', 'Satellite triangulation'],
    relatedFormulas: ['trig001']
  },

  // Calculus
  {
    id: 'calc001',
    name: 'Power Rule (Derivative)',
    category: 'calculus',
    formula: '\\frac{d}{dx}[x^n] = nx^{n-1}',
    description: 'Derivative of power function',
    variables: {
      'n': 'Exponent',
      'x': 'Variable',
      'd/dx': 'Derivative operator'
    },
    derivation: 'From first principles limit of (f(x+h)-f(x))/h as h→0',
    examples: [
      {
        problem: 'Derivative of x³',
        solution: 'f\'(x) = 3x²'
      }
    ],
    practicalUses: ['Optimization', 'Rate of change analysis'],
    relatedFormulas: ['calc002']
  },
  {
    id: 'calc002',
    name: 'Power Rule (Integration)',
    category: 'calculus',
    formula: '∫x^n dx = \\frac{x^{n+1}}{n+1} + C, \\quad n \\neq -1',
    description: 'Antiderivative of power function',
    variables: {
      'n': 'Exponent',
      'x': 'Variable',
      'C': 'Constant of integration'
    },
    derivation: 'Inverse of power rule for derivatives',
    examples: [
      {
        problem: 'Integral of x²',
        solution: '∫x² dx = x³/3 + C'
      }
    ],
    practicalUses: ['Area under curves', 'Accumulation calculations'],
    relatedFormulas: ['calc001']
  },

  // Statistics
  {
    id: 'stat001',
    name: 'Normal Distribution',
    category: 'statistics',
    formula: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
    description: 'Probability density function of normal distribution',
    variables: {
      'μ': 'Mean',
      'σ': 'Standard deviation',
      'x': 'Value',
      'e': 'Euler\'s number'
    },
    derivation: 'Central limit theorem and exponential bell curve',
    examples: [
      {
        problem: 'Probability for value in μ ± σ',
        solution: 'Approximately 68.27%'
      }
    ],
    practicalUses: ['Quality control', 'Risk assessment', 'Medical testing'],
    relatedFormulas: ['stat002']
  },
  {
    id: 'stat002',
    name: 'Standard Deviation',
    category: 'statistics',
    formula: '\\sigma = \\sqrt{\\frac{\\sum(x_i - \\mu)^2}{n}}',
    description: 'Measure of data spread around mean',
    variables: {
      'xᵢ': 'Individual values',
      'μ': 'Mean',
      'n': 'Number of values',
      'σ': 'Standard deviation'
    },
    derivation: 'Square root of variance',
    examples: [
      {
        problem: 'SD of [2, 4, 6, 8]',
        solution: 'Mean = 5, SD ≈ 2.236'
      }
    ],
    practicalUses: ['Data analysis', 'Risk quantification'],
    relatedFormulas: ['stat001']
  },

  // Physics
  {
    id: 'phys001',
    name: 'Kinetic Energy',
    category: 'physics',
    formula: 'KE = \\frac{1}{2}mv^2',
    description: 'Energy of motion',
    variables: {
      'm': 'Mass (kg)',
      'v': 'Velocity (m/s)',
      'KE': 'Kinetic Energy (Joules)'
    },
    derivation: 'Work-energy theorem integrated over distance',
    examples: [
      {
        problem: 'KE of 2 kg mass at 3 m/s',
        solution: 'KE = 0.5 × 2 × 9 = 9 Joules'
      }
    ],
    practicalUses: ['Vehicle safety', 'Collision analysis'],
    relatedFormulas: ['phys002']
  },
  {
    id: 'phys002',
    name: 'Ohm\'s Law',
    category: 'physics',
    formula: 'V = IR',
    description: 'Relationship between voltage, current, and resistance',
    variables: {
      'V': 'Voltage (volts)',
      'I': 'Current (amperes)',
      'R': 'Resistance (ohms)'
    },
    derivation: 'Empirical law from electrical experiments',
    examples: [
      {
        problem: 'Find V when I=2A, R=5Ω',
        solution: 'V = 2 × 5 = 10 volts'
      }
    ],
    practicalUses: ['Circuit design', 'Electrical engineering'],
    relatedFormulas: ['phys001']
  },

  // Finance
  {
    id: 'fin001',
    name: 'Compound Interest',
    category: 'finance',
    formula: 'A = P\\left(1 + \\frac{r}{n}\\right)^{nt}',
    description: 'Amount after compound interest',
    variables: {
      'A': 'Final amount',
      'P': 'Principal (initial amount)',
      'r': 'Annual interest rate (decimal)',
      'n': 'Compounding frequency per year',
      't': 'Time in years'
    },
    derivation: 'Iterative application of simple interest formula',
    examples: [
      {
        problem: 'Invest $1000 at 5% annual, compounded quarterly for 2 years',
        solution: 'A = 1000(1 + 0.05/4)^8 ≈ $1104.49'
      }
    ],
    practicalUses: ['Investment returns', 'Loan calculations', 'Savings planning'],
    relatedFormulas: ['fin002']
  },
  {
    id: 'fin002',
    name: 'Simple Interest',
    category: 'finance',
    formula: 'I = Prt',
    description: 'Interest calculated on principal only',
    variables: {
      'I': 'Interest earned',
      'P': 'Principal',
      'r': 'Annual interest rate (decimal)',
      't': 'Time in years'
    },
    derivation: 'Direct proportion: interest ∝ principal × rate × time',
    examples: [
      {
        problem: 'Interest on $500 at 3% for 2 years',
        solution: 'I = 500 × 0.03 × 2 = $30'
      }
    ],
    practicalUses: ['Short-term loans', 'Savings accounts'],
    relatedFormulas: ['fin001']
  },

  // Areas
  {
    id: 'area001',
    name: 'Triangle Area',
    category: 'areas',
    formula: 'A = \\frac{1}{2}bh',
    description: 'Area of a triangle',
    variables: {
      'b': 'Base',
      'h': 'Height',
      'A': 'Area'
    },
    examples: [
      { problem: 'Triangle with base 10 and height 5', solution: 'A = 0.5 × 10 × 5 = 25' }
    ],
    practicalUses: ['Land measurement', 'Construction'],
    relatedFormulas: ['area002']
  },
  {
    id: 'area002',
    name: 'Square and Rectangle Area',
    category: 'areas',
    formula: 'A = l \\times w',
    description: 'Area of rectangle (square when l=w)',
    variables: {
      'l': 'Length',
      'w': 'Width',
      'A': 'Area'
    },
    examples: [
      { problem: 'Rectangle 8×6', solution: 'A = 8 × 6 = 48' }
    ],
    practicalUses: ['Room sizing', 'Flooring calculations'],
    relatedFormulas: ['area001', 'area003']
  },
  {
    id: 'area003',
    name: 'Trapezoid Area',
    category: 'areas',
    formula: 'A = \\frac{1}{2}(b_1 + b_2)h',
    description: 'Area of trapezoid',
    variables: {
      'b₁': 'First base',
      'b₂': 'Second base',
      'h': 'Height',
      'A': 'Area'
    },
    examples: [
      { problem: 'Trapezoid with bases 5, 7 and height 4', solution: 'A = 0.5 × (5+7) × 4 = 24' }
    ],
    practicalUses: ['Land surveying', 'Engineering'],
    relatedFormulas: ['area001']
  },
  {
    id: 'area004',
    name: 'Ellipse Area',
    category: 'areas',
    formula: 'A = \\pi ab',
    description: 'Area of ellipse',
    variables: {
      'a': 'Semi-major axis',
      'b': 'Semi-minor axis',
      'π': 'Pi'
    },
    examples: [
      { problem: 'Ellipse with a=5, b=3', solution: 'A = π × 5 × 3 ≈ 47.12' }
    ],
    practicalUses: ['Orbital calculations', 'Engineering'],
    relatedFormulas: ['geo002']
  },
  {
    id: 'area005',
    name: 'Regular Polygon Area',
    category: 'areas',
    formula: 'A = \\frac{1}{2}ap',
    description: 'Area of regular polygon',
    variables: {
      'a': 'Apothem (distance from center to midpoint of side)',
      'p': 'Perimeter',
      'A': 'Area'
    },
    examples: [
      { problem: 'Regular hexagon with apothem 4 and perimeter 24', solution: 'A = 0.5 × 4 × 24 = 48' }
    ],
    practicalUses: ['Architecture', 'Design'],
    relatedFormulas: ['area001']
  },

  // Volumes
  {
    id: 'vol001',
    name: 'Cube and Rectangular Prism Volume',
    category: 'volumes',
    formula: 'V = l \\times w \\times h',
    description: 'Volume of rectangular solid',
    variables: {
      'l': 'Length',
      'w': 'Width',
      'h': 'Height',
      'V': 'Volume'
    },
    examples: [
      { problem: 'Box 5×4×3', solution: 'V = 5 × 4 × 3 = 60' }
    ],
    practicalUses: ['Storage calculation', 'Shipping volume'],
    relatedFormulas: ['vol002']
  },
  {
    id: 'vol002',
    name: 'Sphere Volume',
    category: 'volumes',
    formula: 'V = \\frac{4}{3}\\pi r^3',
    description: 'Volume of sphere',
    variables: {
      'r': 'Radius',
      'π': 'Pi',
      'V': 'Volume'
    },
    examples: [
      { problem: 'Sphere with radius 3', solution: 'V = (4/3)π × 27 ≈ 113.1' }
    ],
    practicalUses: ['Tank design', 'Astronomy'],
    relatedFormulas: ['vol001', 'vol003']
  },
  {
    id: 'vol003',
    name: 'Cylinder Volume',
    category: 'volumes',
    formula: 'V = \\pi r^2 h',
    description: 'Volume of cylinder',
    variables: {
      'r': 'Radius',
      'h': 'Height',
      'π': 'Pi',
      'V': 'Volume'
    },
    examples: [
      { problem: 'Cylinder with r=2, h=5', solution: 'V = π × 4 × 5 ≈ 62.83' }
    ],
    practicalUses: ['Pipe sizing', 'Tank volume'],
    relatedFormulas: ['vol002']
  },
  {
    id: 'vol004',
    name: 'Cone Volume',
    category: 'volumes',
    formula: 'V = \\frac{1}{3}\\pi r^2 h',
    description: 'Volume of cone',
    variables: {
      'r': 'Radius',
      'h': 'Height',
      'π': 'Pi',
      'V': 'Volume'
    },
    examples: [
      { problem: 'Cone with r=3, h=8', solution: 'V = (1/3)π × 9 × 8 ≈ 75.4' }
    ],
    practicalUses: ['Hopper design', 'Conical containers'],
    relatedFormulas: ['vol003']
  },
  {
    id: 'vol005',
    name: 'Pyramid Volume',
    category: 'volumes',
    formula: 'V = \\frac{1}{3}Bh',
    description: 'Volume of pyramid',
    variables: {
      'B': 'Base area',
      'h': 'Height',
      'V': 'Volume'
    },
    examples: [
      { problem: 'Pyramid with base area 16 and height 9', solution: 'V = (1/3) × 16 × 9 = 48' }
    ],
    practicalUses: ['Architecture', 'Archaeological calculations'],
    relatedFormulas: ['vol001']
  },

  // Exponents
  {
    id: 'exp001',
    name: 'Product of Powers',
    category: 'exponents',
    formula: 'a^m \\times a^n = a^{m+n}',
    description: 'Multiply powers with same base',
    variables: {
      'a': 'Base',
      'm': 'First exponent',
      'n': 'Second exponent'
    },
    examples: [
      { problem: 'Simplify 2³ × 2⁴', solution: '2³ × 2⁴ = 2⁷ = 128' }
    ],
    practicalUses: ['Algebra simplification'],
    relatedFormulas: ['exp002']
  },
  {
    id: 'exp002',
    name: 'Quotient of Powers',
    category: 'exponents',
    formula: '\\frac{a^m}{a^n} = a^{m-n}',
    description: 'Divide powers with same base',
    variables: {
      'a': 'Base',
      'm': 'Numerator exponent',
      'n': 'Denominator exponent'
    },
    examples: [
      { problem: 'Simplify 3⁵ ÷ 3²', solution: '3⁵ ÷ 3² = 3³ = 27' }
    ],
    practicalUses: ['Algebra simplification'],
    relatedFormulas: ['exp001']
  },
  {
    id: 'exp003',
    name: 'Power of a Power',
    category: 'exponents',
    formula: '(a^m)^n = a^{mn}',
    description: 'Raise a power to a power',
    variables: {
      'a': 'Base',
      'm': 'First exponent',
      'n': 'Second exponent'
    },
    examples: [
      { problem: 'Simplify (2³)²', solution: '(2³)² = 2⁶ = 64' }
    ],
    practicalUses: ['Algebra'],
    relatedFormulas: ['exp001']
  },

  // Radicals
  {
    id: 'rad001',
    name: 'Product of Radicals',
    category: 'radicals',
    formula: '\\sqrt[n]{a} \\times \\sqrt[n]{b} = \\sqrt[n]{ab}',
    description: 'Multiply radicals with same index',
    variables: {
      'a': 'First radicand',
      'b': 'Second radicand',
      'n': 'Index'
    },
    examples: [
      { problem: 'Simplify √2 × √8', solution: '√2 × √8 = √16 = 4' }
    ],
    practicalUses: ['Simplification'],
    relatedFormulas: ['rad002']
  },
  {
    id: 'rad002',
    name: 'Quotient of Radicals',
    category: 'radicals',
    formula: '\\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}} = \\sqrt[n]{\\frac{a}{b}}',
    description: 'Divide radicals with same index',
    variables: {
      'a': 'Numerator radicand',
      'b': 'Denominator radicand',
      'n': 'Index'
    },
    examples: [
      { problem: 'Simplify √12 / √3', solution: '√12 / √3 = √4 = 2' }
    ],
    practicalUses: ['Simplification'],
    relatedFormulas: ['rad001']
  },
  {
    id: 'rad003',
    name: 'Rationalization',
    category: 'radicals',
    formula: '\\frac{1}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a}',
    description: 'Remove radical from denominator',
    variables: {
      'a': 'Radicand',
      'Denominator': 'Rationalizing factor'
    },
    examples: [
      { problem: 'Rationalize 1/√2', solution: '1/√2 × √2/√2 = √2/2' }
    ],
    practicalUses: ['Simplification'],
    relatedFormulas: ['rad001']
  },

  // Additional Trigonometry
  {
    id: 'trig003',
    name: 'Pythagorean Identity',
    category: 'trigonometry',
    formula: '\\sin^2 \\theta + \\cos^2 \\theta = 1',
    description: 'Fundamental trigonometric identity',
    variables: {
      'θ': 'Angle',
      'sin': 'Sine function',
      'cos': 'Cosine function'
    },
    examples: [
      { problem: 'If sin(θ) = 0.6, find cos(θ)', solution: 'cos²(θ) = 1 - 0.36 = 0.64, cos(θ) = 0.8' }
    ],
    practicalUses: ['Trigonometry simplification'],
    relatedFormulas: ['trig001']
  },
  {
    id: 'trig004',
    name: 'Double Angle Formulas',
    category: 'trigonometry',
    formula: '\\sin 2\\theta = 2\\sin \\theta \\cos \\theta, \\quad \\cos 2\\theta = \\cos^2 \\theta - \\sin^2 \\theta',
    description: 'Trigonometric identities for double angles',
    variables: {
      'θ': 'Angle'
    },
    examples: [
      { problem: 'Find sin(60°) using sin(30°)', solution: 'sin(60°) = 2sin(30°)cos(30°) ≈ 0.866' }
    ],
    practicalUses: ['Wave analysis', 'Physics'],
    relatedFormulas: ['trig003']
  },
  {
    id: 'trig005',
    name: 'Addition Formulas',
    category: 'trigonometry',
    formula: '\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B',
    description: 'Sine of sum/difference of angles',
    variables: {
      'A': 'First angle',
      'B': 'Second angle'
    },
    examples: [
      { problem: 'Find sin(75°) = sin(45°+30°)', solution: 'sin(75°) ≈ 0.966' }
    ],
    practicalUses: ['Complex angle calculations'],
    relatedFormulas: ['trig003']
  },

  // Additional Geometry
  {
    id: 'geo003',
    name: 'Triangle Sum of Angles',
    category: 'geometry',
    formula: 'A + B + C = 180°',
    description: 'Sum of interior angles in any triangle',
    variables: {
      'A': 'First angle',
      'B': 'Second angle',
      'C': 'Third angle'
    },
    examples: [
      { problem: 'If A=45°, B=60°, find C', solution: 'C = 180° - 45° - 60° = 75°' }
    ],
    practicalUses: ['Triangle analysis', 'Architecture'],
    relatedFormulas: ['geo001']
  },
  {
    id: 'geo004',
    name: 'Distance Formula',
    category: 'geometry',
    formula: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}',
    description: 'Distance between two points',
    variables: {
      'x₁, y₁': 'First point',
      'x₂, y₂': 'Second point',
      'd': 'Distance'
    },
    examples: [
      { problem: 'Distance from (0,0) to (3,4)', solution: 'd = √(9+16) = √25 = 5' }
    ],
    practicalUses: ['Coordinates', 'Navigation'],
    relatedFormulas: ['geo001']
  },
  {
    id: 'geo005',
    name: 'Midpoint Formula',
    category: 'geometry',
    formula: 'M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)',
    description: 'Midpoint between two points',
    variables: {
      'x₁, y₁': 'First point',
      'x₂, y₂': 'Second point',
      'M': 'Midpoint'
    },
    examples: [
      { problem: 'Midpoint of (2,3) and (8,7)', solution: 'M = (5, 5)' }
    ],
    practicalUses: ['Coordinate geometry', 'Design'],
    relatedFormulas: ['geo004']
  },

  // Logarithms
  {
    id: 'log001',
    name: 'Logarithm Product Rule',
    category: 'logarithms',
    formula: '\\log_b(mn) = \\log_b m + \\log_b n',
    description: 'Log of product equals sum of logs',
    variables: {
      'b': 'Base',
      'm': 'First value',
      'n': 'Second value'
    },
    examples: [
      { problem: 'log₂(8 × 16)', solution: 'log₂(8) + log₂(16) = 3 + 4 = 7' }
    ],
    practicalUses: ['Exponential growth', 'Decibel calculations'],
    relatedFormulas: ['log002']
  },
  {
    id: 'log002',
    name: 'Logarithm Quotient Rule',
    category: 'logarithms',
    formula: '\\log_b\\left(\\frac{m}{n}\\right) = \\log_b m - \\log_b n',
    description: 'Log of quotient equals difference of logs',
    variables: {
      'b': 'Base',
      'm': 'Numerator',
      'n': 'Denominator'
    },
    examples: [
      { problem: 'log₂(16/2)', solution: 'log₂(16) - log₂(2) = 4 - 1 = 3' }
    ],
    practicalUses: ['Calculations', 'Simplification'],
    relatedFormulas: ['log001']
  },
  {
    id: 'log003',
    name: 'Logarithm Power Rule',
    category: 'logarithms',
    formula: '\\log_b(m^n) = n \\log_b m',
    description: 'Log of power equals exponent times log',
    variables: {
      'b': 'Base',
      'm': 'Base of power',
      'n': 'Exponent'
    },
    examples: [
      { problem: 'log₂(2⁵)', solution: '5 × log₂(2) = 5 × 1 = 5' }
    ],
    practicalUses: ['Exponentials', 'Earthquake magnitude'],
    relatedFormulas: ['log001']
  },
  {
    id: 'log004',
    name: 'Change of Base Formula',
    category: 'logarithms',
    formula: '\\log_b a = \\frac{\\log_c a}{\\log_c b}',
    description: 'Convert between logarithm bases',
    variables: {
      'a': 'Value',
      'b': 'Original base',
      'c': 'New base'
    },
    examples: [
      { problem: 'Convert log₂(8) to log base 10', solution: 'log₁₀(8)/log₁₀(2) ≈ 3' }
    ],
    practicalUses: ['Calculator conversions', 'Different base calculations'],
    relatedFormulas: ['log001']
  },

  // Sequences
  {
    id: 'seq001',
    name: 'Arithmetic Sequence',
    category: 'sequences',
    formula: 'a_n = a_1 + (n-1)d',
    description: 'General term of arithmetic sequence',
    variables: {
      'aₙ': 'nth term',
      'a₁': 'First term',
      'd': 'Common difference',
      'n': 'Term position'
    },
    examples: [
      { problem: 'Find 10th term of 2, 5, 8, ...', solution: 'a₁₀ = 2 + 9(3) = 29' }
    ],
    practicalUses: ['Pattern recognition', 'Finance'],
    relatedFormulas: ['alg002']
  },
  {
    id: 'seq002',
    name: 'Geometric Sequence',
    category: 'sequences',
    formula: 'a_n = a_1 \\times r^{n-1}',
    description: 'General term of geometric sequence',
    variables: {
      'aₙ': 'nth term',
      'a₁': 'First term',
      'r': 'Common ratio',
      'n': 'Term position'
    },
    examples: [
      { problem: 'Find 5th term of 2, 6, 18, ...', solution: 'a₅ = 2 × 3⁴ = 162' }
    ],
    practicalUses: ['Compound growth', 'Exponential modeling'],
    relatedFormulas: ['seq001']
  },
  {
    id: 'seq003',
    name: 'Geometric Series Sum',
    category: 'sequences',
    formula: 'S_n = a_1 \\times \\frac{1-r^n}{1-r}, \\quad r \\neq 1',
    description: 'Sum of geometric sequence',
    variables: {
      'Sₙ': 'Sum of first n terms',
      'a₁': 'First term',
      'r': 'Common ratio',
      'n': 'Number of terms'
    },
    examples: [
      { problem: 'Sum of 2 + 6 + 18 + 54 (4 terms)', solution: 'S₄ = 2(1-3⁴)/(1-3) = 80' }
    ],
    practicalUses: ['Present value calculations', 'Annuities'],
    relatedFormulas: ['seq002']
  },

  // Derivatives and Calculus
  {
    id: 'deriv001',
    name: 'Product Rule',
    category: 'derivatives',
    formula: '\\frac{d}{dx}[f(x)g(x)] = f\'(x)g(x) + f(x)g\'(x)',
    description: 'Derivative of product of functions',
    variables: {
      'f': 'First function',
      'g': 'Second function'
    },
    examples: [
      { problem: 'Derivative of x² × sin(x)', solution: '2x × sin(x) + x² × cos(x)' }
    ],
    practicalUses: ['Optimization', 'Rate of change'],
    relatedFormulas: ['deriv002']
  },
  {
    id: 'deriv002',
    name: 'Quotient Rule',
    category: 'derivatives',
    formula: '\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{f\'(x)g(x) - f(x)g\'(x)}{[g(x)]^2}',
    description: 'Derivative of quotient of functions',
    variables: {
      'f': 'Numerator function',
      'g': 'Denominator function'
    },
    examples: [
      { problem: 'Derivative of (x²+1)/(x-1)', solution: 'Using quotient rule' }
    ],
    practicalUses: ['Rational functions', 'Complex derivatives'],
    relatedFormulas: ['deriv001']
  },
  {
    id: 'deriv003',
    name: 'Chain Rule',
    category: 'derivatives',
    formula: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\times g\'(x)',
    description: 'Derivative of composite function',
    variables: {
      'f': 'Outer function',
      'g': 'Inner function'
    },
    examples: [
      { problem: 'Derivative of sin(x²)', solution: 'cos(x²) × 2x' }
    ],
    practicalUses: ['Composite functions', 'Complex derivatives'],
    relatedFormulas: ['deriv001']
  },

  // Probability
  {
    id: 'prob001',
    name: 'Probability Rule',
    category: 'probability',
    formula: 'P(A) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of outcomes}}',
    description: 'Basic probability calculation',
    variables: {
      'P(A)': 'Probability of event A',
      'Favorable': 'Outcomes satisfying condition',
      'Total': 'All possible outcomes'
    },
    examples: [
      { problem: 'Probability of rolling a 3 on a die', solution: 'P = 1/6 ≈ 0.167' }
    ],
    practicalUses: ['Risk assessment', 'Games', 'Statistics'],
    relatedFormulas: ['prob002']
  },
  {
    id: 'prob002',
    name: 'Addition Rule',
    category: 'probability',
    formula: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
    description: 'Probability of either event occurring',
    variables: {
      'P(A∪B)': 'Probability of A or B',
      'P(A)': 'Probability of A',
      'P(B)': 'Probability of B',
      'P(A∩B)': 'Probability of both'
    },
    examples: [
      { problem: 'Probability of rolling odd or prime', solution: 'P = P(odd) + P(prime) - P(odd and prime)' }
    ],
    practicalUses: ['Compound events', 'Decision making'],
    relatedFormulas: ['prob001']
  },
  {
    id: 'prob003',
    name: 'Multiplication Rule',
    category: 'probability',
    formula: 'P(A \\cap B) = P(A) \\times P(B|A)',
    description: 'Probability of both events occurring',
    variables: {
      'P(A∩B)': 'Probability of A and B',
      'P(A)': 'Probability of A',
      'P(B|A)': 'Probability of B given A'
    },
    examples: [
      { problem: 'Two cards drawn without replacement', solution: 'P = (52/52) × (51/51)' }
    ],
    practicalUses: ['Dependent events', 'Sequential probabilities'],
    relatedFormulas: ['prob001']
  },
  {
    id: 'prob004',
    name: 'Combinations',
    category: 'probability',
    formula: 'C(n,r) = \\frac{n!}{r!(n-r)!}',
    description: 'Number of ways to choose r items from n',
    variables: {
      'n': 'Total items',
      'r': 'Items to choose',
      'n!': 'Factorial'
    },
    examples: [
      { problem: 'Choose 3 from 5 items', solution: 'C(5,3) = 5!/(3!×2!) = 10' }
    ],
    practicalUses: ['Combinations', 'Lottery odds'],
    relatedFormulas: ['prob005']
  },
  {
    id: 'prob005',
    name: 'Permutations',
    category: 'probability',
    formula: 'P(n,r) = \\frac{n!}{(n-r)!}',
    description: 'Number of arrangements of r items from n',
    variables: {
      'n': 'Total items',
      'r': 'Items to arrange',
      'n!': 'Factorial'
    },
    examples: [
      { problem: 'Arrange 3 from 5 items', solution: 'P(5,3) = 5!/(5-3)! = 60' }
    ],
    practicalUses: ['Arrangements', 'Password possibilities'],
    relatedFormulas: ['prob004']
  },

  // Complex Numbers
  {
    id: 'complex001',
    name: 'Complex Number Magnitude',
    category: 'complex',
    formula: '|a+bi| = \\sqrt{a^2 + b^2}',
    description: 'Absolute value of complex number',
    variables: {
      'a': 'Real part',
      'b': 'Imaginary part',
      'i': 'Imaginary unit'
    },
    examples: [
      { problem: 'Magnitude of 3+4i', solution: '|3+4i| = √(9+16) = 5' }
    ],
    practicalUses: ['Complex analysis', 'Engineering'],
    relatedFormulas: ['complex002']
  },
  {
    id: 'complex002',
    name: 'Complex Number Multiplication',
    category: 'complex',
    formula: '(a+bi)(c+di) = (ac-bd) + (ad+bc)i',
    description: 'Product of two complex numbers',
    variables: {
      'a': 'First real part',
      'b': 'First imaginary part',
      'c': 'Second real part',
      'd': 'Second imaginary part'
    },
    examples: [
      { problem: '(2+3i)(1+2i)', solution: '(2-6) + (4+3)i = -4 + 7i' }
    ],
    practicalUses: ['Signal processing', 'AC circuit analysis'],
    relatedFormulas: ['complex001']
  },
  {
    id: 'complex003',
    name: 'De Moivre\'s Theorem',
    category: 'complex',
    formula: '[r(\\cos \\theta + i\\sin \\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)',
    description: 'Power of complex number in polar form',
    variables: {
      'r': 'Magnitude',
      'θ': 'Angle',
      'n': 'Power',
      'i': 'Imaginary unit'
    },
    examples: [
      { problem: '(1+i)² using De Moivre', solution: 'Result = 2i' }
    ],
    practicalUses: ['Complex powers', 'Roots of complex numbers'],
    relatedFormulas: ['complex001']
  },

  // Vectors
  {
    id: 'vec001',
    name: 'Vector Magnitude',
    category: 'vectors',
    formula: '|\\vec{v}| = \\sqrt{x^2 + y^2 + z^2}',
    description: 'Length of vector',
    variables: {
      'v': 'Vector',
      'x, y, z': 'Components'
    },
    examples: [
      { problem: 'Magnitude of (3,4)', solution: '|v| = √(9+16) = 5' }
    ],
    practicalUses: ['Physics', 'Navigation'],
    relatedFormulas: ['vec002']
  },
  {
    id: 'vec002',
    name: 'Dot Product',
    category: 'vectors',
    formula: '\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos \\theta',
    description: 'Scalar product of two vectors',
    variables: {
      'a': 'First vector',
      'b': 'Second vector',
      'θ': 'Angle between vectors'
    },
    examples: [
      { problem: 'Dot product of (2,3) and (4,1)', solution: '2×4 + 3×1 = 11' }
    ],
    practicalUses: ['Physics', 'Graphics', 'Projection'],
    relatedFormulas: ['vec001', 'vec003']
  },
  {
    id: 'vec003',
    name: 'Cross Product',
    category: 'vectors',
    formula: '\\vec{a} \\times \\vec{b} = |\\vec{a}||\\vec{b}|\\sin \\theta \\, \\hat{n}',
    description: 'Vector product of two 3D vectors',
    variables: {
      'a': 'First vector',
      'b': 'Second vector',
      'θ': 'Angle between vectors',
      'n': 'Unit normal vector'
    },
    examples: [
      { problem: 'Cross product in 3D', solution: 'Result is perpendicular vector' }
    ],
    practicalUses: ['3D graphics', 'Physics torque'],
    relatedFormulas: ['vec002']
  },

  // Additional Algebra
  {
    id: 'alg003',
    name: 'Geometric Sequence Sum',
    category: 'algebra',
    formula: 'S_n = \\frac{a(1-r^n)}{1-r}, \\quad r \\neq 1',
    description: 'Sum of geometric series',
    variables: {
      'a': 'First term',
      'r': 'Common ratio',
      'n': 'Number of terms'
    },
    examples: [
      { problem: 'Sum 1 + 2 + 4 + 8 (4 terms)', solution: 'S = 1(1-2⁴)/(1-2) = 15' }
    ],
    practicalUses: ['Finance', 'Computing'],
    relatedFormulas: ['alg002']
  },
  {
    id: 'alg004',
    name: 'Binomial Theorem',
    category: 'algebra',
    formula: '(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k}b^k',
    description: 'Expansion of (a+b) to power n',
    variables: {
      'a': 'First term',
      'b': 'Second term',
      'n': 'Power',
      'C(n,k)': 'Binomial coefficient'
    },
    examples: [
      { problem: 'Expand (x+2)³', solution: 'x³ + 6x² + 12x + 8' }
    ],
    practicalUses: ['Polynomial expansion', 'Probability'],
    relatedFormulas: ['alg001']
  }
];

module.exports = formulas;
