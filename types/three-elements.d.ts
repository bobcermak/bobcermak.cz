import type { ThreeElement } from "@react-three/fiber";
import type { MeshLineGeometry, MeshLineMaterial } from "meshline";

type ArgsOptional<T> = Omit<T, "args"> & Partial<Pick<T, "args" & keyof T>>;
declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ArgsOptional<ThreeElement<typeof MeshLineMaterial>>;
  }
}