import {
  dist,
  add as baseAdd,
  sub as baseSub,
  scale as baseScale,
  magnitude as baseMagnitude,
  normalize as baseNormalize,
  dot as baseDot,
  mix,
} from '@equinor/videx-linear-algebra';

import { RAD2DEG, DEG2RAD } from './const';

import {
  rotate,
  rotate90,
  rotate180,
  rotate270,
  atan2,
  signedAngle,
  lerpRot,
  cross,
} from './functions';

export default class Vector2 extends Array {
  /**
   * @param {Number} val Numeric value
   * @returns {Number} X-component of vector
   */
  get x() { return this[0]; }

  set x(val) { this[0] = val; }

  /**
   * @param {Number} val Numeric value
   * @returns {Number} Y-component of vector
   */
  get y() { return this[1]; }

  set y(val) { this[1] = val; }

  /**
   * Set both components of vector.
   * @param {Number} x X-component of vector
   * @param {Number} y Y-component of vector
   */
  set(x, y) {
    this[0] = x;
    this[1] = y;
  }

  /**
   * Add values of given vector to target vector.
   * @param {Vector2} b Vector to add
   * @returns {Vector2} Resulting vector
   */
  add(b) {
    return baseAdd(this, b, new Vector2(2));
  }

  /**
   * a + b
   *
   * Add two values together.
   * @param {Vector2} a Left operand
   * @param {Vector2} b Right operand
   * @returns {Vector2} Resulting vector
   */
  static add(a, b) {
    return baseAdd(a, b, new Vector2(2));
  }

  /**
   * Subtract values of given vector from target vector.
   * @param {Vector2} b Vector to subtract
   * @returns {Vector2} Resulting vector
   */
  sub(b) {
    return baseSub(this, b, new Vector2(2));
  }

  /**
   * a - b
   *
   * Subtract second vector from first vector.
   * @param {Vector2} a First vector
   * @param {Vector2} b Second vector
   * @returns {Vector2} Resulting vector
   */
  static sub(a, b) {
    return baseSub(a, b, new Vector2(2));
  }

  /**
   * v / n
   *
   * Divide vector by a numeric value.
   * @param {Vector2} v Vector to divide
   * @param {Number} n Numeric value
   * @returns {Vector2} Resulting vector
   */
  static divide(v, n) {
    return baseScale(v, 1 / n, new Vector2(2));
  }

  /**
   * v * n
   *
   * Multiply vector by a numeric value.
   * @param {Vector2} v Vector to multiply
   * @param {Number} n Numeric value
   * @returns {Vector2} Resulting vector
   */
  static multiply(v, n) {
    return baseScale(v, n, new Vector2(2));
  }

  /**
   * Scale vector by a numeric value.
   * @param {Number} n Numeric value
   * @returns {Vector2} Resulting vector
   */
  scale(n) {
    return baseScale(this, n, new Vector2(2));
  }

  /**
   * Rescale the vector to given length.
   * @param {Number} n Numeric value
   * @returns {Vector2} Resulting vector
   */
  rescale(n) {
    const len = baseMagnitude(this);
    return baseScale(this, n / len, new Vector2(2));
  }

  /**
   * Ensures that the magnitude of the vector does not
   * exceed a given length.
   * @param {Number} n Numeric value
   * @returns {Vector2} Resulting vector
   */
  clampMagnitude(n) {
    const len = baseMagnitude(this);
    if (len > n) return baseScale(this, n / len, new Vector2(2));
    return new Vector2(this[0], this[1]);
  }

  /**
   * Rotate the vector by specified amount of radians. Positive
   * rotation is counter-clockwise.
   * @param {Number} rad Radians to rotate
   * @returns {Vector2} Resulting vector
   */
  rotate(rad) {
    return rotate(this, rad, new Vector2(2));
  }

  /**
   * Rotate the vector by specified amount of degrees. Positive
   * rotation is counter-clockwise.
   * @param {Number} rad Degrees to rotate
   * @returns {Vector2} Resulting vector
   */
  rotateDeg(deg) {
    return rotate(this, deg * DEG2RAD, new Vector2(2));
  }

  /**
   * Rotate the vector counter-clockwise by an amount of 90 degrees. Resulting
   * vector is perpendicular to the original.
   * @returns {Vector2} Resulting vector
   */
  rotate90() {
    return rotate90(this, new Vector2(2));
  }

  /**
   * Rotate the vector counter-clockwise by an amount of 180 degrees. Resulting
   * vector is opposite to the original.
   * @returns {Vector2} Resulting vector
   */
  rotate180() {
    return rotate180(this, new Vector2(2));
  }

  /**
   * Rotate the vector counter-clockwise by an amount of 270 degrees. Resulting
   * vector is perpendicular to the original.
   * @returns {Vector2} Resulting vector
   */
  rotate270() {
    return rotate270(this, new Vector2(2));
  }

