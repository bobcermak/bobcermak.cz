/* eslint-disable @typescript-eslint/no-explicit-any */
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { type FC } from "react";

type LanyardCardProps = {
  cardRef: any;
  dragged: false | THREE.Vector3;
  nodes: any;
  materials: any;
  cardTexture: THREE.Texture | null;
  segmentProps: any;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onPointerUp: (event: any) => void;
  onPointerDown: (event: any) => void;
};
const LanyardCard: FC<LanyardCardProps> = ({ cardRef, dragged, nodes, materials, cardTexture, segmentProps, onPointerOver, onPointerOut, onPointerUp, onPointerDown }) => {
  return (
    <RigidBody position={[2, 0, 0]} ref={cardRef} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
      <CuboidCollider args={[0.8, 1.125, 0.01]} />
      <group scale={2.25} position={[0, -1.2, -0.05]} rotation={[0, Math.PI, 0]} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onPointerUp={onPointerUp} onPointerDown={onPointerDown}>
        <mesh geometry={nodes.card.geometry}>
          <meshPhysicalMaterial
            map={cardTexture ?? materials.base.map}
            map-anisotropy={16}
            clearcoat={1}
            clearcoatRoughness={0.35}
            roughness={0.75}
            metalness={0}
            envMapIntensity={0.5}
          />
        </mesh>
        <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3}/>
        <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
      </group>
    </RigidBody>
  );
};
export default LanyardCard;