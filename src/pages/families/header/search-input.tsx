import { memo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Props {
  onQueryTxtChange: (txt: string) => void;
  className?: string;
}

const SearchInputComp = ({ className, onQueryTxtChange }: Readonly<Props>) => {
  return (
    <div
      className={`flex w-1/2 flex-row items-center rounded-2xl bg-gray-100 p-MS ${className}`}
    >
      <div className="text-gray-300">
        <MagnifyingGlassIcon className="h-LS w-LS" />
      </div>
      <input
        className="ml-XS grow border-none bg-transparent focus:outline-none"
        placeholder="Nhập tên chủ hộ hoặc mã hộ"
        type="search"
        onChange={(e) => onQueryTxtChange(e.target.value)}
      />
    </div>
  );
};

const SearchInput = memo(SearchInputComp);
export default SearchInput;
