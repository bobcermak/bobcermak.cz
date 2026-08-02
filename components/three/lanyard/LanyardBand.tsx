import { BallCollider, RigidBody } from "@react-three/rapier";
import LanyardCard from "../LanyardCard";
import LanyardBandMesh from "./LanyardBandMesh";
import { segmentProps, useLanyardBand } from "../../../lib/hooks/useLanyardBand";

type LanyardBandProps = {
  offsetX?: number;
  bandWidth?: number;
  bandLength?: number;
};
const LanyardBand = ({ offsetX = 0, bandWidth = 1, bandLength = 1 }: LanyardBandProps) => {
  const {
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
    handlePointerOver,
    handlePointerOut,
    handlePointerUp,
    handlePointerDown,
  } = useLanyardBand({ segmentLength: bandLength });
  return (
    <>
      <group position={[offsetX, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <LanyardCard
          cardRef={card}
          dragged={dragged}
          nodes={nodes}
          materials={materials}
          cardTexture={cardTexture}
          segmentProps={segmentProps}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onPointerUp={handlePointerUp}
          onPointerDown={handlePointerDown}
        />
      </group>
      <LanyardBandMesh bandRef={band} texture={texture} width={width} height={height} lineWidth={bandWidth} />
    </>
  );
};
export default LanyardBand;