import { memo } from "react";
import equals from "react-fast-compare";
import { PlusIcon } from "@heroicons/react/24/outline";
import { debounce } from "lodash";

import Button from "@components/button";

import SearchInput from "./search-input";

interface Props {
  enableAddNewFamily: boolean;
  onAddNewFamily: () => void;
  onSearchFamilies: (query: string) => void;
}

const FamiliesHeaderComp = ({
  enableAddNewFamily,
  onAddNewFamily,
  onSearchFamilies,
}: Props) => {
  return (
    <div className="flex w-full flex-row items-center justify-between rounded-2xl bg-white-100 p-XS">
      <SearchInput onQueryTxtChange={debounce(onSearchFamilies, 1000)} />
      <div>
        <Button
          disabled={!enableAddNewFamily}
          label="Thêm hộ mới"
          leading={
            <PlusIcon
              strokeWidth={2}
              className={
                " h-XL w-XL text-white-100 desktop:h-XXL desktop:w-XXL"
              }
            />
          }
          onClick={onAddNewFamily}
        />
      </div>
    </div>
  );
};

const FamiliesHeader = memo(FamiliesHeaderComp, equals);
export default FamiliesHeader;
