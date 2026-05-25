const math = require('mathjs');

/**
 * Matrix Calculator Module
 * Supports: matrix operations, determinants, inverses, eigenvalues, etc.
 */

class MatrixCalculator {
  /**
   * Add two matrices
   * @param {Array<Array<number>>} a - Matrix A
   * @param {Array<Array<number>>} b - Matrix B
   */
  static add(a, b) {
    try {
      const result = math.add(a, b);
      const steps = [
        'Matrix Addition:',
        `A = [${a.map(r => r.join(', ')).join('] [')}]`,
        `B = [${b.map(r => r.join(', ')).join('] [')}]`,
        `Result = [${result.map(r => r.join(', ')).join('] [')}]`
      ];
      return { result, steps };
    } catch (err) {
      throw new Error('Matrix addition failed: ' + err.message);
    }
  }

  /**
   * Multiply two matrices
   * @param {Array<Array<number>>} a - Matrix A
   * @param {Array<Array<number>>} b - Matrix B
   */
  static multiply(a, b) {
    try {
      const result = math.multiply(a, b);
      const steps = [
        'Matrix Multiplication:',
        `A (${a.length}×${a[0].length}) × B (${b.length}×${b[0].length})`,
        `Result (${result.length}×${result[0].length}) = [${result.map(r => r.join(', ')).join('] [')}]`
      ];
      return { result, steps };
    } catch (err) {
      throw new Error('Matrix multiplication failed: ' + err.message);
    }
  }

  /**
   * Calculate determinant
   * @param {Array<Array<number>>} matrix - Square matrix
   */
  static determinant(matrix) {
    try {
      const result = math.det(matrix);
      const steps = [
        'Determinant Calculation:',
        `Matrix: [${matrix.map(r => r.join(', ')).join('] [')}]`,
        `Determinant = ${result.toFixed(6)}`
      ];
      return { result, steps };
    } catch (err) {
      throw new Error('Determinant calculation failed: ' + err.message);
    }
  }

  /**
   * Calculate inverse matrix
   * @param {Array<Array<number>>} matrix - Square matrix
   */
  static inverse(matrix) {
    try {
      const det = math.det(matrix);
      if (det === 0) {
        throw new Error('Matrix is singular (determinant = 0), inverse does not exist');
      }
      const result = math.inv(matrix);
      const steps = [
        'Matrix Inverse:',
        `Matrix: [${matrix.map(r => r.join(', ')).join('] [')}]`,
        `Determinant: ${det.toFixed(6)}`,
        `Inverse: [${result.map(r => r.map(v => v.toFixed(4)).join(', ')).join('] [')}]`
      ];
      return { result, steps };
    } catch (err) {
      throw new Error('Matrix inverse failed: ' + err.message);
    }
  }

  /**
   * Calculate transpose
   * @param {Array<Array<number>>} matrix - Matrix
   */
  static transpose(matrix) {
    try {
      const result = math.transpose(matrix);
      const steps = [
        'Matrix Transpose:',
        `Original (${matrix.length}×${matrix[0].length}): [${matrix.map(r => r.join(', ')).join('] [')}]`,
        `Transposed (${result.length}×${result[0].length}): [${result.map(r => r.join(', ')).join('] [')}]`
      ];
      return { result, steps };
    } catch (err) {
      throw new Error('Matrix transpose failed: ' + err.message);
    }
  }

  /**
   * Solve system of linear equations (Ax = b)
   * @param {Array<Array<number>>} a - Coefficient matrix
   * @param {Array<number>} b - Result vector
   */
  static solveLinearSystem(a, b) {
    try {
      const result = math.lusolve(a, b);
      const steps = [
        'Linear System Solver (Ax = b):',
        `A: [${a.map(r => r.join(', ')).join('] [')}]`,
        `b: [${b.join(', ')}]`,
        `Solution x: [${result.map(v => v[0].toFixed(4)).join(', ')}]`
      ];
      return { result: result.map(v => v[0]), steps };
    } catch (err) {
      throw new Error('Linear system solve failed: ' + err.message);
    }
  }
}

module.exports = MatrixCalculator;
