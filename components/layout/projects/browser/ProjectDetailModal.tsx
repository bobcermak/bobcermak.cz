"use client";

import type { FC, ReactNode } from "react";
import Modal from "@/components/overlays/Modal";
import { GROUP_ACCENT } from "./groupAccent";
import type { GroupAccent } from "@/types/projectCatalog";

type ProjectDetailModalProps = {
  detail: ReactNode;
  accent: GroupAccent;
  onClose: () => void;
};
const ProjectDetailModal: FC<ProjectDetailModalProps> = ({ detail, accent, onClose }) => {
  if (!detail) return null;
  return (
    <Modal
      open
      onClose={onClose}
      labelledBy="project-detail-title"
      accentClass={GROUP_ACCENT[accent].bg}
      wide
    >
      {detail}
    </Modal>
  );
};
export default ProjectDetailModal;