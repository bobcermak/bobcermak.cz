import Image from "next/image";
import { ImageIcon } from "@phosphor-icons/react/ssr";

type ProjectImageProps = {
  src?: string;
  title: string;
  sizes: string;
  fit?: "cover" | "contain";
};
const ProjectImage = ({ src, title, sizes, fit = "cover" }: ProjectImageProps) => {
  if (src) {
    return (
      <Image
        src={src}
        alt={title}
        fill
        sizes={sizes}
        quality={100}
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    );
  }
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
      <ImageIcon size={30} className="text-text-3"/>
      <span className="text-[13px] font-medium text-text-2">Screenshot — {title}</span>
    </div>
  );
};
export default ProjectImage;