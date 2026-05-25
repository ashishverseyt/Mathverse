const math = require('mathjs');

/**
 * Geometry Calculator Module
 * Supports: area, perimeter, volume, surface area for various shapes
 */

class GeometryCalculator {
  /**
   * Calculate circle properties
   * @param {string} prop - Property: 'area', 'circumference', 'radius_from_area'
   * @param {number} value - Input value (radius or area)
   */
  static circle(prop, value) {
    let result, steps;
    if (prop === 'area') {
      result = Math.PI * value * value;
      steps = [
        'Circle Area:',
        `Radius: ${value}`,
        `Area = π × r² = π × ${value}² = ${result.toFixed(4)}`
      ];
    } else if (prop === 'circumference') {
      result = 2 * Math.PI * value;
      steps = [
        'Circle Circumference:',
        `Radius: ${value}`,
        `Circumference = 2πr = 2π × ${value} = ${result.toFixed(4)}`
      ];
    } else if (prop === 'radius_from_area') {
      result = Math.sqrt(value / Math.PI);
      steps = [
        'Circle Radius from Area:',
        `Area: ${value}`,
        `r = √(A/π) = √(${value}/π) = ${result.toFixed(4)}`
      ];
    }
    return { result, steps };
  }

  /**
   * Calculate triangle properties
   * @param {string} prop - Property: 'area', 'perimeter', 'hypotenuse'
   * @param {...number} values - Side lengths
   */
  static triangle(prop, ...values) {
    let result, steps;
    if (prop === 'area') {
      const [base, height] = values;
      result = (base * height) / 2;
      steps = [
        'Triangle Area:',
        `Base: ${base}, Height: ${height}`,
        `Area = (base × height) / 2 = (${base} × ${height}) / 2 = ${result.toFixed(4)}`
      ];
    } else if (prop === 'perimeter') {
      result = values.reduce((a, b) => a + b, 0);
      steps = [
        'Triangle Perimeter:',
        `Sides: ${values.join(', ')}`,
        `Perimeter = ${values.join(' + ')} = ${result.toFixed(4)}`
      ];
    } else if (prop === 'hypotenuse') {
      const [a, b] = values;
      result = Math.sqrt(a * a + b * b);
      steps = [
        'Right Triangle Hypotenuse (Pythagorean Theorem):',
        `a = ${a}, b = ${b}`,
        `c = √(a² + b²) = √(${a}² + ${b}²) = √${a * a + b * b} = ${result.toFixed(4)}`
      ];
    }
    return { result, steps };
  }

  /**
   * Calculate rectangle/square properties
   * @param {string} prop - Property: 'area', 'perimeter', 'diagonal'
   * @param {number} length - Length
   * @param {number} width - Width
   */
  static rectangle(prop, length, width) {
    let result, steps;
    if (prop === 'area') {
      result = length * width;
      steps = [
        'Rectangle Area:',
        `Length: ${length}, Width: ${width}`,
        `Area = length × width = ${length} × ${width} = ${result}`
      ];
    } else if (prop === 'perimeter') {
      result = 2 * (length + width);
      steps = [
        'Rectangle Perimeter:',
        `Length: ${length}, Width: ${width}`,
        `Perimeter = 2(length + width) = 2(${length} + ${width}) = ${result}`
      ];
    } else if (prop === 'diagonal') {
      result = Math.sqrt(length * length + width * width);
      steps = [
        'Rectangle Diagonal:',
        `Length: ${length}, Width: ${width}`,
        `Diagonal = √(length² + width²) = √(${length}² + ${width}²) = ${result.toFixed(4)}`
      ];
    }
    return { result, steps };
  }

  /**
   * Calculate sphere properties
   * @param {string} prop - Property: 'volume', 'surface_area'
   * @param {number} radius - Radius
   */
  static sphere(prop, radius) {
    let result, steps;
    if (prop === 'volume') {
      result = (4 / 3) * Math.PI * Math.pow(radius, 3);
      steps = [
        'Sphere Volume:',
        `Radius: ${radius}`,
        `Volume = (4/3)πr³ = (4/3)π × ${radius}³ = ${result.toFixed(4)}`
      ];
    } else if (prop === 'surface_area') {
      result = 4 * Math.PI * Math.pow(radius, 2);
      steps = [
        'Sphere Surface Area:',
        `Radius: ${radius}`,
        `Surface Area = 4πr² = 4π × ${radius}² = ${result.toFixed(4)}`
      ];
    }
    return { result, steps };
  }

  /**
   * Calculate cylinder properties
   * @param {string} prop - Property: 'volume', 'lateral_area', 'total_surface_area'
   * @param {number} radius - Radius
   * @param {number} height - Height
   */
  static cylinder(prop, radius, height) {
    let result, steps;
    if (prop === 'volume') {
      result = Math.PI * Math.pow(radius, 2) * height;
      steps = [
        'Cylinder Volume:',
        `Radius: ${radius}, Height: ${height}`,
        `Volume = πr²h = π × ${radius}² × ${height} = ${result.toFixed(4)}`
      ];
    } else if (prop === 'lateral_area') {
      result = 2 * Math.PI * radius * height;
      steps = [
        'Cylinder Lateral Area:',
        `Radius: ${radius}, Height: ${height}`,
        `Lateral Area = 2πrh = 2π × ${radius} × ${height} = ${result.toFixed(4)}`
      ];
    } else if (prop === 'total_surface_area') {
      result = 2 * Math.PI * radius * (radius + height);
      steps = [
        'Cylinder Total Surface Area:',
        `Radius: ${radius}, Height: ${height}`,
        `Surface Area = 2πr(r + h) = 2π × ${radius}(${radius} + ${height}) = ${result.toFixed(4)}`
      ];
    }
    return { result, steps };
  }
}

module.exports = GeometryCalculator;
