/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import Vector2 from '../src/index';

function expectVector2ToBeCloseTo(a : any, b : any, precision : number = 10) {
  expect(a[0]).toBeCloseTo(b[0], precision);
  expect(a[1]).toBeCloseTo(b[1], precision);
}

function expectVector2ToBe(a : any, b : any) {
  expect(a[0]).toBe(b[0]);
  expect(a[1]).toBe(b[1]);
}

describe('Vector2.js', () => {
  it('constructor', () => {
    const a = new Vector2(1, 2);
    expectVector2ToBe(a, [1, 2]);
    expect(a.mutate).toBeFalsy();

    const array = [1, 2];
    const b = new Vector2(array);
    expectVector2ToBe(b, [1, 2]);

    const c = new Vector2(...array);
    expectVector2ToBe(c, [1, 2]);
  });


  it('getters/setters', () => {
    const a = new Vector2(1, 2);

    expect(a.x).toEqual(1);
    expect(a.x).toEqual(a[0]);

    expect(a.y).toEqual(2);
    expect(a.y).toEqual(a[1]);

    a.x = 4;
    a.y = 5;
    expect(a.x).toEqual(4);
    expect(a.y).toEqual(5);
  });

  it('set', () => {
    const v = new Vector2(2, 3);
    v.set(4, 5);
    expectVector2ToBe(v, [4, 5]);
    v.set([5, 6]);
    expectVector2ToBe(v, [5, 6]);
  });

  it('add', () => {
    const v = new Vector2(2, 3);
    expectVector2ToBe(v.add([1, 2]), [3, 5]);
    expectVector2ToBe(Vector2.add([2, 3], [1, 2]), [3, 5]);

    const u = new Vector2(3, 4);
    expectVector2ToBe(u.add(2, 4), [5, 8]);

    const m = Vector2.right.mutable;
    m.add([2, 3]);
    expectVector2ToBe(m, [3, 3]);
  });

  it('sub', () => {
    const v = new Vector2(2, 3);
    expectVector2ToBe(v.sub([1, 2]), [1, 1]);
    expectVector2ToBe(Vector2.sub([2, 3], [1, 2]), [1, 1]);

    const u = new Vector2(3, 4);
    expectVector2ToBe(u.sub(2, 4), [1, 0]);

    const m = new Vector2(2, 3).mutable;
    m.sub([1, 2]);
    expectVector2ToBe(m, [1, 1]);
  });


  it('divide', () => {
    expectVector2ToBe(Vector2.divide([2, 6], 2), [1, 3]);
  });

  it('multiply', () => {
    expectVector2ToBe(Vector2.multiply([2, 3], 2), [4, 6]);
  });


  it('scale', () => {
    const v = new Vector2(2, 3);
    expectVector2ToBe(v.scale(2), [4, 6]);

    const m = new Vector2(2, 3).mutable;
    m.scale(2);
    expectVector2ToBe(m, [4, 6]);
  });

  it('rescale', () => {
    const v = new Vector2(6, 0);
    expectVector2ToBe(v.rescale(2), [2, 0]);

    const m = new Vector2(6, 0).mutable;
    m.rescale(2);
    expectVector2ToBe(m, [2, 0]);
  });

  it('clampMagnitude', () => {
    const v = new Vector2(6, 0);
    expectVector2ToBe(v.clampMagnitude(5), [5, 0]);
    expectVector2ToBe(v.clampMagnitude(10), [6, 0]);
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

    const m = Vector2.right.mutable;
    m.rotate90();
    expectVector2ToBeCloseTo(m, Vector2.up);
  });

  it('rotate180', () => {
    expectVector2ToBeCloseTo(Vector2.right.rotate180(), Vector2.left);
    expectVector2ToBeCloseTo(Vector2.up.rotate180(), Vector2.down);
  });

  it('rotate270', () => {
    expectVector2ToBeCloseTo(Vector2.right.rotate270(), Vector2.down);
    expectVector2ToBeCloseTo(Vector2.down.rotate270(), Vector2.left);

    const m = Vector2.right.mutable;
    m.rotate270();
    expectVector2ToBeCloseTo(m, Vector2.down);
  });

  it('normalize', () => {
    const v = new Vector2(6, 0);
    v.normalize();
    expectVector2ToBeCloseTo(v, Vector2.right);

    const u = Vector2.zero;
    u.normalize();
    expectVector2ToBe(u, Vector2.zero);
  });

  it('normalized', () => {
    expectVector2ToBeCloseTo(new Vector2(6, 0).normalized(), Vector2.right);
    expectVector2ToBe(Vector2.zero.normalized(), Vector2.zero);
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


  it('angleRight', () => {
    expect(Vector2.angleRight(Vector2.up)).toBeCloseTo(Math.PI / 2);
    expect(Vector2.angleRight(Vector2.one)).toBeCloseTo(Math.PI / 4);
    expect(Vector2.angleRight(Vector2.down)).toBeCloseTo(-Math.PI / 2);
  });

  it('angleRightDeg', () => {
    expect(Vector2.angleRightDeg(Vector2.up)).toBeCloseTo(90);
    expect(Vector2.angleRightDeg(Vector2.one)).toBeCloseTo(45);
    expect(Vector2.angleRightDeg(Vector2.down)).toBeCloseTo(-90);
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

  it('clone', () => {
    const a = new Vector2(2, 3);
    const b = a.clone();
    a.set(0, 0);
    expectVector2ToBe(a, [0, 0]);
    expectVector2ToBe(b, [2, 3]);
  });

  it('isZeroVector', () => {
    const a = new Vector2(0, 0.0000001);
    expect(a.isZeroVector()).toBeFalsy();
    expect(a.isZeroVector(0.000001)).toBeTruthy();
  });

  it('toArray', () => {
    const a = new Vector2(2, 3);
    expect(Array.isArray(a)).toBeFalsy();
    const b = a.toArray();
    expect(Array.isArray(b)).toBeTruthy();
    expectVector2ToBe(b, [2, 3]);
  });

  it('iterator', () => {
    const a = new Vector2(2, 3);
    expectVector2ToBe([...a], [2, 3]);
    const b = new Vector2(...a);
    expectVector2ToBe(b, [2, 3]);
  });

  it('presets', () => {
    expectVector2ToBe(Vector2.zero, [0, 0]);
    expectVector2ToBe(Vector2.one, [1, 1]);
    expectVector2ToBe(Vector2.positiveInfinity, [Infinity, Infinity]);
    expectVector2ToBe(Vector2.negativeInfinity, [-Infinity, -Infinity]);

    expectVector2ToBe(Vector2.right, [1, 0]);
    expectVector2ToBe(Vector2.up, [0, 1]);
    expectVector2ToBe(Vector2.left, [-1, 0]);
    expectVector2ToBe(Vector2.down, [0, -1]);
  });
});
