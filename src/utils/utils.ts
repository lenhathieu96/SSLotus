import { ReactNode } from "react";

import ConfirmContent, {
  ConfirmContentProps,
} from "@components/modal/confirm-content";
import { modalRef } from "@components/modal/index.ref";

import { Period } from "@models";

const Utils = {
  showConfirmModal: (props: ConfirmContentProps) => {
    modalRef.current?.show(ConfirmContent(props));
  },

  showCustomModal: (content: ReactNode) => {
    modalRef.current?.show(content);
  },

  renderPeriod: (period: Period) => {
    switch (period) {
      case "MORNING":
        return "Sáng";
      case "AFTERNOON":
        return "Chiều";
      case "NOON":
        return "Tối";
      default:
        return "Chùa Cúng";
    }
  },
};

export default Utils;
