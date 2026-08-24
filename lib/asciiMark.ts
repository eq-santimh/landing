export type AsciiDot = {
  cx: number;
  cy: number;
  r: number;
  row: number;
  col: number;
  inCore: boolean;
  inTeal: boolean;
  inBlue: boolean;
  onSeam: boolean;
  oddRow: boolean;
};

const EPS = 1e-6;

export function pointInTriangle(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
) {
  const v0x = cx - ax;
  const v0y = cy - ay;
  const v1x = bx - ax;
  const v1y = by - ay;
  const v2x = px - ax;
  const v2y = py - ay;
  const dot00 = v0x * v0x + v0y * v0y;
  const dot01 = v0x * v1x + v0y * v1y;
  const dot02 = v0x * v2x + v0y * v2y;
  const dot11 = v1x * v1x + v1y * v1y;
  const dot12 = v1x * v2x + v1y * v2y;
  const denom = dot00 * dot11 - dot01 * dot01;
  if (Math.abs(denom) < EPS) return false;
  const inv = 1 / denom;
  const u = (dot11 * dot02 - dot01 * dot12) * inv;
  const v = (dot00 * dot12 - dot01 * dot02) * inv;
  return u >= -EPS && v >= -EPS && u + v <= 1 + EPS;
}

/** Equitty isotipo: right triangle with the right angle at the top-right. */
export function inIsotipoMark(u: number, v: number) {
  return u + EPS >= v;
}

export function inTealFacet(u: number, v: number) {
  return pointInTriangle(u, v, 0, 0, 1, 0, 0.58, 0.58);
}

export function inBlueFacet(u: number, v: number) {
  return pointInTriangle(u, v, 1, 0, 1, 1, 0.58, 0.58);
}

/** Inner right-pointing triangle used as the dense "play" core in the ASCII studies. */
export function inCorePlay(u: number, v: number) {
  return pointInTriangle(u, v, 0.34, 0.08, 0.34, 0.54, 0.9, 0.31);
}

export function onFacetSeam(u: number, v: number) {
  if (!inIsotipoMark(u, v)) return false;
  return Math.abs(u - v) < 0.05 && u > 0.12 && u < 0.78;
}

export function buildAsciiDots({
  cols = 38,
  rows = 38,
  size = 120,
  padding = 8,
}: {
  cols?: number;
  rows?: number;
  size?: number;
  padding?: number;
} = {}): AsciiDot[] {
  const inner = size - padding * 2;
  const dots: AsciiDot[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const u = cols === 1 ? 0.5 : col / (cols - 1);
      const v = rows === 1 ? 0.5 : row / (rows - 1);
      if (!inIsotipoMark(u, v)) continue;

      const along = (u + v) / 2;
      const tipScale = along > 0.72 ? Math.max(0.28, 1 - (along - 0.72) / 0.4) : 1;
      const core = inCorePlay(u, v);
      const teal = inTealFacet(u, v);
      const r = (core ? 1.55 : teal ? 1.2 : 0.72) * tipScale;

      dots.push({
        cx: padding + u * inner,
        cy: padding + v * inner,
        r,
        row,
        col,
        inCore: core,
        inTeal: teal,
        inBlue: inBlueFacet(u, v),
        onSeam: onFacetSeam(u, v),
        oddRow: row % 2 === 1,
      });
    }
  }

  return dots;
}
