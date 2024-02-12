import { useCallback, useEffect, useMemo, useState } from "react";
import { useHits } from "react-instantsearch";
import { toast } from "react-toastify";
import Utils from "@utils/utils";

import AddFamilyContent from "@components/modal/add-family-content";
import RootView from "@components/root-view";

import { Family, Person } from "@models";
import { FamilyService } from "@services";

import FamilyDetail from "./family-detail";
import FamilyOverView from "./family-overview";
import FamiliesHeader from "./header";

export default function FamiliesPage() {
  const [currentFamily, setCurrentFamily] = useState<Family | undefined>();
  const { hits } = useHits();

  const families: Family[] = useMemo(
    () =>
      hits.map(
        (item) =>
          ({
            id: parseInt(item.objectID, 10),
            address: item.address as string,
            members: (item.members as Person[]) ?? [],
          }) satisfies Family,
      ),
    [hits],
  );

  const onUpdateFamilyDetail = (family: Family) => {
    toast.promise(FamilyService.updateFamilyProfile(family), {
      error: {
        render() {
          return "Cập nhập thất bại";
        },
        type: "error",
        theme: "colored",
      },
      success: {
        render() {
          setCurrentFamily(family);
          return "Cập nhập thành công";
        },
        type: "success",
        theme: "colored",
      },
    });
  };

  const onAddFamily = (address: string) => {
    const tempFamily: Family = {
      id: -1,
      address,
      members: [],
    };
    setCurrentFamily(tempFamily);
  };

  const onPressAddNewFamily = () => {
    Utils.showCustomModal(<AddFamilyContent onAddFamily={onAddFamily} />);
  };

  const onCloseFamilyDetail = useCallback(() => {
    // if (currentFamily?.id === -1) {
    //   setQueryTxt("");
    // }
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
        enableAddNewFamily={currentFamily?.id !== -1}
        onAddNewFamily={onPressAddNewFamily}
      />

      <div className="flex h-full w-full flex-row gap-MS overflow-hidden">
        <div
          className={`${
            currentFamily ? "w-2/5" : "w-full"
          }  no-scrollbar overflow-x-hidden overflow-y-scroll rounded-2xl pl-XXS pt-XXS transition-all duration-500`}
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
            <FamilyDetail
              data={currentFamily}
              onClose={onCloseFamilyDetail}
              onUpdateFamilyDetail={onUpdateFamilyDetail}
            />
          </div>
        )}
      </div>
    </RootView>
  );
}
