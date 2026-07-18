import { drawBcLogo } from "./drawBcLogo";

const BAND = { w: 1025, h: 250 };
const BACKGROUND = "#000000";
export const drawLanyardBand = (canvas: HTMLCanvasElement, fontFamily: string) => {
  canvas.width = BAND.w;
  canvas.height = BAND.h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, BAND.w, BAND.h);
  drawBcLogo(ctx, { cx: BAND.w / 2, cy: BAND.h / 2, scale: 2, fontFamily, variant: "dark" });
};