import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Modal from "@components/modal";
import { modalRef } from "@components/modal/index.ref";

import "react-toastify/dist/ReactToastify.css";

import AuthorizedRoutes from "./authorized-routes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthorizedRoutes />

      <Modal ref={modalRef} />
      <ToastContainer
        hideProgressBar
        autoClose={3000}
        closeButton={false}
        position="top-right"
      />
    </BrowserRouter>
  );
}
