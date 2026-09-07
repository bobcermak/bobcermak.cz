export const STAGE_PIN_ATTR = "data-stage-pin";
const REDUCED_MQ = "(prefers-reduced-motion: reduce)";
export const STAGE_PIN_MIN_HEIGHT = 600;
export const measureStageHeight = () => {
  const probe = document.createElement("div");
  probe.style.cssText = "position:absolute;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none";
  document.documentElement.appendChild(probe);
  const height = probe.offsetHeight;
  probe.remove();
  return height > 0 ? height : window.innerHeight;
};
export const stagePinActive = () =>
  !window.matchMedia(REDUCED_MQ).matches && measureStageHeight() >= STAGE_PIN_MIN_HEIGHT;
export const readStagePin = () => document.documentElement.getAttribute(STAGE_PIN_ATTR) === "on";
export const syncStagePin = () => {
  const active = stagePinActive();
  document.documentElement.setAttribute(STAGE_PIN_ATTR, active ? "on" : "off");
  return active;
};
export const STAGE_PIN_SCRIPT = `(function(){var e=document.documentElement;try{var p=document.createElement("div");p.style.cssText="position:absolute;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none";e.appendChild(p);var h=p.offsetHeight;p.remove();if(!h)h=window.innerHeight;var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.setAttribute("${STAGE_PIN_ATTR}",!r&&h>=${STAGE_PIN_MIN_HEIGHT}?"on":"off")}catch(_){e.setAttribute("${STAGE_PIN_ATTR}","off")}})();`;
type Listener = (active: boolean) => void;
let listeners: Listener[] = [];
let timer = 0;
let detach: (() => void) | null = null;
const notify = () => {
  timer = 0;
  const active = syncStagePin();
  listeners.forEach((listener) => listener(active));
};
const schedule = () => {
  if (timer) window.clearTimeout(timer);
  timer = window.setTimeout(notify, 150);
};
export const onStagePinChange = (listener: Listener) => {
  listeners.push(listener);
  if (!detach) {
    syncStagePin();
    const reduced = window.matchMedia(REDUCED_MQ);
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
    reduced.addEventListener("change", schedule);
    detach = () => {
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }
  return () => {
    listeners = listeners.filter((item) => item !== listener);
    if (listeners.length || !detach) return;
    if (timer) window.clearTimeout(timer);
    timer = 0;
    detach();
    detach = null;
  };
};