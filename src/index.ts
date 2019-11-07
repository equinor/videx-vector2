
import {
  add as baseAdd,
  sub as baseSub,
  scale as baseScale,
  magnitude as baseMagnitude,
  normalize as baseNormalize,
  dist,
  dot as baseDot,
} from '@equinor/videx-linear-algebra';

import { RAD2DEG, DEG2RAD } from './const';

import {
  rotate,
  rotate90,
  rotate180,
  rotate270,
  cross,
} from './functions';

/**
 * Vector2 class with x and y component. Can also be used as an array with two indices, i.e. using [0] and [1].
 * @class
 * @alias Vector2
 */
export default class Vector2 {
  /**
   * X component of vector
   */
  x: number;

  /**
   * Y component of vector
   */
  y: number;

  /**
   * Does the vector mutate?
   */
  mutate: boolean;

  /**
   * Construct a new Vector2.
   * @param x Initial x component of vector
   * @param y Initial y component of vector
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.mutate = false;
  }

  /**
   * Alternative getter/setter for x component.
   */
  get 0(): number {
    return this.x;
  }
  set 0(value: number) {
    this.x = value;
  }

  /**
   * Alternative getter/setter for y component.
   */
  get 1(): number {
    return this.y;
  }
  set 1(value: number) {
    this.y = value;
  }

  /**
   * Length variable to function as array.
   */
  get length(): number {
    return 2;
  }

  /**
   * Set mutable and return reference to self.
   * @returns Reference to self
   */
  get mutable(): Vector2 {
    this.mutate = true;
    return this;
  }

  /**
   * Set immutable and return reference to self.
   * @returns Reference to self
   */
  get immutable(): Vector2 {
    this.mutate = false;
    return this;
  }

