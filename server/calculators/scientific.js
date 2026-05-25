const math = require('mathjs');

/**
 * Scientific Calculator Module
 * Supports: trigonometric, logarithmic, exponential, advanced functions
 */

class ScientificCalculator {
  /**
   * Calculate trigonometric functions
   * @param {string} func - Function name (sin, cos, tan, asin, acos, atan)
   * @param {number} angle - Angle in degrees or radians
   * @param {string} unit - Unit: 'deg' or 'rad' (default: 'deg')
   */
  static trigonometric(func, angle, unit = 'deg') {
    const angleRad = unit === 'deg' ? math.unit(angle, 'deg').toNumber('rad') : angle;
    const result = math[func](angleRad);
    const steps = [
      `Function: ${func}`,
      `Input: ${angle}° = ${angleRad.toFixed(4)} radians`,
      `${func}(${angleRad.toFixed(4)}) = ${result.toFixed(6)}`
    ];
    return { result, steps };
  }

  /**
   * Calculate logarithmic functions
   * @param {string} func - Function name (log, log10, log2, ln)
   * @param {number} value - Input value
   */
  static logarithmic(func, value) {
    const result = math[func](value);
    const steps = [
      `Function: ${func}`,
      `Input: ${value}`,
      `${func}(${value}) = ${result.toFixed(6)}`
    ];
    return { result, steps };
  }

  /**
   * Calculate exponential and power functions
   * @param {number} base - Base
   * @param {number} exponent - Exponent
   */
  static exponential(base, exponent) {
    const result = math.pow(base, exponent);
    const steps = [
      `Base: ${base}`,
      `Exponent: ${exponent}`,
      `${base}^${exponent} = ${result.toFixed(6)}`
    ];
    return { result, steps };
  }

  /**
   * Calculate square root and nth root
   * @param {number} value - Value
   * @param {number} root - Root (default: 2)
   */
  static root(value, root = 2) {
    const result = math.nthRoot(value, root);
    const steps = [
      `Value: ${value}`,
      `Root: ${root}`,
      `${root === 2 ? '√' : `${root}√`}${value} = ${result.toFixed(6)}`
    ];
    return { result, steps };
  }

  /**
   * Calculate factorial
   * @param {number} n - Non-negative integer
   */
  static factorial(n) {
    if (!Number.isInteger(n) || n < 0) {
      throw new Error('Factorial requires a non-negative integer');
    }
    const result = math.factorial(n);
    const steps = [
      `Input: ${n}`,
      `${n}! = ${n === 0 ? '1' : Array.from({length: n}, (_, i) => i + 1).join(' × ')} = ${result}`
    ];
    return { result, steps };
  }

  /**
   * Percentage calculations
   * @param {string} type - 'of', 'change', 'difference'
   * @param {number} a - First value
   * @param {number} b - Second value
   */
  static percentage(type, a, b) {
    let result, steps;
    if (type === 'of') {
      result = (a / 100) * b;
      steps = [`${a}% of ${b}`, `= (${a}/100) × ${b}`, `= ${result}`];
    } else if (type === 'change') {
      result = ((b - a) / a) * 100;
      steps = [
        `Percentage change from ${a} to ${b}`,
        `= ((${b} - ${a}) / ${a}) × 100`,
        `= ${result.toFixed(2)}%`
      ];
    } else if (type === 'difference') {
      result = Math.abs((a - b) / ((a + b) / 2)) * 100;
      steps = [
        `Percentage difference between ${a} and ${b}`,
        `= |${a} - ${b}| / ((${a} + ${b}) / 2) × 100`,
        `= ${result.toFixed(2)}%`
      ];
    }
    return { result, steps };
  }
}

module.exports = ScientificCalculator;
