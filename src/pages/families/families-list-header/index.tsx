import { FC, memo } from "react";
import equals from "react-fast-compare";
import { useSearchBox } from "react-instantsearch";
import { PlusIcon } from "@heroicons/react/24/outline";
import { debounce } from "lodash";

import Button from "@components/button";

import { FamilyListHeaderProps } from "../index.props";

import SearchInput from "./search-input";

const FamiliesListHeaderProps: FC<FamilyListHeaderProps> = ({
  enableAddNewFamily,
  onAddNewFamily,
  onClearQueryTxt,
  onStartSearching,
}) => {
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

  // const onAddFamilyWithId = async () => {
  //   try {
  // const extractor = new WordExtractor();
  // const files = await fs.readdir(FOLDER_PATH);
  // const docFiles = files.filter((file) => file.endsWith(".doc"));
  // const extracted = await extractor.extract(
  //   `${FOLDER_PATH}/${docFiles[0]}`,
  // );
  // const data = extracted._body.replace(/\t{2,}/g, "") as string;
  // const chunkData = data.split(/\n/g).filter((item) => item);
  // console.log(chunkData);
  // for (const file in docfiles) {
  // }
  // await FamilyService.addFamilyWithId({
  //   id: 3220,
  //   address: "XÓM 4 - TỔ DÂN PHỐ NGHĨA BÌNH - P.CAM NGHĨA - CAM RANH",
  //   members: [{ christineName: "THỌ NGHĨA", fullName: "NGUYỄN THỊ TÍM" }],
  // });
  // const data = await FamilyService.getAllFamilies();
  // const idList = data
  //   .map((item) => item.id)
  //   .filter((idItem) => idItem < 1700000000);
  // const jsonData = JSON.stringify(idList);
  // await fs.writeFile("data.json", jsonData);
  // console.log("get all families completed");
  //   } catch (error) {
  //     console.log("Error on add family with id");
  //   }
  // };

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

export default memo(FamiliesListHeaderProps, equals);
