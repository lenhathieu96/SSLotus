import { BrowserRouter } from "react-router-dom";

import Modal from "@components/modal";
import { modalRef } from "@components/modal/index.ref";

import AuthorizedRoutes from "./authorized-routes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthorizedRoutes />
      <Modal ref={modalRef} />
    </BrowserRouter>
  );
}
