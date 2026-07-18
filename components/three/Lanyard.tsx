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
  mirrorX?: boolean
};
const Lanyard: FC<LanyardProps> = ({ position = [0, 0, 20], fov = 20, transparent = true, className, mirrorX = false }) => {
  // Pod tabletem (< 761px) je karta v běžném toku pod textem → kamera dál, aby se
  // vešla do užšího boxu. Čte se synchronně, aby kamera měla správnou vzdálenost
  // už při mountu (Canvas kameru za běhu nepřepočítá — proto se při změně přes
  // `key` celé plátno přemontuje).
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
  return (
    <div
      className={className ?? "relative z-0 h-full w-full"}
      style={mirrorX ? { transform: "scaleX(-1)", transformOrigin: "center" } : undefined}
    >
      <Canvas
        key={narrow ? "narrow" : "wide"}
        camera={{ position: cameraPosition, fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
          <LanyardBand />
        </Physics>
        <LanyardLights />
      </Canvas>
    </div>
  );
};
export default Lanyard;