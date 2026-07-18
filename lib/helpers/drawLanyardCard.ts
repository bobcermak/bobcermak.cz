import { drawBcLogo } from "./drawBcLogo";

const TEX = { w: 1678, h: 1677 };
const FACE = { x: 841, y: 3, w: 837, h: 1267 };
const REVERSE = { x: 1, y: 7, w: 836, h: 1259 };
const PAPER = { x: 1, y: 1000, w: 836, h: 260 };
const INK = "#111111";
const TEXT_3 = "#9a9a9a";
type Rect = { x: number; y: number; w: number; h: number };
type DrawOptions = {
  base: CanvasImageSource;
  photo: CanvasImageSource;
  name: string;
  role: string;
  site: string;
  fontFamily: string;
};
const roundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};
const sourceSize = (image: CanvasImageSource) => {
  const el = image as HTMLImageElement;
  return { w: el.naturalWidth || (el.width as number), h: el.naturalHeight || (el.height as number) };
};
const fillPaper = (ctx: CanvasRenderingContext2D, base: CanvasImageSource, rect: Rect) => {
  for (let y = rect.y; y < rect.y + rect.h; y += PAPER.h) {
    for (let x = rect.x; x < rect.x + rect.w; x += PAPER.w) {
      ctx.drawImage(base, PAPER.x, PAPER.y, PAPER.w, PAPER.h, x, y, PAPER.w, PAPER.h);
    }
  }
};
const drawCover = (ctx: CanvasRenderingContext2D, image: CanvasImageSource, rect: Rect, radius: number) => {
  const src = sourceSize(image);
  const scale = Math.max(rect.w / src.w, rect.h / src.h);
  const w = src.w * scale;
  const h = src.h * scale;
  ctx.save();
  roundedRect(ctx, rect.x, rect.y, rect.w, rect.h, radius);
  ctx.clip();
  ctx.drawImage(image, rect.x + (rect.w - w) / 2, rect.y + (rect.h - h) / 2, w, h);
  ctx.restore();
  roundedRect(ctx, rect.x, rect.y, rect.w, rect.h, radius);
  ctx.strokeStyle = "rgba(17,17,17,0.08)";
  ctx.lineWidth = 3;
  ctx.stroke();
};
const drawRole = (ctx: CanvasRenderingContext2D, cx: number, y: number, role: string, fontFamily: string) => {
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = TEXT_3;
  ctx.font = `600 30px ${fontFamily}`;
  ctx.letterSpacing = "0.14em";
  ctx.fillText(role.toUpperCase(), cx, y);
  ctx.letterSpacing = "0px";
};
const drawFace = (ctx: CanvasRenderingContext2D, { base, photo, name, fontFamily }: DrawOptions) => {
  fillPaper(ctx, base, FACE);
  const cx = FACE.x + FACE.w / 2;
  drawCover(ctx, photo, { x: FACE.x + 28, y: FACE.y + 28, w: FACE.w - 56, h: 1075 }, 40);
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = INK;
  ctx.font = `600 84px ${fontFamily}`;
  ctx.letterSpacing = "-0.02em";
  // Jméno je pod fotkou samo, tak sedí na střed zbylého pruhu.
  ctx.fillText(name, cx, FACE.y + 1214);
  ctx.letterSpacing = "0px";
};
const drawReverse = (ctx: CanvasRenderingContext2D, base: CanvasImageSource, role: string, site: string, fontFamily: string) => {
  fillPaper(ctx, base, REVERSE);
  const cx = REVERSE.x + REVERSE.w / 2;
  drawBcLogo(ctx, { cx, cy: REVERSE.y + 545, scale: 5.6, fontFamily });
  drawRole(ctx, cx, REVERSE.y + 790, role, fontFamily);
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = TEXT_3;
  ctx.font = `500 32px ${fontFamily}`;
  ctx.fillText(site, cx, REVERSE.y + 820);
};
export const drawLanyardCard = (canvas: HTMLCanvasElement, options: DrawOptions) => {
  canvas.width = TEX.w;
  canvas.height = TEX.h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(options.base, 0, 0, TEX.w, TEX.h);
  ctx.save();
  ctx.beginPath();
  ctx.rect(FACE.x, FACE.y, FACE.w, FACE.h);
  ctx.clip();
  drawFace(ctx, options);
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.rect(REVERSE.x, REVERSE.y, REVERSE.w, REVERSE.h);
  ctx.clip();
  drawReverse(ctx, options.base, options.role, options.site, options.fontFamily);
  ctx.restore();
};