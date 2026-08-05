import type Lenis from "lenis";

let instance: Lenis | null = null;
export const setLenis = (next: Lenis | null) => {
  instance = next;
};
export const lockScroll = () => instance?.stop();
export const unlockScroll = () => instance?.start();