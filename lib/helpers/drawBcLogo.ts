const INK = "#111111";
const WHITE = "#ffffff";
const ACCENTS = ["#96ace8", "#f3ccb2", "#cebeec"];
export type BcLogoVariant = "light" | "dark";
type BcLogoOptions = {
  cx: number;
  cy: number;
  scale: number;
  fontFamily: string;
  variant?: BcLogoVariant;
};
export const drawBcLogo = (
  ctx: CanvasRenderingContext2D,
  { cx, cy, scale, fontFamily, variant = "light" }: BcLogoOptions,
) => {
  const ink = variant === "dark" ? WHITE : INK;
  const dots = [...ACCENTS, ink];
  const size = 13 * scale;
  const gap = 8 * scale;
  const grid = size * 2 + gap;
  const pad = 16 * scale;
  ctx.save();
  ctx.font = `700 ${58 * scale}px ${fontFamily}`;
  ctx.letterSpacing = "-0.11em";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const label = ctx.measureText("bc").width;
  const left = cx - (label + pad + grid) / 2;
  ctx.fillStyle = ink;
  ctx.fillText("bc", left, cy);
  ctx.letterSpacing = "0px";
  dots.forEach((color, i) => {
    const dx = left + label + pad + (i % 2) * (size + gap);
    const dy = cy - grid / 2 + Math.floor(i / 2) * (size + gap);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(dx + size / 2, dy + size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
};