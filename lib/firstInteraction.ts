const EVENTS = ["pointerdown", "pointermove", "touchstart", "wheel", "keydown", "scroll"] as const;
let engaged = false;
let listeners: (() => void)[] = [];
const fire = () => {
  if (engaged) return;
  engaged = true;
  EVENTS.forEach((event) => window.removeEventListener(event, fire, true));
  const pending = listeners;
  listeners = [];
  pending.forEach((listener) => listener());
};
let attached = false;
const attach = () => {
  if (attached) return;
  attached = true;
  if (window.scrollY > 0 || window.location.hash) {
    fire();
    return;
  }
  EVENTS.forEach((event) => window.addEventListener(event, fire, { capture: true, passive: true }));
};
export const onFirstInteraction = (listener: () => void) => {
  attach();
  if (engaged) {
    listener();
    return () => {};
  }
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((item) => item !== listener);
  };
};