import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createNoise3D } from '../js/noise.js';

test('same seed gives the same noise', () => {
  assert.equal(createNoise3D(12345)(0.3, 1.7, 2.1), createNoise3D(12345)(0.3, 1.7, 2.1));
});

test('different seeds give different noise', () => {
  assert.notEqual(createNoise3D(1)(0.3, 1.7, 2.1), createNoise3D(2)(0.3, 1.7, 2.1));
});

test('noise stays within [-1, 1]', () => {
  const noise = createNoise3D(7);
  for (let i = 0; i < 1000; i++) {
    const v = noise(Math.random() * 100, Math.random() * 100, Math.random() * 100);
    assert.ok(v >= -1 && v <= 1, `out of range: ${v}`);
  }
});