  /**
   * [Mutation] Normalizes the vector.
   * @returns {Vector2} Reference to vector
   */
  normalize() {
    return baseNormalize(this); // Mutate vector
  }

  /**
   * Get normalized version of vector.
   * @returns {Vector2} Resulting vector
   */
  normalized() {
    return baseNormalize(this, new Vector2(2)); // Don't mutate
  }

  /**
   * Get distance between two positions.
   * @param {Vector2} a First position
   * @param {Vector2} b Second position
   * @returns Distance between positions
   */
  static distance(a, b) {
    return dist(a, b);
  }

  /**
   * Get dot product between two vectors.
   * @param {Vector2} a First vector
   * @param {Vector2} b Second vector
   * @return {Number} Dot product
   */
  static dot(a, b) {
    return baseDot(a, b);
  }

  /**
   * Get cross product between two vectors.
   * @param {Vector2} a First vector
   * @param {Vector2} b Second vector
   * @return {Number} Cross product
   */
  static cross(a, b) {
    return cross(a, b);
  }

  /**
   * Get angle (in radians) between vector and [1, 0].
   * @param {Vector2} v Target vector
   * @return {Number} Angle in radians
   */
  static atan2(v) {
    return atan2(v);
  }

  /**
   * Get angle (in degrees) between vector and [1, 0].
   * @param {Vector2} v Target vector
   * @return {Number} Angle in degrees
   */
  static atan2Deg(v) {
    return atan2(v) * RAD2DEG;
  }

  /**
   * Get angle (in radians) between two vectors.
   * @param {Vector2} a First vector
   * @param {Vector2} b Second vector
   * @returns {Number} Angle in radians
   */
  static angle(a, b) {
    return Math.abs(signedAngle(a, b));
  }

  /**
   * Get angle (in degrees) between two vectors.
   * @param {Vector2} a First vector
   * @param {Vector2} b Second vector
   * @returns {Number} Angle in degrees
   */
  static angleDeg(a, b) {
    return Math.abs(signedAngle(a, b)) * RAD2DEG;
  }

  /**
   * Get signed angle (in radians) between two vectors.
   * @param {Vector2} a First vector
   * @param {Vector2} b Second vector
   * @returns {Number} Signed angle in radians
   */
  static signedAngle(a, b) {
    return signedAngle(a, b);
  }

  /**
   * Get signed angle (in degrees) between two vectors.
   * @param {Vector2} a First vector
   * @param {Vector2} b Second vector
   * @returns {Number} Signed angle in degrees
   */
  static signedAngleDeg(a, b) {
    return signedAngle(a, b) * RAD2DEG;
  }

  /**
   * Interpolate between two positions with given value n.
   * @param {Vector2} a Position to interpolate from
   * @param {Vector2} b Position to interpolate to
   * @param {Number} t Value between 0 - 1 used for interpolation
   * @returns {Vector2} Interpolated position
   */
  static lerp(a, b, t) {
    return mix(a, b, t, new Vector2(2));
  }

  /**
   * Rotates a vector, v1, towards a second vector, v2, based on a factor, n.
   * @param {Vector2} a Vector to interpolate from
   * @param {Vector2} b Vector to interpolate to
   * @param {Number} t Value between 0 - 1 used for interpolation
   * @returns {Vector2} Interpolated vector
   */
  static lerpRot(a, b, t) {
    return lerpRot(a, b, t, new Vector2(2));
  }

  /**
   * @param {Number} val Numeric value
   * @returns {Number} Magnitude of the vector
   */
  get magnitude() {
    return baseMagnitude(this);
  }

  set magnitude(val) {
    const len = baseMagnitude(this);
    baseScale(this, val / len, this);
  }

  /**
   * @returns Vector2 with values: [0, 0]
   */
  static get zero() { return new Vector2(0, 0); }

  /**
   * @returns Vector2 with values: [1, 1]
   */
  static get one() { return new Vector2(1, 1); }

  /**
   * @returns Vector2 with values: [∞, ∞]
   */
  static get positiveInfinity() { return new Vector2(Infinity, Infinity); }

  /**
   * @returns Vector2 with values: [-∞, -∞]
   */
  static get negativeInfinity() { return new Vector2(-Infinity, -Infinity); }

  /**
   * @returns Vector2 with values: [0, 1]
   */
  static get up() { return new Vector2(0, 1); }

  /**
   * @returns Vector2 with values: [0, -1]
   */
  static get down() { return new Vector2(0, -1); }

  /**
   * @returns Vector2 with values: [1, 0]
   */
  static get right() { return new Vector2(1, 0); }

  /**
   * @returns Vector2 with values: [-1, 0]
   */
  static get left() { return new Vector2(-1, 0); }
}
