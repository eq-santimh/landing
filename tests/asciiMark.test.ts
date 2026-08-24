import assert from 'node:assert/strict';
import {
  buildAsciiDots,
  inBlueFacet,
  inCorePlay,
  inIsotipoMark,
  inTealFacet,
  pointInTriangle,
} from '../lib/asciiMark.ts';

export function runAsciiMarkTests() {
  assert.equal(pointInTriangle(0.5, 0.25, 0, 0, 1, 0, 1, 1), true);
  assert.equal(pointInTriangle(0.1, 0.8, 0, 0, 1, 0, 1, 1), false);

  assert.equal(inIsotipoMark(1, 0), true, 'top-right corner is inside the mark');
  assert.equal(inIsotipoMark(1, 1), true, 'bottom-right corner is inside the mark');
  assert.equal(inIsotipoMark(0, 0), true, 'top-left sits on the hypotenuse');
  assert.equal(inIsotipoMark(0, 1), false, 'bottom-left is outside the mark');

  assert.equal(inTealFacet(0.5, 0.08), true);
  assert.equal(inBlueFacet(0.96, 0.8), true);
  assert.equal(inCorePlay(0.55, 0.31), true);
  assert.equal(inCorePlay(0.2, 0.2), false);

  const dots = buildAsciiDots({ cols: 20, rows: 20, size: 120, padding: 8 });
  assert.ok(dots.length > 40, 'builds a visible grid');
  assert.equal(
    dots.every((dot) => inIsotipoMark((dot.cx - 8) / 104, (dot.cy - 8) / 104)),
    true,
    'every plotted dot sits inside the isotipo triangle',
  );
  assert.ok(dots.some((dot) => dot.inCore), 'includes the dense play triangle');
  assert.ok(dots.some((dot) => dot.onSeam), 'includes the facet seam');
  assert.ok(dots.some((dot) => dot.oddRow), 'keeps scanline rows');
}
