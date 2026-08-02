/*eslint-disable*/
type LanyardBandMeshProps = {
  bandRef: any;
  texture: any;
  width: number;
  height: number;
  lineWidth?: number;
};
const LanyardBandMesh = ({ bandRef, texture, lineWidth = 1 }: LanyardBandMeshProps) => {
  return (
    <mesh ref={bandRef}>
      <meshLineGeometry />
      <meshLineMaterial
        color="white"
        depthTest={false}
        resolution={[1000, 1000]}
        useMap={1}
        map={texture}
        repeat={[-4, 1]}
        lineWidth={lineWidth}
      />
    </mesh>
  );
};
export default LanyardBandMesh;