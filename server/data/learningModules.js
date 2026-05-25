/**
 * Learning Modules Database
 * Structured learning content for students at different levels
 */

const learningModules = [
  {
    id: 'mod001',
    title: 'Introduction to Algebra',
    description: 'Learn the basics of algebraic expressions, variables, and equations',
    category: 'algebra',
    level: 'beginner',
    duration: 45,
    content: {
      sections: [
        {
          id: 'sec001',
          title: 'What is Algebra?',
          content: `Algebra is the branch of mathematics that uses letters (called variables) to represent unknown numbers. 
Instead of saying "a number plus 5 equals 12", we write x + 5 = 12.

Key concepts:
- Variables: Letters that represent unknown values (x, y, a, b, etc.)
- Expressions: Combinations of numbers, variables, and operations (e.g., 2x + 3)
- Equations: Statements that two expressions are equal (e.g., 2x + 3 = 11)`,
          examples: ['2x + 5', '3a - 7', 'x² + 2x + 1']
        },
        {
          id: 'sec002',
          title: 'Solving Linear Equations',
          content: `A linear equation is an equation where the variable has a power of 1.

Steps to solve:
1. Write the equation
2. Move variable terms to one side, constants to the other
3. Combine like terms
4. Divide or multiply to isolate the variable
5. Check your solution

Example: Solve 2x + 5 = 13
- Subtract 5 from both sides: 2x = 8
- Divide both sides by 2: x = 4
- Check: 2(4) + 5 = 8 + 5 = 13 ✓`,
          examples: ['x + 3 = 7', '2x - 5 = 9', '3x + 2 = 14']
        }
      ]
    }
  },
  {
    id: 'mod002',
    title: 'Quadratic Equations & Graphs',
    description: 'Master quadratic functions and their graphical representations',
    category: 'algebra',
    level: 'intermediate',
    duration: 60,
    content: {
      sections: [
        {
          id: 'sec003',
          title: 'Quadratic Functions',
          content: `A quadratic equation has the form: ax² + bx + c = 0, where a ≠ 0.

The graph of a quadratic function is a parabola, which can open upward (if a > 0) or downward (if a < 0).

Methods to solve quadratic equations:
1. Factoring: Express as (x - r₁)(x - r₂) = 0
2. Completing the square: Rearrange to (x + p)² = q
3. Quadratic formula: x = [-b ± √(b² - 4ac)] / 2a

The discriminant Δ = b² - 4ac tells us about the roots:
- If Δ > 0: Two distinct real roots
- If Δ = 0: One repeated real root
- If Δ < 0: Two complex roots`,
          examples: ['x² + 5x + 6 = 0', 'x² - 4 = 0', 'x² + 2x + 1 = 0']
        }
      ]
    }
  },
  {
    id: 'mod003',
    title: 'Trigonometry Basics',
    description: 'Introduction to angles, triangles, and trigonometric functions',
    category: 'trigonometry',
    level: 'intermediate',
    duration: 75,
    content: {
      sections: [
        {
          id: 'sec004',
          title: 'Right Triangles & SOHCAHTOA',
          content: `In a right triangle, we define trigonometric ratios:

SOHCAHTOA:
- Sine (sin) = Opposite / Hypotenuse
- Cosine (cos) = Adjacent / Hypotenuse
- Tangent (tan) = Opposite / Adjacent

These ratios depend only on the angle, not the size of the triangle!

Special angles:
- sin(30°) = 1/2, cos(30°) = √3/2, tan(30°) = 1/√3
- sin(45°) = cos(45°) = √2/2, tan(45°) = 1
- sin(60°) = √3/2, cos(60°) = 1/2, tan(60°) = √3

Remember: Angles are measured from the horizontal, counterclockwise is positive.`,
          examples: ['Find sin(θ) in a right triangle with opposite=3, hypotenuse=5', 'Calculate cos(45°)']
        }
      ]
    }
  },
  {
    id: 'mod004',
    title: 'Calculus I: Limits & Continuity',
    description: 'Understand limits and continuity, foundation of calculus',
    category: 'calculus',
    level: 'advanced',
    duration: 90,
    content: {
      sections: [
        {
          id: 'sec005',
          title: 'Understanding Limits',
          content: `A limit describes the value that a function approaches as the input approaches some value.

Notation: lim(x→a) f(x) = L means "as x gets closer to a, f(x) gets closer to L"

Key properties:
- lim(x→a) [f(x) + g(x)] = lim(x→a) f(x) + lim(x→a) g(x)
- lim(x→a) [c·f(x)] = c · lim(x→a) f(x) (c is a constant)
- lim(x→a) [f(x)·g(x)] = lim(x→a) f(x) · lim(x→a) g(x)

One-sided limits:
- Left limit: lim(x→a⁻) f(x) (approaching from the left)
- Right limit: lim(x→a⁺) f(x) (approaching from the right)

A function is continuous at a point if the limit equals the function value.`,
          examples: ['lim(x→2) (x² + 1)', 'lim(x→1) (x - 1)/(x - 1)']
        }
      ]
    }
  },
  {
    id: 'mod005',
    title: 'Statistics & Probability',
    description: 'Learn data analysis, distributions, and probability',
    category: 'statistics',
    level: 'intermediate',
    duration: 60,
    content: {
      sections: [
        {
          id: 'sec006',
          title: 'Descriptive Statistics',
          content: `Descriptive statistics summarize and describe data.

Measures of central tendency:
- Mean (Average): Sum of all values / Number of values
- Median: Middle value when data is sorted
- Mode: Most frequently occurring value

Measures of spread:
- Range: Maximum - Minimum
- Variance: Average of squared deviations from mean
- Standard Deviation: √Variance (in same units as data)

The normal distribution (bell curve):
- About 68% of data falls within 1 standard deviation of the mean
- About 95% falls within 2 standard deviations
- About 99.7% falls within 3 standard deviations

Uses: Understanding datasets, comparing groups, identifying outliers.`,
          examples: ['Find mean, median, mode of [2, 3, 3, 5, 7]', 'Calculate standard deviation']
        }
      ]
    }
  },
  {
    id: 'mod006',
    title: 'Geometry: Shapes & Formulas',
    description: 'Comprehensive guide to geometric shapes and area/volume formulas',
    category: 'geometry',
    level: 'beginner',
    duration: 50,
    content: {
      sections: [
        {
          id: 'sec007',
          title: '2D Shapes',
          content: `Understanding 2-dimensional shapes and their properties.

Triangle:
- Area = (1/2) × base × height
- Perimeter = sum of all sides
- Types: Equilateral (all sides equal), Isosceles (two sides equal), Scalene (all different)

Rectangle:
- Area = length × width
- Perimeter = 2(length + width)

Circle:
- Area = πr² (r is radius)
- Circumference = 2πr
- Diameter = 2r

Square:
- Area = side²
- Perimeter = 4 × side`,
          examples: ['Find area of triangle with base 10 and height 6', 'Calculate circumference of circle with radius 5']
        }
      ]
    }
  }
];

module.exports = learningModules;
