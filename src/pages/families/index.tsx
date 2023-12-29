import { useCallback, useEffect, useState } from "react";

import RootView from "@components/root-view";

import { Family } from "@models";
import { FamilyService } from "@services";

import FamilyDetail from "./family-detail";
import FamilyOverView from "./family-overview";
import FamiliesHeader from "./header";

export default function FamiliesPage() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [currentFamily, setCurrentFamily] = useState<Family | undefined>();

  const onSearchFamilies = useCallback(async (char: string) => {
    const data = await FamilyService.searchFamily(char);
    setFamilies(data);
  }, []);

  const onAddNewFamily = () => {
    console.log("add new family");
  };

  const onCloseFamilyDetail = useCallback(() => {
    setCurrentFamily(undefined);
  }, []);

  const onSeeFamilyDetail = useCallback(
    (id: number) => {
      setCurrentFamily(families.find((family) => family.id === id));
    },
    [families],
  );

  useEffect(() => {
    if (families.length === 0) {
      setCurrentFamily(undefined);
    }
  }, [families.length]);

  return (
    <RootView className="flex h-full flex-col items-start gap-XS py-XXS">
      <FamiliesHeader
        onAddNewFamily={onAddNewFamily}
        onSearchFamilies={onSearchFamilies}
      />

      <div className="flex h-full w-full flex-row gap-MS overflow-hidden">
        <div
          className={`${
            currentFamily ? "w-2/5" : "w-full"
          }  overflow-x-hidden overflow-y-scroll rounded-2xl bg-white-100 pl-XXS pt-XXS transition-all duration-500`}
        >
          {families.map((family, index) => (
            <FamilyOverView
              key={family.id}
              className={`${index === 0 ? "" : "mt-XS"}`}
              data={family}
              isSelected={family.id === currentFamily?.id}
              onClick={onSeeFamilyDetail}
            />
          ))}
        </div>

        {currentFamily && (
          <div className="grow rounded-2xl  bg-white-100 p-XS transition-all duration-500">
            <FamilyDetail data={currentFamily} onClose={onCloseFamilyDetail} />
          </div>
        )}
      </div>
    </RootView>
  );
}
