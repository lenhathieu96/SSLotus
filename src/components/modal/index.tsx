import {
  forwardRef,
  Fragment,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";

export type ModalRef = {
  show: (content: ReactNode) => void;
  hide: () => void;
};

const Modal = forwardRef<ModalRef>((_, ref) => {
  const cancelButtonRef = useRef(null);

  const [modalContent, setModalContent] = useState<ReactNode>(null);

  useImperativeHandle(
    ref,
    () => ({
      hide: hideModal,
      show: showModal,
    }),
    [],
  );

  const hideModal = () => {
    setModalContent(undefined);
  };

  const showModal = (content: ReactNode) => {
    setModalContent(content);
  };

  return (
    <Transition.Root as={Fragment} show={Boolean(modalContent)}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={hideModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className=" fixed inset-zero bg-black-100/75  transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-zero z-10 w-screen overflow-y-auto">
          <div className=" flex min-h-full items-end justify-center p-xxxs text-center tablet:items-center tablet:p-zero">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 tablet:translate-y-0 tablet:scale-95"
              enterTo="opacity-100 translate-y-0 tablet:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 tablet:scale-100"
              leaveTo="opacity-0 translate-y-4 tablet:translate-y-0 tablet:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden rounded-2xl bg-white-100 p-m text-left shadow-xl transition-all tablet:my-xs tablet:w-full tablet:max-w-lg">
                {modalContent}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
});

Modal.displayName = "Modal";
export default Modal;
