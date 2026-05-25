// Script to add simpleFormula to all formulas
const fs = require('fs');
const path = require('path');

const formulasPath = path.join(__dirname, 'server/data/formulas.js');
let content = fs.readFileSync(formulasPath, 'utf8');

// Map of simple formula translations
const simpleFormulas = {
  'area001': 'Area = (1/2) × Base × Height',
  'area002': 'Area = Length × Width',
  'area003': 'Area = (1/2) × (Base 1 + Base 2) × Height',
  'area004': 'Area = π × Semi-Major Axis × Semi-Minor Axis',
  'area005': 'Area = (1/2) × Apothem × Perimeter',
  'vol001': 'Volume = Length × Width × Height',
  'vol002': 'Volume = (4/3) × π × Radius × Radius × Radius',
  'vol003': 'Volume = π × Radius × Radius × Height',
  'vol004': 'Volume = (1/3) × π × Radius × Radius × Height',
  'vol005': 'Volume = (1/3) × Base Area × Height',
  'geo001': 'a² + b² = c² (For right triangles)',
  'geo002': 'Area = π × r × r, Circumference = 2 × π × r',
  'geo003': 'Angle 1 + Angle 2 + Angle 3 = 180 degrees',
  'geo004': 'Distance = Square root of ((x₂ - x₁)² + (y₂ - y₁)²)',
  'geo005': 'Midpoint = ((x₁ + x₂)/2 , (y₁ + y₂)/2)',
  'trig001': 'a/sin(A) = b/sin(B) = c/sin(C)',
  'trig002': 'c² = a² + b² - 2 × a × b × cos(C)',
  'trig003': 'sin² + cos² = 1',
  'trig004': 'sin(2θ) = 2 × sin(θ) × cos(θ), cos(2θ) = cos²(θ) - sin²(θ)',
  'trig005': 'sin(A ± B) = sin(A)×cos(B) ± cos(A)×sin(B)',
  'calc001': 'Derivative of x^n = n × x^(n-1)',
  'calc002': 'Integral of x^n = x^(n+1) / (n+1) + C',
  'deriv001': 'Derivative of f×g = f\'×g + f×g\'',
  'deriv002': 'Derivative of f/g = (f\'×g - f×g\') / g²',
  'deriv003': 'Derivative of f(g(x)) = f\'(g(x)) × g\'(x)',
  'seq001': 'nth term = First term + (n-1) × Common difference',
  'seq002': 'nth term = First term × Ratio^(n-1)',
  'seq003': 'Sum = First term × (1 - Ratio^n) / (1 - Ratio)',
  'stat001': 'Normal Distribution Bell Curve',
  'stat002': 'Standard Deviation = Square root of (Sum of (each value - average)²  / count)',
  'phys001': 'Kinetic Energy = (1/2) × Mass × Velocity²',
  'phys002': 'Voltage = Current × Resistance',
  'fin001': 'Amount = Principal × (1 + Rate/Periods)^(Periods × Time)',
  'fin002': 'Interest = Principal × Rate × Time',
  'prob001': 'Probability = Favorable outcomes / Total outcomes',
  'prob002': 'P(A or B) = P(A) + P(B) - P(A and B)',
  'prob003': 'P(A and B) = P(A) × P(B given A)',
  'prob004': 'Combinations = n! / (r! × (n-r)!)',
  'prob005': 'Permutations = n! / (n-r)!',
  'exp001': 'a^m × a^n = a^(m+n)',
  'exp002': 'a^m ÷ a^n = a^(m-n)',
  'exp003': '(a^m)^n = a^(m×n)',
  'rad001': 'Square root of a × Square root of b = Square root of (a×b)',
  'rad002': 'Square root of a ÷ Square root of b = Square root of (a÷b)',
  'rad003': '1/Square root of a = Square root of a / a',
  'log001': 'log(m×n) = log(m) + log(n)',
  'log002': 'log(m÷n) = log(m) - log(n)',
  'log003': 'log(m^n) = n × log(m)',
  'log004': 'log base b of a = log base c of a / log base c of b',
  'alg003': 'Sum = First term × (1 - Ratio^n) / (1 - Ratio)',
  'alg004': '(a + b)^n expands using binomial coefficients',
  'complex001': '|a + bi| = Square root of (a² + b²)',
  'complex002': '(a + bi) × (c + di) = (ac - bd) + (ad + bc)i',
  'complex003': '[r(cos θ + i sin θ)]^n = r^n(cos(nθ) + i sin(nθ))',
  'vec001': '|v| = Square root of (x² + y² + z²)',
  'vec002': 'a · b = |a| × |b| × cos(θ)',
  'vec003': 'a × b = |a| × |b| × sin(θ) × n',
};

// Add simpleDescription maps
const simpleDescriptions = {
  'area001': 'Easy way to find the size of a triangle',
  'area002': 'Easy way to find the size of a square or rectangle',
  'vol001': 'Easy way to find how much space a box takes',
  'vol002': 'Easy way to find how much space a ball takes',
  'geo001': 'Special rule for triangles with right angles',
  'geo002': 'Easy way to find the size and around-ness of a circle',
  'trig001': 'A way to find sides of any triangle',
  'stat002': 'How much numbers spread out from the average',
  'phys001': 'Energy something has because it is moving',
  'phys002': 'How voltage, current, and resistance relate',
  'fin001': 'How much money grows when left in the bank',
  'fin002': 'Extra money you earn from savings',
};

// Read the current file
let fileContent = fs.readFileSync(formulasPath, 'utf8');

// Replace each formula entry to add simpleFormula
for (const [id, simple] of Object.entries(simpleFormulas)) {
  // Look for pattern: id: 'xxx' to insert after it
  const pattern = `id: '${id}',`;
  if (fileContent.includes(pattern)) {
    const nextLinePattern = `id: '${id}',\n    name:`;
    const replacement = `id: '${id}',\n    simpleFormula: '${simple}',\n    name:`;
    fileContent = fileContent.replace(nextLinePattern, replacement);
  }
}

// Also update simpleDescription where applicable
for (const [id, desc] of Object.entries(simpleDescriptions)) {
  const pattern = `id: '${id}',`;
  if (fileContent.includes(pattern)) {
    const hasSimpleDesc = fileContent.includes(`id: '${id}',\n    simpleDescription:`);
    if (!hasSimpleDesc) {
      // Find the description line and add simpleDescription after it
      const descPattern = `id: '${id}',`;
      const searchPattern = new RegExp(`(id: '${id}',\\s+simpleFormula: '[^']+',\\s+name: '[^']+',\\s+category: '[^']+',\\s+formula: '[^']+',\\s+description: ')([^']+)(',)`, 'g');
      fileContent = fileContent.replace(searchPattern, `$1$2',\n    simpleDescription: '${desc}$3`);
    }
  }
}

// Write back the file
fs.writeFileSync(formulasPath, fileContent, 'utf8');
console.log('✅ Added simpleFormula fields to all formulas!');
