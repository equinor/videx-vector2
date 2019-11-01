/**
 * Rotate vector by a given amount of radians.
 * @param {Number[]} v Vector to rotate
 * @param {Number} rad Angle in radians
 * @param {Number[]} [target=v] Target for storing the results (Default: v)
 * @return {Number} Rotated vector
 */
export function rotate(v, rad, target) {
  if (!target) target = v;
  const cr = Math.cos(rad);
  const sr = Math.sin(rad);
  target[0] = cr * v[0] - sr * v[1];
  target[1] = sr * v[0] + cr * v[1];
  return target;
}

/**
 * Rotate vector by 90 degrees. (Counter-clockwise)
 * @param {Number[]} v Vector to rotate
 * @param {Number[]} [target=v] Target for storing the results (Default: v)
 * @return {Number} Rotated vector
 */
export function rotate90(v, target) {
  if (!target) target = v;
  target[0] = -v[1];
  target[1] = v[0];
  return target;
}

/**
 * Flip/Rotate vector by 180 degrees.
 * @param {Number[]} v Vector to rotate
 * @param {Number[]} [target=v] Target for storing the results (Default: v)
 * @return {Number} Rotated vector
 */
export function rotate180(v, target) {
  if (!target) target = v;
  target[0] = -v[0];
  target[1] = -v[1];
  return target;
}

/**
 * Rotate vector by 270 degrees. (Counter-clockwise)
 * @param {Number[]} v Vector to rotate
 * @param {Number[]} [target=v] Target for storing the results (Default: v)
 * @return {Number} Rotated vector
 */
export function rotate270(v, target) {
  if (!target) target = v;
  target[0] = v[1];
  target[1] = -v[0];
  return target;
}

/**
 * Find angle (in radians) between vector and [1, 0].
 * @param {Number[]} v Target vector
 * @return {Number} Angle in radians
 */
export function atan2(v) {
  return Math.atan2(v[1], v[0]);
}

/**
 * Calculates the signed angle between two vectors.
 *
 * @param {Number[]} a First vector
 * @param {Number[]} b Second vector
 * @returns {Number} Signed angle between vectors
 */
export function signedAngle(a, b) {
  let phi = Math.atan2(b.y, b.x) - Math.atan2(a.y, a.x);
  if (phi > Math.PI) {
    phi -= 2 * Math.PI;
  } else if (phi <= -Math.PI) {
    phi += 2 * Math.PI;
  }
  return phi;
}

/**
 * Rotates a vector, v1, towards a second vector, v2, based on a factor, n.
 * An n-value of 0.5, will return a vector with rotation in between
 * v1 and v2.
 *
 * @example lerpRot([1, 0], [-1, 0]) // [0, 1]
 *
 * @param {Number[]} a Vector to interpolate from
 * @param {Number[]} b Vector to interpolate to
 * @param {Number} n Value between 0 - 1 used for interpolation
 * @param {Number[]} [target=a] Target for storing the results (Default: a)
 * @returns {Number[]} Interpolated vector
 */
export function lerpRot(a, b, n, target) {
  const phi = signedAngle(a, b); // Signed angle
  return rotate(a, n * phi, target);
}

/**
 * Find the cross product between two 2d vectors.
 * @param {Number[]} a Left operand
 * @param {Number[]} b Right operand
 * @return {Number} Signed area of the parallellogram defined by v1 and v2
 */
export function cross(a, b) {
  return (a[0] * b[1]) - (a[1] * b[0]);
}
