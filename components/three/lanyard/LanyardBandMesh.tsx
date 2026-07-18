/*eslint-disable*/
type LanyardBandMeshProps = {
  bandRef: any;
  texture: any;
  width: number;
  height: number;
};
// Pozn.: `resolution` NEODVOZUJEME z živé velikosti plátna. Na širokém desktop
// plátně (w-[145%], poměr ~2.3) meshline zdegeneruje do trojúhelníku — stejný
// artefakt jako v originálu, když se předhodí extrémní poměr stran. Držíme proto
// pevné čtvercové rozlišení + lineWidth=1 přesně jako referenční Lanyard.
const LanyardBandMesh = ({ bandRef, texture }: LanyardBandMeshProps) => {
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
        lineWidth={1}
      />
    </mesh>
  );
};
export default LanyardBandMesh;