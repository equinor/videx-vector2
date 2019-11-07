import Vector2 from './index';

/**
 * Rotate vector by a given amount of radians.
 * @private
 * @param v Vector to rotate
 * @param rad Angle in radians
 * @param target Target for storing the results
 * @return Rotated vector
 */
export function rotate(v: Vector2, rad: number, target: Vector2): Vector2 {
  const cr = Math.cos(rad);
  const sr = Math.sin(rad);
  target.x = cr * v.x - sr * v.y;
  target.y = sr * v.x + cr * v.y;
  return target;
}

/**
 * Rotate vector by 90 degrees. (Counter-clockwise)
 * @private
 * @param v Vector to rotate
 * @param target Target for storing the results
 * @return Rotated vector
 */
export function rotate90(v: Vector2, target: Vector2): Vector2 {
  const x = v.x;
  target.x = -v.y;
  target.y = x;
  return target;
}

/**
 * Flip/Rotate vector by 180 degrees.
 * @private
 * @param v Vector to rotate
 * @param target Target for storing the results
 * @return Flipped/rotated vector
 */
export function rotate180(v: Vector2, target: Vector2): Vector2 {
  target.x = -v.x;
  target.y = -v.y;
  return target;
}

/**
 * Rotate vector by 270 degrees. (Counter-clockwise)
 * @private
 * @param v Vector to rotate
 * @param target Target for storing the results
 * @return Rotated vector
 */
export function rotate270(v: Vector2, target: Vector2): Vector2 {
  const x = v.x;
  target.x = v.y;
  target.y = -x;
  return target;
}

/**
 * Find the cross product between two 2d vectors.
 * @private
 * @param a Left operand
 * @param b Right operand
 * @return Signed area of the parallellogram defined by v1 and v2
 */
export function cross(a: [number, number]|Vector2, b: [number, number]|Vector2): number {
  return (a[0] * b[1]) - (a[1] * b[0]);
}

/**
 * Find angle (in radians) between vector and right vector, [1, 0].
 * @private
 * @param {Number[]} v Target vector
 * @return {Number} Angle in radians
 */
/*
export function angleRight(v) {
  return Math.atan2(v[1], v[0]);
}
 */

/**
 * Calculates the signed angle between two vectors.
 * @private
 * @param {Number[]} a First vector
 * @param {Number[]} b Second vector
 * @returns {Number} Signed angle between vectors
 */
/*
export function signedAngle(a, b) {
  let phi = Math.atan2(b.y, b.x) - Math.atan2(a.y, a.x);
  if (phi > Math.PI) {
    phi -= 2 * Math.PI;
  } else if (phi <= -Math.PI) {
    phi += 2 * Math.PI;
  }
  return phi;
}
 */

/**
 * Rotates a vector, v1, towards a second vector, v2, based on a factor, n.
 * An n-value of 0.5, will return a vector with rotation in between
 * v1 and v2.
 * @private
 * @param {Number[]} a Vector to interpolate from
 * @param {Number[]} b Vector to interpolate to
 * @param {Number} n Value between 0 - 1 used for interpolation
 * @param {Number[]} [target=a] Target for storing the results (Default: a)
 * @returns {Number[]} Interpolated vector
 */
/*
export function lerpRot(a, b, n, target) {
  const phi = signedAngle(a, b); // Signed angle
  return rotate(a, n * phi, target);
}
*/