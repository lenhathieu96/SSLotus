import { memo } from "react";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Props {
  onQueryTxtChange: (txt: string) => void;
  className?: string;
}

const SearchInputComp = ({ className, onQueryTxtChange }: Readonly<Props>) => {
  return (
    <div
      className={`bg-gray-100 flex w-1/2 flex-row items-center rounded-2xl p-m ${className}`}
    >
      <div className="text-gray-300">
        {/* <MagnifyingGlassIcon className="size-ls" /> */}
      </div>
      <input
        className="ml-xs grow border-none bg-transparent text-body1 font-normal focus:outline-none"
        placeholder="Nhập địa chỉ nhà hoặc mã hộ"
        type="search"
        onChange={(e) => onQueryTxtChange(e.target.value)}
      />
    </div>
  );
};

const SearchInput = memo(SearchInputComp);
export default SearchInput;
