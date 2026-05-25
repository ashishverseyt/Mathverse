const math = require('mathjs');

/**
 * Statistics Calculator Module
 * Supports: mean, median, mode, standard deviation, variance, distributions, etc.
 */

class StatisticsCalculator {
  /**
   * Calculate mean (average)
   * @param {Array<number>} values - Array of numbers
   */
  static mean(values) {
    const result = math.mean(values);
    const steps = [
      'Mean (Average):',
      `Values: [${values.join(', ')}]`,
      `Mean = (${values.join(' + ')}) / ${values.length}`,
      `Mean = ${values.reduce((a, b) => a + b, 0)} / ${values.length} = ${result.toFixed(4)}`
    ];
    return { result, steps };
  }

  /**
   * Calculate median
   * @param {Array<number>} values - Array of numbers
   */
  static median(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const result = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const steps = [
      'Median:',
      `Values: [${values.join(', ')}]`,
      `Sorted: [${sorted.join(', ')}]`,
      `Median = ${result.toFixed(4)}`
    ];
    return { result, steps };
  }

  /**
   * Calculate mode
   * @param {Array<number>} values - Array of numbers
   */
  static mode(values) {
    const freq = {};
    values.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);
    const steps = [
      'Mode:',
      `Values: [${values.join(', ')}]`,
      `Frequency: ${JSON.stringify(freq)}`,
      `Mode(s): [${modes.join(', ')}] (frequency: ${maxFreq})`
    ];
    return { result: modes.length === 1 ? modes[0] : modes, steps };
  }

  /**
   * Calculate variance
   * @param {Array<number>} values - Array of numbers
   * @param {boolean} sample - If true, use sample variance (n-1); else population (n)
   */
  static variance(values, sample = true) {
    const mean = math.mean(values);
    const sqDiffs = values.map(v => Math.pow(v - mean, 2));
    const divisor = sample ? values.length - 1 : values.length;
    const result = sqDiffs.reduce((a, b) => a + b, 0) / divisor;
    const steps = [
      `Variance (${sample ? 'sample' : 'population'}):`,
      `Values: [${values.join(', ')}]`,
      `Mean: ${mean.toFixed(4)}`,
      `Sum of squared differences: ${sqDiffs.reduce((a, b) => a + b, 0).toFixed(4)}`,
      `Variance = ${sqDiffs.reduce((a, b) => a + b, 0).toFixed(4)} / ${divisor} = ${result.toFixed(4)}`
    ];
    return { result, steps };
  }

  /**
   * Calculate standard deviation
   * @param {Array<number>} values - Array of numbers
   * @param {boolean} sample - If true, use sample SD; else population
   */
  static standardDeviation(values, sample = true) {
    const variance = this.variance(values, sample).result;
    const result = Math.sqrt(variance);
    const steps = [
      `Standard Deviation (${sample ? 'sample' : 'population'}):`,
      `Values: [${values.join(', ')}]`,
      `Variance: ${variance.toFixed(4)}`,
      `SD = √${variance.toFixed(4)} = ${result.toFixed(4)}`
    ];
    return { result, steps };
  }

  /**
   * Calculate quartiles and IQR
   * @param {Array<number>} values - Array of numbers
   */
  static quartiles(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const n = sorted.length;
    const q1Idx = Math.floor(n / 4);
    const q2Idx = Math.floor(n / 2);
    const q3Idx = Math.floor(3 * n / 4);
    const q1 = sorted[q1Idx];
    const q2 = sorted[q2Idx];
    const q3 = sorted[q3Idx];
    const iqr = q3 - q1;
    const result = { q1, q2, q3, iqr };
    const steps = [
      'Quartiles (Q1, Q2, Q3) and IQR:',
      `Sorted values: [${sorted.join(', ')}]`,
      `Q1 (25th percentile): ${q1}`,
      `Q2 (50th percentile/median): ${q2}`,
      `Q3 (75th percentile): ${q3}`,
      `IQR (Interquartile Range): Q3 - Q1 = ${q3} - ${q1} = ${iqr}`
    ];
    return { result, steps };
  }

  /**
   * Calculate correlation coefficient (Pearson)
   * @param {Array<number>} x - X values
   * @param {Array<number>} y - Y values
   */
  static correlation(x, y) {
    if (x.length !== y.length) throw new Error('Arrays must have equal length');
    const meanX = math.mean(x);
    const meanY = math.mean(y);
    const numerator = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0);
    const denominator = Math.sqrt(
      x.reduce((sum, xi) => sum + Math.pow(xi - meanX, 2), 0) *
      y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0)
    );
    const result = denominator === 0 ? 0 : numerator / denominator;
    const steps = [
      'Pearson Correlation Coefficient:',
      `X: [${x.join(', ')}]`,
      `Y: [${y.join(', ')}]`,
      `Mean(X): ${meanX.toFixed(4)}, Mean(Y): ${meanY.toFixed(4)}`,
      `Correlation r = ${result.toFixed(4)}`
    ];
    return { result, steps };
  }

  /**
   * Calculate z-score
   * @param {number} value - Data point
   * @param {number} mean - Population/sample mean
   * @param {number} stdDev - Population/sample standard deviation
   */
  static zscore(value, mean, stdDev) {
    if (stdDev === 0) throw new Error('Standard deviation cannot be zero');
    const result = (value - mean) / stdDev;
    const steps = [
      'Z-Score:',
      `Value: ${value}`,
      `Mean: ${mean}`,
      `Standard Deviation: ${stdDev}`,
      `Z = (${value} - ${mean}) / ${stdDev} = ${result.toFixed(4)}`
    ];
    return { result, steps };
  }

  /**
   * Combination nCr
   * @param {number} n - Total items
   * @param {number} r - Items to choose
   */
  static combination(n, r) {
    if (r > n) throw new Error('r cannot be greater than n');
    const result = math.combinations(n, r);
    const steps = [
      'Combination (nCr):',
      `n = ${n}, r = ${r}`,
      `C(${n},${r}) = n! / (r! × (n-r)!) = ${result}`
    ];
    return { result, steps };
  }

  /**
   * Permutation nPr
   * @param {number} n - Total items
   * @param {number} r - Items to arrange
   */
  static permutation(n, r) {
    if (r > n) throw new Error('r cannot be greater than n');
    const result = math.factorial(n) / math.factorial(n - r);
    const steps = [
      'Permutation (nPr):',
      `n = ${n}, r = ${r}`,
      `P(${n},${r}) = n! / (n-r)! = ${result}`
    ];
    return { result, steps };
  }
}

module.exports = StatisticsCalculator;
