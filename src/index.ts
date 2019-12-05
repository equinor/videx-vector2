
import {
  VectorLike,
  add as baseAdd,
  sub as baseSub,
  scale as baseScale,
  magnitude as baseMagnitude,
  normalize as baseNormalize,
  dist,
  dot as baseDot,
  mix,
  isZeroVector,
  modify as baseModify,
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
   * Declare that Vector2 will have numeric properties.
   */
  [index: number]: number;

  /**
   * Does the vector mutate?
   */
  mutate: boolean = false;

  /**
   * Length variable to use vector as array.
   */
  length: number = 2;

  /**
   * Construct a new Vector2 with identical x and y components.
   * @param value Value of x and y component
   */
  constructor(value: number);

  /**
   * Construct a new Vector2.
   * @param x Initial x component of vector
   * @param y Initial y component of vector
   */
  constructor(x: number, y: number);

  /**
   * Construct a new Vector2 using component from another vector.
   * @param vector
   */
  constructor(vector: VectorLike);

  /**
   * Construct a new Vector2 using an object with an x and y key.
   * @param vector
   */
  constructor(vector: {x: number, y: number});

  /**
   * Construct a new Vector2.
   * @param nums A series of numbers
   */
  constructor(...nums: number[]);

  constructor(a: number | VectorLike | {x: number, y: number}, ...b : number[]) {
    if(typeof a === 'number'){
      if (typeof b[0] === 'number') {
        this[0] = a;
        this[1] = b[0];
      }
      else {
        this[0] = a;
        this[1] = a;
      }
    } else {
      if ('x' in a && 'y' in a) {
        this[0] = a.x;
        this[1] = a.y;
      } else {
        this[0] = a[0];
        this[1] = a[1];
      }
    }
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
   * @param value Value of x and y component
   * @returns Reference to self
   */
  set(value: number): Vector2

  /**
   * [Mutation] Set both components of vector.
   * @param x New x component of vector
   * @param y New y component of vector
   * @returns Reference to self
   */
  set(x: number, y: number): Vector2

  /**
   * [Mutation] Set both components of vector.
   * @param vector Vector-like object with values on the format: [ x, y ]
   * @returns Reference to self
   */
  set(vector: VectorLike): Vector2

  set(a: number|VectorLike, b?: number): Vector2 {
    if(typeof a === 'number'){
      if (typeof b === 'number') {
        this[0] = a;
        this[1] = b;
      } else {
        this[0] = a;
        this[1] = a;
      }
    } else {
      this[0] = a[0];
      this[1] = a[1];
    }
    return this;
  }

  /**
   * Add values of given vector to target vector.
   * @param x X component to add
   * @param y Y component to add
   * @returns Resulting vector
   */
  add(x: number, y: number): Vector2

  /**
   * Add values of given vector to target vector.
   * @param vector Vector to add
   * @returns Resulting vector
   */
  add(vector: VectorLike): Vector2

  add(a: number|VectorLike, b: number = 0): Vector2 {
    if(typeof a == 'number') {
      if(this.mutate)  return baseAdd(this, [a, b]);
      return baseAdd(this.clone(), [a, b]);
    }
    if(this.mutate)  return baseAdd(this, a);
    return baseAdd(this.clone(), a);
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
  static add(a: VectorLike, b: VectorLike): Vector2 {
    const output = new Vector2(a);
    return baseAdd<Vector2>(output, b);
  }

  /**
   * Subtract from vector.
   * @param x X component to subtract
   * @param y Y component to subtract
   * @returns Resulting vector
   */
  sub(x: number, y: number): Vector2

  /**
   * Subtract from vector.
   * @param vector Vector to subtract
   * @returns Resulting vector
   */
  sub(vector: VectorLike): Vector2

  sub(a: number|VectorLike, b: number = 0): Vector2 {
    if(typeof a == 'number') {
      if(this.mutate)  return baseSub(this, [a, b]);
      return baseSub(this.clone(), [a, b]);
    }
    if(this.mutate)  return baseSub(this, a);
    return baseSub(this.clone(), a);
  }

  /**
   * a - b
   *
   * Subtract second vector from first vector.
   * @param a Left operand
   * @param b Right operand
   * @returns Resulting vector
   */
  static sub(a: VectorLike, b: VectorLike): Vector2 {
    const output = new Vector2(a);
    return baseSub(output, b);
  }

  /**
   * target - this
   *
   * Subtract this vector from given vector.
   * @param x X component to subtract from
   * @param y Y component to subtract from
   * @returns Resulting vector
   */
  subFrom(x: number, y: number): Vector2

  /**
   * target - this
   *
   * Subtract this vector from given vector.
   * @param vector Vector to to subtract from
   * @returns Resulting vector
   */
  subFrom(vector: VectorLike): Vector2

  subFrom(a: number|VectorLike, b: number = 0): Vector2 {
    if(typeof a == 'number') {
      if(this.mutate) {
        this[0] = a - this[0];
        this[1] = b - this[1];
        return this;
      }
      return new Vector2(a - this[0], b - this[1]);
    }
    if(this.mutate) {
      this[0] = a[0] - this[0];
      this[1] = a[1] - this[1];
      return this;
    }
    return new Vector2(a[0] - this[0], a[1] - this[1]);
  }

  /**
   * v / n
   *
   * Divide vector by a numeric value.
   * @param v Vector to divide
   * @param n Numeric value
   * @returns Resulting vector
   */
  static divide(v: VectorLike, n: number): Vector2 {
    const output = new Vector2(v);
    return baseScale(output, 1 / n);
  }

  /**
   * v * n
   *
   * Multiply vector by a numeric value.
   * @param v Vector to multiply
   * @param n Numeric value
   * @returns Resulting vector
   */
  static multiply(v: VectorLike, n: number): Vector2 {
    const output = new Vector2(v);
    return baseScale(output, n);
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
    if (len <= 0) return this.mutate ? this : Vector2.zero;
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
  static distance(a: VectorLike, b: VectorLike): number {
    return dist(a, b);
  }

  /**
   * Get dot product between two vectors.
   * @param a First vector
   * @param b Second vector
   * @return Dot product
   */
  static dot(a: VectorLike, b: VectorLike): number {
    return baseDot(a, b);
  }

  /**
   * Get cross product between two vectors.
   * @param a First vector
   * @param b Second vector
   * @return Cross product
   */
  static cross(a: VectorLike, b: VectorLike): number {
    return cross(a, b);
  }

  /**
   * Get angle (in radians) between vector and [1, 0].
   * @param v Target vector
   * @return Angle in radians
   */
  static angleRight(v: VectorLike): number {
    return angleRight(v);
  }

  /**
   * Get angle (in degrees) between vector and [1, 0].
   * @param v Target vector
   * @return Angle in degrees
   */
  static angleRightDeg(v: VectorLike): number {
    return angleRight(v) * RAD2DEG;
  }

  /**
   * Get angle (in radians) between two vectors.
   * @param a First vector
   * @param b Second vector
   * @returns Angle in radians
   */
  static angle(a: VectorLike, b: VectorLike): number {
    return Math.abs(signedAngle(a, b));
  }

  /**
   * Get angle (in degrees) between two vectors.
   * @param a First vector
   * @param b Second vector
   * @returns Angle in degrees
   */
  static angleDeg(a: VectorLike, b: VectorLike): number {
    return Math.abs(signedAngle(a, b)) * RAD2DEG;
  }

  /**
   * Get signed angle (in radians) between two vectors.
   * @param a First vector
   * @param b Second vector
   * @returns Signed angle in radians
   */
  static signedAngle(a: VectorLike, b: VectorLike): number {
    return signedAngle(a, b);
  }

  /**
   * Get signed angle (in degrees) between two vectors.
   * @param a First vector
   * @param b Second vector
   * @returns Signed angle in degrees
   */
  static signedAngleDeg(a: VectorLike, b: VectorLike): number {
    return signedAngle(a, b) * RAD2DEG;
  }

  /**
   * Interpolate between two positions with given value n.
   * @param a Position to interpolate from
   * @param b Position to interpolate to
   * @param t Value between 0 - 1 used for interpolation
   * @returns Interpolated position
   */
  static lerp(a: VectorLike, b: VectorLike, t: number): Vector2 {
    const output = new Vector2(a);
    return mix(output, b, t);
  }

  /**
   * Rotates a vector, v1, towards a second vector, v2, based on a factor, n.
   * @param a Vector to interpolate from
   * @param b Vector to interpolate to
   * @param t Value between 0 - 1 used for interpolation
   * @returns Interpolated vector
   */
  static lerpRot(a: VectorLike, b: VectorLike, t: number): Vector2 {
    return lerpRot(a, b, t, Vector2.zero);
  }

  /**
   * Creates a new vector with identical values.
   * Mutable state is not transferred.
   * @returns Clone of vector
   */
  clone(): Vector2 {
    return new Vector2(this[0], this[1]);
  }

  /**
   * Returns true if a equals b. Epsilon defines allowed deviation for the x and y component.
   * @param a Vector to evaluate
   * @param b Vector to compare with
   * @param epsilon Accepted deviation (Default: 0)
   * @returns Are vectors equal?
   */
  static equals(a: VectorLike, b: VectorLike, epsilon: number = 0): boolean {
    if (Math.abs(a[0] - b[0]) > epsilon) return false;
    if (Math.abs(a[1] - b[1]) > epsilon) return false;
    return true;
  }

  /**
   * Returns true if vector equals b. Epsilon defines allowed deviation for the x and y component.
   * @param vector Vector to compare with
   * @param epsilon Accepted deviation (Default: 0)
   * @returns Are vectors equal?
   */
  equals(vector: VectorLike, epsilon: number = 0): boolean {
    return Vector2.equals(this, vector, epsilon);
  }

  /**
   * Returns true if x and y is zero, otherwise returns false.
   * @param a Vector to evaluate
   * @param epsilon Accepted deviation from 0.00 (Default: 0)
   * @returns Is target zero vector?
   */
  static isZeroVector(vector: VectorLike, epsilon: number = 0): boolean {
    return isZeroVector(vector, epsilon);
  }

  /**
   * Returns true if x and y is zero, otherwise returns false.
   * @param epsilon Accepted deviation from 0.00 (Default: 0)
   * @returns Is target zero vector?
   */
  isZeroVector(epsilon: number = 0): boolean {
    return isZeroVector(this, epsilon);
  }

  /**
   * Create an array from the vector.
   * @returns Array on the format: [ x, y ]
   */
  toArray() : [number, number] {
    return [this[0], this[1]];
  }

  /**
   * [Mutation] Modifies both the x and y-component of a vector using a given function.
   * @param modifier Function used to modify
   * @returns Reference to vector
   */
  modify(modifier: (d: number) => number): Vector2 {
    return baseModify(this, modifier);
  }

  // Iterator
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        switch(i++) {
          case 0: return {value: this[0], done: false};
          case 1: return {value: this[1], done: false};
          default: return {value: -1, done: true};
        }
      }
    };
  };

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
