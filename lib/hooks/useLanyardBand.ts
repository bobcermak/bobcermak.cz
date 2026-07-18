/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import * as THREE from "three";
import { drawLanyardCard } from "../helpers/drawLanyardCard";
import { drawLanyardBand } from "../helpers/drawLanyardBand";

const CARD_GLB = "/lanyard/card.glb";
const PROFILE_PHOTO = "/images/content/bob-profile.png";
const CARD_NAME = "Bob Čermák";
const CARD_ROLE = "Full stack developer";
const CARD_SITE = "bobcermak.cz";
const resolveFontFamily = () => {
  const family = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-montserrat-next")
    .trim();
  return family || "Montserrat, system-ui, sans-serif";
};
export const segmentProps = {
  type: "dynamic" as const,
  canSleep: true,
  colliders: false as const,
  angularDamping: 4,
  linearDamping: 4,
};
type UseLanyardBandOptions = {
  maxSpeed?: number;
  minSpeed?: number;
};
export const useLanyardBand = ({ maxSpeed = 50, minSpeed = 0 }: UseLanyardBandOptions = {}) => {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const { nodes, materials } = useGLTF(CARD_GLB) as any;
  const photoTexture = useTexture(PROFILE_PHOTO);
  const [cardTexture, setCardTexture] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    const baseMap: THREE.Texture | undefined = materials?.base?.map;
    const baseImage = baseMap?.image as CanvasImageSource | undefined;
    const photoImage = photoTexture?.image as CanvasImageSource | undefined;
    if (!baseImage || !photoImage) return;
    let cancelled = false;
    let texture: THREE.CanvasTexture | null = null;
    const fontFamily = resolveFontFamily();
    const build = async () => {
      await Promise.all(
        [`700 58px ${fontFamily}`, `600 82px ${fontFamily}`, `600 30px ${fontFamily}`, `500 32px ${fontFamily}`].map(
          (font) => document.fonts.load(font),
        ),
      ).catch(() => undefined);
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      drawLanyardCard(canvas, {
        base: baseImage,
        photo: photoImage,
        name: CARD_NAME,
        role: CARD_ROLE,
        site: CARD_SITE,
        fontFamily,
      });
      texture = new THREE.CanvasTexture(canvas);
      texture.flipY = baseMap!.flipY;
      texture.colorSpace = baseMap!.colorSpace;
      texture.anisotropy = 16;
      texture.needsUpdate = true;
      setCardTexture(texture);
    };
    build();
    return () => {
      cancelled = true;
      texture?.dispose();
    };
  }, [materials, photoTexture]);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    drawLanyardBand(canvas, resolveFontFamily());
    const nextTexture = new THREE.CanvasTexture(canvas);
    nextTexture.wrapS = nextTexture.wrapT = THREE.RepeatWrapping;
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, []);
  useEffect(() => {
    let cancelled = false;
    const fontFamily = resolveFontFamily();
    // Prvni vykresleni v useMemo mohlo padnout na fallback font — po nacteni
    // Montserratu popruh prekreslime.
    document.fonts
      .load(`700 116px ${fontFamily}`)
      .then(() => {
        if (cancelled) return;
        drawLanyardBand(texture.image as HTMLCanvasElement, fontFamily);
        texture.needsUpdate = true;
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [texture]);
  useEffect(() => () => texture.dispose(), [texture]);
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => {
    const nextCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    nextCurve.curveType = "chordal";
    return nextCurve;
  });
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);
  // Pod tabletem (< 761px): menší karta přes vzdálenější kameru (řídí Lanyard).
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);
  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);
  const handlePointerOver = () => hover(true);
  const handlePointerOut = () => hover(false);
  const handlePointerUp = (event: any) => {
    event.target.releasePointerCapture(event.pointerId);
    drag(false);
  };
  const handlePointerDown = (event: any) => {
    event.target.setPointerCapture(event.pointerId);
    drag(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current!.translation() as any)));
  };
  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        const r = ref.current as any;
        if (!r.lerped) r.lerped = new THREE.Vector3().copy(r.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, r.lerped.distanceTo(r.translation())));
        r.lerped.lerp(r.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current!.translation() as any);
      curve.points[1].copy((j2.current as any).lerped);
      curve.points[2].copy((j1.current as any).lerped);
      curve.points[3].copy(fixed.current.translation() as any);
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current!.angvel() as any);
      rot.copy(card.current!.rotation() as any);
      card.current!.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, false);
    }
  });
  return {
    band,
    card,
    fixed,
    j1,
    j2,
    j3,
    dragged,
    texture,
    cardTexture,
    width,
    height,
    nodes,
    materials,
    narrow,
    handlePointerOver,
    handlePointerOut,
    handlePointerUp,
    handlePointerDown,
  };
};