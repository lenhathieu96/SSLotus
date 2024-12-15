import { useMemo, useState } from "react";

import Button from "@components/button";
import Form from "@components/form";
import { modalRef } from "@components/modal/index.ref";

interface AddFamilyContentProps {
  onAddFamily: (address: string) => void;
  defaultAddress?: string;
}

export default function AddFamilyContent({
  onAddFamily,
  defaultAddress,
}: AddFamilyContentProps) {
  const [address, setAddress] = useState<string>(defaultAddress ?? "");

  const error = useMemo(() => {
    if (address.length < 3) {
      return "Tối thiểu 3 ký tự";
    }
    if (!address.match(/(.*[a-zA-Z]){3,}.*/g)) {
      return "Địa chỉ cần có các ký tự và con số";
    }
    return "";
  }, [address]);

  return (
    <div className="flex flex-col gap-xxs">
      <p className="text-center text-h4 font-semibold">Chỉnh sửa địa chỉ</p>
      <Form.Input
        defaultValue={defaultAddress}
        error={error}
        title="Địa chỉ"
        onChange={(text) => setAddress(text)}
      />
      <div className="self-end">
        <Button
          disabled={Boolean(error)}
          label="Xác nhận"
          onClick={() => {
            modalRef.current?.hide();
            onAddFamily(address);
          }}
        />
      </div>
    </div>
  );
}
