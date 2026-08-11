"use client";

import { useState, type FC, type ReactNode } from "react";
import Modal from "@/components/overlays/Modal";
import { GROUP_ACCENT } from "./groupAccent";
import type { GroupAccent } from "@/types/projectCatalog";

type ProjectDetailModalProps = {
  detail: ReactNode;
  accent: GroupAccent;
  onClose: () => void;
};
const ProjectDetailModal: FC<ProjectDetailModalProps> = ({ detail, accent, onClose }) => {
  //Hooks
  const [shown, setShown] = useState<{ detail: ReactNode; accent: GroupAccent } | null>(null);

  if (detail && detail !== shown?.detail) setShown({ detail, accent });
  if (!shown) return null;
  return (
    <Modal
      open={!!detail}
      onClose={onClose}
      labelledBy="project-detail-title"
      accentClass={GROUP_ACCENT[shown.accent].bg}
      wide
    >
      {shown.detail}
    </Modal>
  );
};
export default ProjectDetailModal;