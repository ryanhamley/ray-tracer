import Point from '../../../src/tuples/point';
import Vector from '../../../src/tuples/vector';

describe('Tuples', () => {
  test('A tuple with w=1.0 is a point', () => {
    const point = new Point(4.3, -4.2, 3.1);
    expect(point.x).toBe(4.3)
    expect(point.y).toBe(-4.2);
    expect(point.z).toBe(3.1);
    expect(point.w).toBe(1.0);
    expect(point).toBeInstanceOf(Point);
  });

  test('A tuple with w=0.0 is a vector', () => {
    const vector = new Vector(4.3, -4.2, 3.1);
    expect(vector.x).toBe(4.3)
    expect(vector.y).toBe(-4.2);
    expect(vector.z).toBe(3.1);
    expect(vector.w).toBe(0.0);
    expect(vector).toBeInstanceOf(Vector);
  });

  describe('Tuple equality', () => {
    test('Points with the same dimensions should be equal', () => {
      const point1 = new Point(4.3, -4.2, 3.1);
      const point2 = new Point(4.3, -4.2, 3.1);
      expect(point1.equals(point2)).toBeTruthy;
    });

    test('Vectors with the same dimensions should be equal', () => {
      const vector1 = new Vector(4.3, -4.2, 3.1);
      const vector2 = new Vector(4.3, -4.2, 3.1);
      expect(vector1.equals(vector2)).toBeTruthy;
    });
  });

  describe('Adding tuples', () => {
    test('Adding a vector and a point should return a new point', () => {
      const point = new Point(4.3, -4.2, 3.1);
      const vector = new Vector(-3, 2, 4);
      const result = point.add(vector);
      expect(result.x).toBe(point.x + vector.x);
      expect(result.y).toBe(point.y + vector.y);
      expect(result.z).toBe(point.z + vector.z);
      expect(result).toBeInstanceOf(Point);
    });

    test('Adding a vector and a vector should return a new vector', () => {
      const vector1 = new Vector(4.3, -4.2, 3.1);
      const vector2 = new Vector(-3, 2, 4);
      const result = vector1.add(vector2);
      expect(result.x).toBe(vector1.x + vector2.x);
      expect(result.y).toBe(vector1.y + vector2.y);
      expect(result.z).toBe(vector1.z + vector2.z);
      expect(result).toBeInstanceOf(Vector);
    });

    test('Adding a point and a point should throw an error', () => {
      const point1 = new Point(4.3, -4.2, 3.1);
      const point2 = new Point(-3, 2, 4);
      expect(() => point1.add(point2)).toThrow('Cannot add points');
    });
  });

  describe('Subtracting tuples', () => {
    test('Subtracting a point from a point should return a vector', () => {
      const point1 = new Point(4.3, -4.2, 3.1);
      const point2 = new Point(-3, 2, 4);
      const result = point1.subtract(point2);
      expect(result.x).toBe(point1.x - point2.x);
      expect(result.y).toBe(point1.y - point2.y);
      expect(result.z).toBe(point1.z - point2.z);
      expect(result).toBeInstanceOf(Vector);
    });

    test('Subtracting a vector from a vector should return a new vector', () => {
      const vector1 = new Vector(4.3, -4.2, 3.1);
      const vector2 = new Vector(-3, 2, 4);
      const result = vector1.subtract(vector2);
      expect(result.x).toBe(vector1.x - vector2.x);
      expect(result.y).toBe(vector1.y - vector2.y);
      expect(result.z).toBe(vector1.z - vector2.z);
      expect(result).toBeInstanceOf(Vector);
    });

    test('Subtracting a vector from a point should return a new point', () => {
      const point = new Point(4.3, -4.2, 3.1);
      const vector = new Vector(-3, 2, 4);
      const result = point.subtract(vector);
      expect(result.x).toBe(point.x - vector.x);
      expect(result.y).toBe(point.y - vector.y);
      expect(result.z).toBe(point.z - vector.z);
      expect(result).toBeInstanceOf(Point);
    });

    test('Subtracting a point from a vector should throw an error', () => {
      const vector = new Vector(4.3, -4.2, 3.1);
      const point = new Point(-3, 2, 4);
      expect(() => vector.subtract(point)).toThrow('Cannot subtract a point from a vector');
    });
  });

  describe('Vector operations', () => {
    test('Negation', () => {
      const vector = new Vector(1, -2, 3, -4);
      const negated = vector.negate();
      expect(negated.x).toBe(-1);
      expect(negated.y).toBe(2);
      expect(negated.z).toBe(-3);
      expect(negated.w).toBe(4);
      expect(negated).toBeInstanceOf(Vector);
    });

    test('Scalar multiplication', () => {
      const vector = new Vector(1, -2, 3, -4);
      const scaled = vector.multiply(3.5);
      expect(scaled.x).toBe(3.5);
      expect(scaled.y).toBe(-7);
      expect(scaled.z).toBe(10.5);
      expect(scaled.w).toBe(-14);
      expect(scaled).toBeInstanceOf(Vector);

      const divided = vector.multiply(0.5);
      expect(divided.x).toBe(0.5);
      expect(divided.y).toBe(-1);
      expect(divided.z).toBe(1.5);
      expect(divided.w).toBe(-2);
    });

    test('Scalar division', () => {
      const vector = new Vector(1, -2, 3, -4);
      const scaled = vector.divide(2);
      expect(scaled.x).toBe(0.5);
      expect(scaled.y).toBe(-1);
      expect(scaled.z).toBe(1.5);
      expect(scaled.w).toBe(-2);
      expect(scaled).toBeInstanceOf(Vector);
    });

    test('Magnitude', () => {
      const vector1 = new Vector(1, 0, 0);
      expect(vector1.magnitude).toBe(1);

      const vector2 = new Vector(0, 1, 0);
      expect(vector2.magnitude).toBe(1);

      const vector3 = new Vector(0, 0, 1);
      expect(vector3.magnitude).toBe(1);

      const vector4 = new Vector(1, 2, 3);
      expect(vector4.magnitude).toBe(Math.sqrt(14));

      const vector5 = new Vector(-1, -2, -3);
      expect(vector5.magnitude).toBe(Math.sqrt(14));
    });

    test('Normalization', () => {
      const vector1 = new Vector(4, 0, 0);
      const normalizedV1 = vector1.normalize();
      expect(normalizedV1.x).toBe(1);
      expect(normalizedV1.y).toBe(0);
      expect(normalizedV1.z).toBe(0);

      const vector2 = new Vector(1, 2, 3);
      const normalizedV2 = vector2.normalize();
      expect(normalizedV2.x).toBeCloseTo(0.26726);
      expect(normalizedV2.y).toBeCloseTo(0.53452);
      expect(normalizedV2.z).toBeCloseTo(0.80178);
      expect(normalizedV2.magnitude).toBe(1);
    });

    test('Dot product', () => {
      const vector1 = new Vector(1, 2, 3);
      const vector2 = new Vector(2, 3, 4);
      expect(vector1.dot(vector2)).toBe(20);
      expect(vector2.dot(vector1)).toBe(20);
    });

    test('Cross product', () => {
      const vector1 = new Vector(1, 2, 3);
      const vector2 = new Vector(2, 3, 4);
      const crossV1 = vector1.cross(vector2);
      expect(crossV1.x).toBe(-1);
      expect(crossV1.y).toBe(2);
      expect(crossV1.z).toBe(-1);
      const crossV2 = vector2.cross(vector1);
      expect(crossV2.x).toBe(1);
      expect(crossV2.y).toBe(-2);
      expect(crossV2.z).toBe(1);
    });
  });
});
