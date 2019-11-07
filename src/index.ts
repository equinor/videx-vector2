
import {
  add as baseAdd,
  sub as baseSub,
  scale as baseScale,
  magnitude as baseMagnitude,
  normalize as baseNormalize,
  dist,
  dot as baseDot,
  mix,
} from '@equinor/videx-linear-algebra';

import { RAD2DEG, DEG2RAD } from './const';

import {
  rotate,
  rotate90,
  rotate180,
  rotate270,
  cross,
  angleRight,
  signedAngle,
  lerpRot,
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
  0: number;

  /**
   * Y component of vector
   */
  1: number;

  /**
   * Does the vector mutate?
   */
  mutate: boolean = false;

  /**
   * Length variable to use vector as array.
   */
  length: number = 2;

  /**
   * Construct a new Vector2.
   * @param x Initial x component of vector
   * @param y Initial y component of vector
   */
  constructor(x: number, y: number) {
    this[0] = x;
    this[1] = y;
  }

  /**
   * Alternative getter/setter for x component.
   */
  get x(): number {
    return this[0];
  }
  set x(value: number) {
    this[0] = value;
  }

  /**
   * Alternative getter/setter for y component.
   */
  get y(): number {
    return this[1];
  }
  set y(value: number) {
    this[1] = value;
  }

  /**
   * Magnitude of vector.
   */
  get magnitude() {
    return baseMagnitude(this);
  }
  set magnitude(val) {
    const len = baseMagnitude(this);
    baseScale(this, val / len, this);
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
   * [Mutation] Set both components of vector.
   * @param x New x component of vector
   * @param y New y component of vector
   * @returns Reference to self
   */
  set(x: number, y: number): Vector2 {
    this[0] = x;
    this[1] = y;
    return this;
  }

  /**
   * Add values of given vector to target vector.
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
   * @param v Vector to multiply
   * @param n Numeric value
   * @returns Resulting vector
   */
  static multiply(v: [number, number]|Vector2, n: number): Vector2 {
    return baseScale(v, n, Vector2.zero);
  }

  /**
   * Scale vector by a numeric value.
   * @param n Numeric value
   * @returns Resulting vector
   */
  scale(n: number): Vector2 {
    return baseScale(this, n, this.mutate ? this : Vector2.zero);
  }

  /**
   * Rescale the vector to given length.
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
   * @param rad Radians to rotate
   * @returns Resulting vector
   */
  rotate(rad: number): Vector2 {
    return rotate(this, rad, this.mutate ? this : Vector2.zero);
  }

  /**
   * Rotate the vector by specified amount of degrees. Positive
   * rotation is counter-clockwise.
   * @param rad Degrees to rotate
   * @returns Resulting vector
   */
  rotateDeg(deg: number): Vector2 {
    return rotate(this, deg * DEG2RAD, this.mutate ? this : Vector2.zero);
  }

  /**
   * Rotate the vector counter-clockwise by an amount of 90 degrees. Resulting
   * vector is perpendicular to the original.
   * @returns Resulting vector
   */
  rotate90(): Vector2 {
    return rotate90(this, this.mutate ? this : Vector2.zero);
  }

  /**
   * Rotate the vector counter-clockwise by an amount of 180 degrees. Resulting
   * vector is opposite of original.
   * @returns Resulting vector
   */
  rotate180(): Vector2 {
    return rotate180(this, this.mutate ? this : Vector2.zero);
  }

  /**
   * Rotate the vector counter-clockwise by an amount of 270 degrees. Resulting
   * vector is perpendicular to the original.
   * @returns Resulting vector
   */
  rotate270(): Vector2 {
    return rotate270(this, this.mutate ? this : Vector2.zero);
  }

  /**
   * [Mutation] Normalizes the vector.
   * @returns Reference to vector
   */
  normalize(): Vector2 {
    return baseNormalize(this); // Mutate vector
  }

  /**
   * Get normalized version of vector.
   * @returns Resulting vector
   */
  normalized(): Vector2 {
    return baseNormalize(this, Vector2.zero); // Don't mutate
  }

  /**
   * Get distance between two positions.
   * @param a First position
   * @param b Second position
   * @returns Distance between positions
   */
  static distance(a: [number, number]|Vector2, b: [number, number]|Vector2): number {
    return dist(a, b);
  }

  /**
   * Get dot product between two vectors.
   * @param a First vector
   * @param b Second vector
   * @return Dot product
   */
  static dot(a: [number, number]|Vector2, b: [number, number]|Vector2): number {
    return baseDot(a, b);
  }

  /**
   * Get cross product between two vectors.
   * @param a First vector
   * @param b Second vector
   * @return Cross product
   */
  static cross(a: [number, number]|Vector2, b: [number, number]|Vector2): number {
    return cross(a, b);
  }

  /**
   * Get angle (in radians) between vector and [1, 0].
   * @param v Target vector
   * @return Angle in radians
   */
  static angleRight(v: [number, number]|Vector2): number {
    return angleRight(v);
  }

  /**
   * Get angle (in degrees) between vector and [1, 0].
   * @param v Target vector
   * @return Angle in degrees
   */
  static angleRightDeg(v: [number, number]|Vector2): number {
    return angleRight(v) * RAD2DEG;
  }

  /**
   * Get angle (in radians) between two vectors.
   * @param a First vector
   * @param b Second vector
   * @returns Angle in radians
   */
  static angle(a: [number, number]|Vector2, b: [number, number]|Vector2): number {
    return Math.abs(signedAngle(a, b));
  }

  /**
   * Get angle (in degrees) between two vectors.
   * @param a First vector
   * @param b Second vector
   * @returns Angle in degrees
   */
  static angleDeg(a: [number, number]|Vector2, b: [number, number]|Vector2): number {
    return Math.abs(signedAngle(a, b)) * RAD2DEG;
  }

  /**
   * Get signed angle (in radians) between two vectors.
   * @param a First vector
   * @param b Second vector
   * @returns Signed angle in radians
   */
  static signedAngle(a: [number, number]|Vector2, b: [number, number]|Vector2): number {
    return signedAngle(a, b);
  }

  /**
   * Get signed angle (in degrees) between two vectors.
   * @param a First vector
   * @param b Second vector
   * @returns Signed angle in degrees
   */
  static signedAngleDeg(a: [number, number]|Vector2, b: [number, number]|Vector2): number {
    return signedAngle(a, b) * RAD2DEG;
  }

  /**
   * Interpolate between two positions with given value n.
   * @param a Position to interpolate from
   * @param b Position to interpolate to
   * @param t Value between 0 - 1 used for interpolation
   * @returns Interpolated position
   */
  static lerp(a: [number, number]|Vector2, b: [number, number]|Vector2, t: number): Vector2 {
    return mix(a, b, t, Vector2.right);
  }

  /**
   * Rotates a vector, v1, towards a second vector, v2, based on a factor, n.
   * @param a Vector to interpolate from
   * @param b Vector to interpolate to
   * @param t Value between 0 - 1 used for interpolation
   * @returns Interpolated vector
   */
  static lerpRot(a: [number, number]|Vector2, b: [number, number]|Vector2, t: number): Vector2 {
    return lerpRot(a, b, t, Vector2.right);
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
   * [Mutation] Set both components of a vector from an array.
   * @param array Array to get values from
   * @returns Reference to self
   */
  setArray(array: [number, number]) : Vector2 {
    this[0] = array[0];
    this[1] = array[1];
    return this;
  }

  /**
   * Create a vector from an array.
   * @param array Array to get values from
   * @returns Reference to self
   */
  static fromArray(array: [number, number]) : Vector2 {
    return new Vector2(array[0], array[1]);
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
