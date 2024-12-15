// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import Button from "@components/button";
import { modalRef } from "@components/modal/index.ref";

import { AppColor } from "@utils/constant";

export type ConfirmContentProps = {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export default function ConfirmContent({
  title,
  description,
  onConfirm,
  onCancel,
}: Readonly<ConfirmContentProps>) {
  return (
    <div className="flex flex-col gap-xxl">
      <div className="flex flex-row items-center gap-m">
        <div className="bg-red-100 justify-center rounded-full p-m">
          {/* <ExclamationTriangleIcon className=" size-xl text-red-200" /> */}
        </div>
        <div className="flex flex-col gap-xxs">
          <p className="text-h4 font-semibold">{title}</p>
          <p className="text-gray-400 text-body2 font-normal">{description}</p>
        </div>
      </div>

      <div className="flex flex-row gap-s self-end">
        <Button
          color={AppColor.pallet.red20}
          label="Từ Chối"
          mode="outline"
          onClick={() => {
            modalRef.current?.hide();
            onCancel?.();
          }}
        />
        <Button
          label="Đồng Ý"
          onClick={() => {
            modalRef.current?.hide();
            onConfirm();
          }}
        />
      </div>
    </div>
  );
}
