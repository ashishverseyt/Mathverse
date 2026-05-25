const express = require('express');
const router = express.Router();
const math = require('mathjs');
const ScientificCalculator = require('../calculators/scientific');
const MatrixCalculator = require('../calculators/matrix');
const GeometryCalculator = require('../calculators/geometry');
const StatisticsCalculator = require('../calculators/statistics');
const FinanceCalculator = require('../calculators/finance');

/**
 * POST /api/calc
 * Main calculation endpoint supporting multiple calculator types
 */
router.post('/', (req, res) => {
  const { type, operation, params, expression } = req.body || {};

  try {
    // Basic Calculator
    if (!type || type === 'basic') {
      if (!expression) return res.status(400).json({ ok: false, error: 'Missing expression' });
      const result = math.evaluate(expression);
      const steps = [
        `Expression: ${expression}`,
        `Result: ${result}`
      ];
      return res.json({ ok: true, result, steps });
    }

    // Scientific Calculator
    if (type === 'scientific') {
      if (!operation || !params) {
        return res.status(400).json({ ok: false, error: 'Missing operation or params' });
      }
      let calcResult;
      switch (operation) {
        case 'trigonometric':
          calcResult = ScientificCalculator.trigonometric(params.func, params.angle, params.unit);
          break;
        case 'logarithmic':
          calcResult = ScientificCalculator.logarithmic(params.func, params.value);
          break;
        case 'exponential':
          calcResult = ScientificCalculator.exponential(params.base, params.exponent);
          break;
        case 'root':
          calcResult = ScientificCalculator.root(params.value, params.root);
          break;
        case 'factorial':
          calcResult = ScientificCalculator.factorial(params.n);
          break;
        case 'percentage':
          calcResult = ScientificCalculator.percentage(params.type, params.a, params.b);
          break;
        default:
          return res.status(400).json({ ok: false, error: `Unknown operation: ${operation}` });
      }
      return res.json({ ok: true, ...calcResult });
    }

    // Matrix Calculator
    if (type === 'matrix') {
      if (!operation || !params) {
        return res.status(400).json({ ok: false, error: 'Missing operation or params' });
      }
      let calcResult;
      switch (operation) {
        case 'add':
          calcResult = MatrixCalculator.add(params.a, params.b);
          break;
        case 'multiply':
          calcResult = MatrixCalculator.multiply(params.a, params.b);
          break;
        case 'determinant':
          calcResult = MatrixCalculator.determinant(params.matrix);
          break;
        case 'inverse':
          calcResult = MatrixCalculator.inverse(params.matrix);
          break;
        case 'transpose':
          calcResult = MatrixCalculator.transpose(params.matrix);
          break;
        case 'solveLinearSystem':
          calcResult = MatrixCalculator.solveLinearSystem(params.a, params.b);
          break;
        default:
          return res.status(400).json({ ok: false, error: `Unknown operation: ${operation}` });
      }
      return res.json({ ok: true, ...calcResult });
    }

    // Geometry Calculator
    if (type === 'geometry') {
      if (!operation || !params) {
        return res.status(400).json({ ok: false, error: 'Missing operation or params' });
      }
      let calcResult;
      switch (operation) {
        case 'circle':
          calcResult = GeometryCalculator.circle(params.prop, params.value);
          break;
        case 'triangle':
          calcResult = GeometryCalculator.triangle(params.prop, ...params.values);
          break;
        case 'rectangle':
          calcResult = GeometryCalculator.rectangle(params.prop, params.length, params.width);
          break;
        case 'sphere':
          calcResult = GeometryCalculator.sphere(params.prop, params.radius);
          break;
        case 'cylinder':
          calcResult = GeometryCalculator.cylinder(params.prop, params.radius, params.height);
          break;
        default:
          return res.status(400).json({ ok: false, error: `Unknown operation: ${operation}` });
      }
      return res.json({ ok: true, ...calcResult });
    }

    // Statistics Calculator
    if (type === 'statistics') {
      if (!operation || !params) {
        return res.status(400).json({ ok: false, error: 'Missing operation or params' });
      }
      let calcResult;
      switch (operation) {
        case 'mean':
          calcResult = StatisticsCalculator.mean(params.values);
          break;
        case 'median':
          calcResult = StatisticsCalculator.median(params.values);
          break;
        case 'mode':
          calcResult = StatisticsCalculator.mode(params.values);
          break;
        case 'variance':
          calcResult = StatisticsCalculator.variance(params.values, params.sample);
          break;
        case 'standardDeviation':
          calcResult = StatisticsCalculator.standardDeviation(params.values, params.sample);
          break;
        case 'quartiles':
          calcResult = StatisticsCalculator.quartiles(params.values);
          break;
        case 'correlation':
          calcResult = StatisticsCalculator.correlation(params.x, params.y);
          break;
        case 'zscore':
          calcResult = StatisticsCalculator.zscore(params.value, params.mean, params.stdDev);
          break;
        case 'combination':
          calcResult = StatisticsCalculator.combination(params.n, params.r);
          break;
        case 'permutation':
          calcResult = StatisticsCalculator.permutation(params.n, params.r);
          break;
        default:
          return res.status(400).json({ ok: false, error: `Unknown operation: ${operation}` });
      }
      return res.json({ ok: true, ...calcResult });
    }

    // Finance Calculator
    if (type === 'finance') {
      if (!operation || !params) {
        return res.status(400).json({ ok: false, error: 'Missing operation or params' });
      }
      let calcResult;
      switch (operation) {
        case 'simpleInterest':
          calcResult = FinanceCalculator.simpleInterest(params.principal, params.rate, params.time);
          break;
        case 'compoundInterest':
          calcResult = FinanceCalculator.compoundInterest(params.principal, params.rate, params.time, params.compounds);
          break;
        case 'futureValueAnnuity':
          calcResult = FinanceCalculator.futureValueAnnuity(params.payment, params.rate, params.periods);
          break;
        case 'presentValueAnnuity':
          calcResult = FinanceCalculator.presentValueAnnuity(params.payment, params.rate, params.periods);
          break;
        case 'loanPayment':
          calcResult = FinanceCalculator.loanPayment(params.principal, params.monthlyRate, params.months);
          break;
        case 'roi':
          calcResult = FinanceCalculator.roi(params.initialInvestment, params.finalValue);
          break;
        case 'depreciation':
          calcResult = FinanceCalculator.depreciation(params.cost, params.salvageValue, params.life);
          break;
        case 'breakEvenPoint':
          calcResult = FinanceCalculator.breakEvenPoint(params.fixedCosts, params.variableCostPerUnit, params.pricePerUnit);
          break;
        default:
          return res.status(400).json({ ok: false, error: `Unknown operation: ${operation}` });
      }
      return res.json({ ok: true, ...calcResult });
    }

    return res.status(400).json({ ok: false, error: `Unsupported calculator type: ${type}` });
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message || err.toString() });
  }
});

module.exports = router;
