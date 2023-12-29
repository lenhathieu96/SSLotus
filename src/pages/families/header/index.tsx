import { memo } from "react";
import equals from "react-fast-compare";
import { PlusIcon } from "@heroicons/react/24/outline";
import { debounce } from "lodash";

import Button from "@components/button";

import { Family } from "@models";

import SearchInput from "./search-input";

interface Props {
  onAddNewFamily: (family: Family) => void;
  onSearchFamilies: (query: string) => void;
}

const FamiliesHeaderComp = ({ onAddNewFamily, onSearchFamilies }: Props) => {
  const onPressAddFamily = () => {
    // onAddNewFamily({})
  };

  return (
    <div className="flex w-full flex-row items-center justify-between rounded-2xl bg-white-100 p-XS">
      <SearchInput onQueryTxtChange={debounce(onSearchFamilies, 1000)} />
      <div>
        <Button
          label="Thêm hộ mới"
          leading={<PlusIcon className="h-L w-L stroke-2" />}
          onClick={onPressAddFamily}
        />
      </div>
    </div>
  );
};

const FamiliesHeader = memo(FamiliesHeaderComp, equals);
export default FamiliesHeader;
