"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { type FC, useEffect, useState } from "react";
import { extend } from "@react-three/fiber";
import LanyardLights from "./LanyardLights";
import LanyardBand from "./lanyard/LanyardBand";

extend({ MeshLineGeometry, MeshLineMaterial });
type Vec3 = [number, number, number];
type LanyardProps = {
  position?: Vec3,
  fov?: number,
  transparent?: boolean,
  className?: string,
  mirrorX?: boolean,
  offsetX?: number,
  bandWidth?: number | { mobile?: number; desktop?: number },
  bandLength?: number,
  active?: boolean
};
const DPR: [number, number] = [1, 1.5];
const Lanyard: FC<LanyardProps> = ({ position = [0, 0, 20], fov = 20, transparent = true, className, mirrorX = false, offsetX = 0, bandWidth, bandLength = 1, active = true }) => {
  const [narrow, setNarrow] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const cameraPosition: Vec3 = narrow ? [position[0], position[1], position[2] * 1.25] : position;
  const resolvedBandWidth =
    typeof bandWidth === "object"
      ? (narrow ? bandWidth.mobile : bandWidth.desktop) ?? (narrow ? 3 : 1)
      : bandWidth ?? (narrow ? 3 : 1);
  return (
    <div
      className={className ?? "relative z-0 h-full w-full"}
      style={mirrorX ? { transform: "scaleX(-1)", transformOrigin: "center" } : undefined}
    >
      <Canvas
        key={`${offsetX}|${bandLength}|${resolvedBandWidth}|${cameraPosition.join(",")}`}
        camera={{ position: cameraPosition, fov }}
        dpr={DPR}
        frameloop={active ? "always" : "never"}
        gl={{ alpha: transparent, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
          <LanyardBand offsetX={offsetX} bandWidth={resolvedBandWidth} bandLength={bandLength} />
        </Physics>
        <LanyardLights />
      </Canvas>
    </div>
  );
};
export default Lanyard;