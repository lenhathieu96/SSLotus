import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { AppColor } from "@utils/constant";

import Button from "@components/button";
import { modalRef } from "@components/modal/index.ref";

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
    <div className="flex flex-col gap-XXL">
      <div className="flex flex-row items-center gap-MS">
        <div className="justify-center rounded-full bg-red-100 p-MS">
          <ExclamationTriangleIcon className=" h-XL w-XL text-red-200" />
        </div>
        <div className="flex flex-col gap-XXS">
          <p className="text-h4 font-semibold">{title}</p>
          <p className="font-regular text-body2 text-gray-400">{description}</p>
        </div>
      </div>

      <div className="flex flex-row gap-S self-end">
        <Button
          color={AppColor.red[200]}
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
