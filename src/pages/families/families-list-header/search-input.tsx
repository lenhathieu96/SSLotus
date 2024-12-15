import { ChangeEvent, memo } from "react";
import { Input } from "antd";

import { Search } from "@assets/svgs";

interface Props {
  onQueryTxtChange: (txt: string) => void;
  className?: string;
}

const SearchInput = ({ onQueryTxtChange }: Readonly<Props>) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQueryTxtChange(e.target.value);
  };

  return (
    <Input
      allowClear
      className="max-w-[40vw] !border-none !bg-pallet-gray10 !shadow-none focus:!border-none focus:!ring-0"
      placeholder="Nhập địa chỉ nhà hoặc mã hộ"
      prefix={<Search className="size-ls stroke-pallet-gray30" />}
      size="large"
      onChange={handleInputChange}
    />
  );
};

export default memo(SearchInput);
