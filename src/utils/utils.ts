import { ReactNode } from "react";

import ConfirmContent, {
  ConfirmContentProps,
} from "@components/modal/confirm-content";
import { modalRef } from "@components/modal/index.ref";

const Utils = {
  showConfirmModal: (props: ConfirmContentProps) => {
    modalRef.current?.show(ConfirmContent(props));
  },

  showBlankModal: (content: ReactNode) => {
    modalRef.current?.show(content);
  },
};

export default Utils;
