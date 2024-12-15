import { InstantSearch } from "react-instantsearch";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Modal from "@components/modal";
import { modalRef } from "@components/modal/index.ref";

import { SEARCH_CLIENT } from "@utils/constant";

import "react-toastify/dist/ReactToastify.css";

import AuthorizedRoutes from "./authorized-routes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <InstantSearch
        insights
        routing
        indexName={import.meta.env.VITE_ALGOLIA_INDEX_NAME}
        searchClient={SEARCH_CLIENT}
      >
        <AuthorizedRoutes />
      </InstantSearch>

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