  /**
   * Set both components of vector.
   * @memberof Vector2#
   * @param x New x component of vector
   * @param y New y component of vector
   * @returns Reference to self
   */
  set(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Add values of given vector to target vector.
   * @memberof Vector2#
   * @param b Vector to add
   * @returns Resulting vector
   */
  add(b : [number, number]|Vector2) : Vector2 {
    return baseAdd(this, b, this.mutate ? this : Vector2.zero);
  }

  /**
   * a + b
   *
   * Add two values together.
   * @memberof Vector2
   * @param a Left operand
   * @param b Right operand
   * @returns Resulting vector
   * @static
   */
  static add(a: [number, number]|Vector2, b: [number, number]|Vector2): Vector2 {
    return baseAdd(a, b, Vector2.zero);
  }

  /**
   * Subtract values of given vector from target vector.
   * @memberof Vector2#
   * @param b Vector to subtract
   * @returns Resulting vector
   */
  sub(b: [number, number]|Vector2): Vector2 {
    return baseSub(this, b, this.mutate ? this : Vector2.zero);
  }

  /**
   * a - b
   *
   * Subtract second vector from first vector.
   * @memberof Vector2
   * @param a Left operand
   * @param b Right operand
   * @returns Resulting vector
   */
  static sub(a: [number, number]|Vector2, b: [number, number]|Vector2): Vector2 {
    return baseSub(a, b, Vector2.zero);
  }

  /**
   * v / n
   *
   * Divide vector by a numeric value.
   * @memberof Vector2
   * @param v Vector to divide
   * @param n Numeric value
   * @returns Resulting vector
   */
  static divide(v: [number, number]|Vector2, n: number): Vector2 {
    return baseScale(v, 1 / n, Vector2.zero);
  }

  /**
   * v * n
   *
   * Multiply vector by a numeric value.
   * @memberof Vector2
   * @param v Vector to multiply
   * @param n Numeric value
   * @returns Resulting vector
   */
  static multiply(v: [number, number]|Vector2, n: number): Vector2 {
    return baseScale(v, n, Vector2.zero);
  }

  /**
   * Scale vector by a numeric value.
   * @memberof Vector2#
   * @param n Numeric value
   * @returns Resulting vector
   */
  scale(n: number): Vector2 {
    return baseScale(this, n, this.mutate ? this : Vector2.zero);
  }

  /**
   * Rescale the vector to given length.
   * @memberof Vector2#
   * @param n Numeric value
   * @returns Resulting vector
   */
  rescale(n: number): Vector2 {
    const len = baseMagnitude(this);
    return baseScale(this, n / len, this.mutate ? this : Vector2.zero);
  }

  /**
   * Ensures that the magnitude of the vector does not
   * exceed a given length.
   * @memberof Vector2#
   * @param {Number} n Numeric value
   * @returns {Vector2} Resulting vector
   */
  clampMagnitude(n: number): Vector2 {
    const len = baseMagnitude(this);
    if (len > n) return baseScale(this, n / len, this.mutate ? this : Vector2.zero);
    return this.mutate ? this : this.clone();
  }

  /**
   * Rotate the vector by specified amount of radians. Positive
   * rotation is counter-clockwise.
   * @memberof Vector2#
   * @param rad Radians to rotate
   * @returns Resulting vector
   */
  rotate(rad: number): Vector2 {
    return rotate(this, rad, this.mutate ? this : Vector2.zero);
  }

  /**
   * Rotate the vector by specified amount of degrees. Positive
   * rotation is counter-clockwise.
   * @memberof Vector2#
   * @param rad Degrees to rotate
   * @returns Resulting vector
   */
  rotateDeg(deg: number): Vector2 {
    return rotate(this, deg * DEG2RAD, this.mutate ? this : Vector2.zero);
  }

  /**
   * Rotate the vector counter-clockwise by an amount of 90 degrees. Resulting
   * vector is perpendicular to the original.
   * @memberof Vector2#
   * @returns Resulting vector
   */
  rotate90(): Vector2 {
    return rotate90(this, this.mutate ? this : Vector2.zero);
  }

  /**
   * Rotate the vector counter-clockwise by an amount of 180 degrees. Resulting
   * vector is opposite of original.
   * @memberof Vector2#
   * @returns Resulting vector
   */
  rotate180(): Vector2 {
    return rotate180(this, this.mutate ? this : Vector2.zero);
  }

  /**
   * Rotate the vector counter-clockwise by an amount of 270 degrees. Resulting
   * vector is perpendicular to the original.
   * @memberof Vector2#
   * @returns Resulting vector
   */
  rotate270(): Vector2 {
    return rotate270(this, this.mutate ? this : Vector2.zero);
  }

  /**
   * [Mutation] Normalizes the vector.
   * @memberof Vector2#
   * @returns Reference to vector
   */
  normalize(): Vector2 {
    return baseNormalize(this); // Mutate vector
  }

  /**
   * Get normalized version of vector.
   * @memberof Vector2#
   * @returns Resulting vector
   */
  normalized(): Vector2 {
    return baseNormalize(this, Vector2.zero); // Don't mutate
  }

  /**
   * Get distance between two positions.
   * @memberof Vector2
   * @param a First position
   * @param b Second position
   * @returns Distance between positions
   */
  static distance(a: [number, number]|Vector2, b: [number, number]|Vector2): number {
    return dist(a, b);
  }

  /**
   * Get dot product between two vectors.
   * @memberof Vector2
   * @param a First vector
   * @param b Second vector
   * @return Dot product
   */
  static dot(a: [number, number]|Vector2, b: [number, number]|Vector2): number {
    return baseDot(a, b);
  }

  /**
   * Get cross product between two vectors.
   * @memberof Vector2
   * @param a First vector
   * @param b Second vector
   * @return Cross product
   */
  static cross(a: [number, number]|Vector2, b: [number, number]|Vector2): number {
    return cross(a, b);
  }

  /**
   * Creates a new vector with identical values.
   * Mutable state is not transferred.
   * @returns Clone of vector
   */
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * Vector2 with values: [0, 0].
   * @memberof Vector2
   */
  static get zero() : Vector2 { return new Vector2(0, 0); }

  /**
   * Vector2 with values: [1, 1].
   * @memberof Vector2
   */
  static get one() : Vector2 { return new Vector2(1, 1); }

  /**
   * Vector2 with values: [∞, ∞].
   * @memberof Vector2
   */
  static get positiveInfinity() : Vector2 { return new Vector2(Infinity, Infinity); }

  /**
   * Vector2 with values: [-∞, -∞].
   * @memberof Vector2
   */
  static get negativeInfinity() : Vector2 { return new Vector2(-Infinity, -Infinity); }

  /**
   * Vector2 with values: [0, 1].
   * @memberof Vector2
   */
  static get up() : Vector2 { return new Vector2(0, 1); }

  /**
   * Vector2 with values: [1, 0].
   * @memberof Vector2
   */
  static get right() : Vector2 { return new Vector2(1, 0); }

  /**
   * Vector2 with values: [0, -1].
   * @memberof Vector2
   */
  static get down() : Vector2 { return new Vector2(0, -1); }

  /**
   * Vector2 with values: [-1, 0].
   * @memberof Vector2
   */
  static get left() : Vector2 { return new Vector2(-1, 0); }
}
