
// const vla = require('@equinor/videx-linear-algebra');
// import _ from '@equinor/videx-linear-algebra';
import {
  add as baseAdd,
  sub as baseSub,
} from '@equinor/videx-linear-algebra';

import { RAD2DEG, DEG2RAD } from './const';

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
  mutate : boolean;

  /**
   * Construct a new Vector2.
   * @param x Initial x component of vector
   * @param y Initial y component of vector
   */
  constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
  }

  /**
   * Alternative getter/setter for x component.
   */
  get 0(): number {
    return this.x;
  }
  set 0(value : number) {
    this.x = value;
  }

  /**
   * Alternative getter/setter for y component.
   */
  get 1(): number {
    return this.y;
  }
  set 1(value : number) {
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
   */
  get mutable(): Vector2 {
    this.mutate = true;
    return this;
  }

  /**
   * Set immutable and return reference to self.
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
   */
  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Add values of given vector to target vector.
   * @memberof Vector2#
   * @param {Array<number>|Vector2} b Vector to add
   * @returns {Vector2} Resulting vector
   */
  add(b : Array<number>|Vector2) : Vector2 {
    return baseAdd(this, b, this.mutate ? this : new Vector2(0, 0));
  }

  /**
   * a + b
   *
   * Add two values together.
   * @memberof Vector2
   * @param {Array<number>|Vector2} a Left operand
   * @param {Array<number>|Vector2} b Right operand
   * @returns {Vector2} Resulting vector
   * @static
   */
  static add(a : Array<number>|Vector2, b : Array<number>|Vector2) {
    return baseAdd(a, b, new Vector2(0, 0));
  }

  /**
   * Subtract values of given vector from target vector.
   * @memberof Vector2#
   * @param {{Array<number>|Vector2} b Vector to subtract
   * @returns {Vector2} Resulting vector
   */
  sub(b : Array<number>|Vector2) : Vector2 {
    return baseSub(this, b, this.mutate ? this : new Vector2(0, 0));
  }

  /**
   * a - b
   *
   * Subtract second vector from first vector.
   * @memberof Vector2
   * @param {Array<number>|Vector2} a Left operand
   * @param {Array<number>|Vector2} b Right operand
   * @returns {Vector2} Resulting vector
   */
  static sub(a : Array<number>|Vector2, b : Array<number>|Vector2) {
    return baseSub(a, b, new Vector2(0, 0));
  }

  /**
   * Vector2 with values: [1, 0]
   * @memberof Vector2
   */
  static get right() : Vector2 { return new Vector2(1, 0); }
}
