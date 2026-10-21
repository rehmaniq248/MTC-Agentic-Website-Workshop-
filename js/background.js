// Grain-gradient background, replicating the canvas on mtcatucsd.org in Lakers colors.
// A low-res, domain-warped noise field is colored through a palette, blurred
// heavily, then overlaid with fine grain.
import { buildPaletteLUT } from './palette.js';
import { createNoise3D } from './noise.js';

const DEFAULTS = {
  colors: ['#05020A', '#1A0B2E', '#552583', '#D9C27A'],
  amplitude: 60,
  scale: 820,
  speed: 0.18,
  grain: 0.9,
  resolution: 8,
  fpsCap: 30,
  opacity: 0.8,
  blur: 120,
};

const clamp01 = (v) => Math.max(0, Math.min(1, v));

export function startBackground(canvas, opts = {}) {
  const o = { ...DEFAULTS, ...opts };
  const ctx = canvas.getContext('2d');
  const lut = buildPaletteLUT(o.colors);
  const noise = createNoise3D(12345);
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  canvas.style.opacity = o.opacity;

  let cell, pad, cols, rows, field, fieldCtx, fieldImg, grainCanvas, grainCtx;

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    cell = Math.max(1, Math.floor(o.resolution * dpr));
    pad = Math.ceil(o.blur * dpr); // over-scan so the blur has no hard edges
    cols = Math.ceil((canvas.width + 2 * pad) / cell);
    rows = Math.ceil((canvas.height + 2 * pad) / cell);
    field = document.createElement('canvas');
    field.width = cols;
    field.height = rows;
    fieldCtx = field.getContext('2d', { willReadFrequently: true });
    fieldImg = fieldCtx.createImageData(cols, rows);
    grainCanvas = null;
  }

  function drawField(now) {
    const t = now * 0.001 * o.speed;
    const inv = 1 / (o.scale * dpr);
    const d = fieldImg.data;
    let i = 0;
    for (let r = 0; r < rows; r++) {
      const py = r * cell - pad;
      const ny = py * inv;
      for (let c = 0; c < cols; c++) {
        const px = c * cell - pad;
        const nx = px * inv;
        // Domain warp: two noise lookups push the coordinates of a third.
        const wx = noise(0.6 * nx + 5.2, 0.6 * ny + 1.3, t) * o.amplitude;
        const wy = noise(0.6 * nx - 3.1, 0.6 * ny + 7.7, 0.9 * t) * o.amplitude;
        const v =
          0.9 * noise((px + wx) * inv, (py + wy) * inv, 1.2 * t) +
          o.grain * noise(nx * 3 + 12.3, ny * 3 - 4.56, 1.7 * t);
        const idx = 3 * ((255 * clamp01(0.5 + 0.5 * v)) | 0);
        d[i++] = lut[idx];
        d[i++] = lut[idx + 1];
        d[i++] = lut[idx + 2];
        d[i++] = 255;
      }
    }
    fieldCtx.putImageData(fieldImg, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = `blur(${o.blur}px)`;
    ctx.drawImage(field, 0, 0, cols, rows, -pad, -pad, cols * cell, rows * cell);
    ctx.filter = 'none';
  }

  function drawGrain(now) {
    const gw = Math.ceil(canvas.width / 2);
    const gh = Math.ceil(canvas.height / 2);
    if (!grainCanvas) {
      grainCanvas = document.createElement('canvas');
      grainCanvas.width = gw;
      grainCanvas.height = gh;
      grainCtx = grainCanvas.getContext('2d', { willReadFrequently: true });
    }
    const img = grainCtx.createImageData(gw, gh);
    const d = img.data;
    const alpha = Math.floor(255 * clamp01(o.grain) * 0.35);
    const z = now * 0.0008;
    let i = 0;
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        const g = Math.floor(128 + 127 * noise(0.9 * x, 0.9 * y, z));
        d[i++] = g;
        d[i++] = g;
        d[i++] = g;
        d[i++] = alpha;
      }
    }
    grainCtx.putImageData(img, 0, 0);
    ctx.globalCompositeOperation = 'overlay';
    ctx.drawImage(grainCanvas, 0, 0, gw, gh, 0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
  }

  function render(now) {
    drawField(now);
    if (o.grain > 0) drawGrain(now);
  }

  let raf = 0;
  let last = 0;
  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (now - last < 1000 / o.fpsCap) return;
    last = now;
    render(now);
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function onVisibility() {
    cancelAnimationFrame(raf);
    if (!document.hidden) raf = requestAnimationFrame(loop);
  }
  function onResize() {
    resize();
    if (reducedMotion) render(performance.now());
  }

  resize();
  window.addEventListener('resize', onResize);
  if (reducedMotion) {
    render(performance.now()); // one still frame
  } else {
    raf = requestAnimationFrame(loop);
    document.addEventListener('visibilitychange', onVisibility);
  }

  return function stop() {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibility);
  };
}
