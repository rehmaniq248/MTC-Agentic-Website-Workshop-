import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPaletteLUT } from '../js/palette.js';

test('palette LUT has 256 RGB entries blending from first to last stop', () => {
  const lut = buildPaletteLUT(['#000000', '#ffffff']);
  assert.equal(lut.length, 768);
  assert.deepEqual([...lut.slice(0, 3)], [0, 0, 0]);
  assert.deepEqual([...lut.slice(765)], [255, 255, 255]);
});

test('a single-color palette fills every entry with that color', () => {
  const lut = buildPaletteLUT(['#552583']);
  for (let i = 0; i < 768; i += 3) assert.deepEqual([...lut.slice(i, i + 3)], [85, 37, 131]);
});
