"use client";

import dynamic from "next/dynamic";
import { Component, Suspense, type ReactNode } from "react";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });
type Vec3 = [number, number, number];
type LanyardSceneProps = {
  position?: Vec3,
  gravity?: Vec3,
  fov?: number,
  transparent?: boolean,
  className?: string,
  mirrorX?: boolean,
  offsetX?: number,
  bandWidth?: number | { mobile?: number; desktop?: number },
  bandLength?: number,
  fallback?: ReactNode
};
class SceneBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}
const LanyardScene = ({ fallback = null, className, mirrorX = false, ...props }: LanyardSceneProps) => {
  return (
    <SceneBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <Lanyard className={className} mirrorX={mirrorX} {...props} />
      </Suspense>
    </SceneBoundary>
  );
};
export default LanyardScene;