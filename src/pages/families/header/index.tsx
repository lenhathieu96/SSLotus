import { memo } from "react";
import equals from "react-fast-compare";
import { useSearchBox } from "react-instantsearch";
import { PlusIcon } from "@heroicons/react/24/outline";
import { debounce } from "lodash";

import Button from "@components/button";

import SearchInput from "./search-input";

interface Props {
  enableAddNewFamily: boolean;
  onAddNewFamily: () => void;
  onClearQueryTxt?: () => void;
  onStartSearching: () => void;
}

const FamiliesHeaderComp = ({
  enableAddNewFamily,
  onAddNewFamily,
  onClearQueryTxt,
  onStartSearching,
}: Props) => {
  const { refine, clear } = useSearchBox();

  const searchFamilies = (queryTxt: string) => {
    if (!queryTxt) {
      clear();
      onClearQueryTxt?.();
      return;
    }
    if (queryTxt.length < 3) {
      return;
    }
    onStartSearching();
    return refine(queryTxt);
  };

  return (
    <div className="flex w-full flex-row items-center justify-between rounded-2xl bg-white-100 p-XS">
      <SearchInput onQueryTxtChange={debounce(searchFamilies, 1000)} />
      <div>
        <Button
          disabled={!enableAddNewFamily}
          label="Thêm hộ mới"
          leading={
            <PlusIcon
              className={"h-XL w-XL text-white-100 desktop:h-XXL desktop:w-XXL"}
              strokeWidth={2}
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
