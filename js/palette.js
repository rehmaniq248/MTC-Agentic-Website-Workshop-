// Builds a 256-entry RGB lookup table that blends evenly between color stops.
function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function buildPaletteLUT(colors) {
  const stops = colors.map(hexToRgb);
  const lut = new Uint8Array(768);
  for (let i = 0; i < 256; i++) {
    const pos = (i / 255) * (stops.length - 1);
    const a = Math.floor(pos);
    const b = Math.min(a + 1, stops.length - 1);
    const t = pos - a;
    for (let c = 0; c < 3; c++) {
      lut[i * 3 + c] = Math.round(stops[a][c] + (stops[b][c] - stops[a][c]) * t);
    }
  }
  return lut;
}
