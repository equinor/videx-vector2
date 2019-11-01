/* eslint-disable no-undef */
import Vector2 from '../src/index';

function expectVector2ToBeCloseTo(a, b, precision = 10) {
  expect(a[0]).toBeCloseTo(b[0], precision);
  expect(a[1]).toBeCloseTo(b[1], precision);
}

describe('Vector2.js', () => {
  it('getters/setters', () => {
    const v = new Vector2(2, 3);
    expect(v).toEqual([2, 3]);
    expect(v.x).toEqual(2);
    expect(v.y).toEqual(3);

    v.x = 4;
    v.y = 5;
    expect(v.x).toEqual(4);
    expect(v.y).toEqual(5);
  });

  it('set', () => {
    const v = new Vector2(2, 3);
    v.set(4, 5);
    expect(v).toEqual([4, 5]);
  });

  it('add', () => {
    const v = new Vector2(2, 3);
    expect(v.add([1, 2])).toEqual([3, 5]);
    expect(Vector2.add([2, 3], [1, 2])).toEqual([3, 5]);
  });

  it('sub', () => {
    const v = new Vector2(2, 3);
    expect(v.sub([1, 2])).toEqual([1, 1]);
    expect(Vector2.sub([2, 3], [1, 2])).toEqual([1, 1]);
  });

  it('divide', () => {
    expect(Vector2.divide([2, 6], 2)).toEqual([1, 3]);
  });

  it('multiply', () => {
    expect(Vector2.multiply([2, 3], 2)).toEqual([4, 6]);
  });

  it('scale', () => {
    const v = new Vector2(2, 3);
    expect(v.scale(2)).toEqual([4, 6]);
  });

  it('rescale', () => {
    const v = new Vector2(6, 0);
    expect(v.rescale(2)).toEqual([2, 0]);
  });

  it('clampMagnitude', () => {
    const v = new Vector2(6, 0);
    expect(v.clampMagnitude(5)).toEqual([5, 0]);
    expect(v.clampMagnitude(10)).toEqual([6, 0]);
  });

  it('rotate', () => {
    expectVector2ToBeCloseTo(Vector2.right.rotate(Math.PI / 2), Vector2.up);
    expectVector2ToBeCloseTo(Vector2.right.rotate(Math.PI / 4), [Math.sqrt(0.5), Math.sqrt(0.5)]);
  });

  it('rotateDeg', () => {
    expectVector2ToBeCloseTo(Vector2.right.rotateDeg(90), Vector2.up);
    expectVector2ToBeCloseTo(Vector2.right.rotateDeg(45), [Math.sqrt(0.5), Math.sqrt(0.5)]);
  });

  it('rotate90', () => {
    expectVector2ToBeCloseTo(Vector2.right.rotate90(), Vector2.up);
    expectVector2ToBeCloseTo(Vector2.up.rotate90(), Vector2.left);
  });

  it('rotate180', () => {
    expectVector2ToBeCloseTo(Vector2.right.rotate180(), Vector2.left);
    expectVector2ToBeCloseTo(Vector2.up.rotate180(), Vector2.down);
  });

  it('rotate270', () => {
    expectVector2ToBeCloseTo(Vector2.right.rotate270(), Vector2.down);
    expectVector2ToBeCloseTo(Vector2.down.rotate270(), Vector2.left);
  });

  it('normalize', () => {
    const v = new Vector2(6, 0);
    v.normalize();
    expectVector2ToBeCloseTo(v, Vector2.right);
  });

  it('normalized', () => {
    const v = new Vector2(6, 0);
    expectVector2ToBeCloseTo(v.normalized(), Vector2.right);
  });

  it('distance', () => {
    expect(Vector2.distance(Vector2.left, Vector2.right)).toBeCloseTo(2);
    expect(Vector2.distance(Vector2.zero, [3, 4])).toBeCloseTo(5);
  });

  it('dot', () => {
    expect(Vector2.dot(Vector2.up, Vector2.right)).toBeCloseTo(0);
    expect(Vector2.dot([1, 3], [-2, 1])).toBeCloseTo(1);
  });

  it('cross', () => {
    expect(Vector2.cross([2, 3], [4, 5])).toBeCloseTo(-2);
  });

  it('atan2', () => {
    expect(Vector2.atan2(Vector2.up)).toBeCloseTo(Math.PI / 2);
    expect(Vector2.atan2(Vector2.one)).toBeCloseTo(Math.PI / 4);
    expect(Vector2.atan2(Vector2.down)).toBeCloseTo(-Math.PI / 2);
  });

  it('atan2Deg', () => {
    expect(Vector2.atan2Deg(Vector2.up)).toBeCloseTo(90);
    expect(Vector2.atan2Deg(Vector2.one)).toBeCloseTo(45);
    expect(Vector2.atan2Deg(Vector2.down)).toBeCloseTo(-90);
  });

  it('angle', () => {
    expect(Vector2.angle(Vector2.right, Vector2.up)).toBeCloseTo(Math.PI / 2);
    expect(Vector2.angle(Vector2.left, Vector2.one)).toBeCloseTo(3 * Math.PI / 4);
  });

  it('angleDeg', () => {
    expect(Vector2.angleDeg(Vector2.right, Vector2.up)).toBeCloseTo(90);
    expect(Vector2.angleDeg(Vector2.left, Vector2.one)).toBeCloseTo(135);
  });

  it('signedAngle', () => {
    expect(Vector2.signedAngle(Vector2.right, Vector2.up)).toBeCloseTo(Math.PI / 2);
    expect(Vector2.signedAngle(Vector2.up, Vector2.right)).toBeCloseTo(-Math.PI / 2);
  });

  it('signedAngleDeg', () => {
    expect(Vector2.signedAngleDeg(Vector2.right, Vector2.up)).toBeCloseTo(90);
    expect(Vector2.signedAngleDeg(Vector2.up, Vector2.right)).toBeCloseTo(-90);
  });

  it('lerp', () => {
    expectVector2ToBeCloseTo(Vector2.lerp(Vector2.left, Vector2.right, 0.5), Vector2.zero);
    expectVector2ToBeCloseTo(
      Vector2.lerp(Vector2.left, Vector2.right, 0.25), Vector2.left.scale(0.5),
    );
    expectVector2ToBeCloseTo(
      Vector2.lerp(Vector2.left, Vector2.right, 0.75), Vector2.right.scale(0.5),
    );
  });

  it('lerpRot', () => {
    expectVector2ToBeCloseTo(Vector2.lerpRot(Vector2.right, Vector2.left, 0.5), Vector2.up);
    expectVector2ToBeCloseTo(
      Vector2.lerpRot(Vector2.right, Vector2.left, 0.25), Vector2.one.rescale(1),
    );
  });

  it('magnitude', () => {
    expect(new Vector2(3, 4).magnitude).toBeCloseTo(5);

    const v = new Vector2(5, 0);
    v.magnitude = 2;
    expectVector2ToBeCloseTo(v, [2, 0]);
  });

  it('presets', () => {
    expect(Vector2.zero).toEqual([0, 0]);
    expect(Vector2.one).toEqual([1, 1]);
    expect(Vector2.positiveInfinity).toEqual([Infinity, Infinity]);
    expect(Vector2.negativeInfinity).toEqual([-Infinity, -Infinity]);

    expect(Vector2.right).toEqual([1, 0]);
    expect(Vector2.up).toEqual([0, 1]);
    expect(Vector2.left).toEqual([-1, 0]);
    expect(Vector2.down).toEqual([0, -1]);
  });
});
