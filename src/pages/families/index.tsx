import { useCallback, useEffect, useMemo, useState } from "react";
import { useHits, useInstantSearch } from "react-instantsearch";
import { toast } from "react-toastify";
import Utils from "@utils/utils";

import EmptyQueryBoundary from "@pages/families/empty-query-boundary";

import AddFamilyContent from "@components/modal/add-family-content";
import RootView from "@components/root-view";

import { Appointment, Family, Person } from "@models";
import { FamilyService } from "@services";

import FamilyDetail from "./family-detail";
import FamilyOverView from "./family-overview";
import FamiliesHeader from "./header";

export default function FamiliesPage() {
  const [currentFamily, setCurrentFamily] = useState<Family | undefined>();
  const { hits } = useHits();
  const { refresh } = useInstantSearch();

  const families: Family[] = useMemo(
    () =>
      hits.map(
        (item) =>
          ({
            id: item.id as number,
            address: item.address as string,
            members: (item.members as Person[]) ?? [],
            appointment: item.appointment
              ? {
                  type: "CA",
                  date: new Date((item.appointment as Appointment).date),
                }
              : undefined,
          }) satisfies Family,
      ),
    [hits],
  );

  const resetCurrentFamily = useCallback(() => {
    setCurrentFamily(undefined);
  }, []);

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
    //refresh algolia search cache
    refresh();
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
    setCurrentFamily(undefined);
  }, []);

  const onSeeFamilyDetail = useCallback(
    (id: number) => {
      setCurrentFamily(families.find((family) => family.id === id));
    },
    [families],
  );

  useEffect(() => {
    resetCurrentFamily();
  }, [families, resetCurrentFamily]);

  return (
    <RootView className="flex h-full flex-col items-start gap-XS py-XXS">
      <FamiliesHeader
        enableAddNewFamily={currentFamily?.id !== -1}
        onAddNewFamily={onPressAddNewFamily}
        onClearQueryTxt={resetCurrentFamily}
      />

      <div className="flex h-full w-full flex-row gap-MS overflow-hidden">
        <div
          className={`${
            currentFamily ? "w-2/5" : "w-full"
          }  no-scrollbar overflow-x-hidden overflow-y-scroll rounded-2xl pl-XXS pt-XXS transition-all duration-500`}
        >
          <EmptyQueryBoundary fallback={null}>
            {families.map((family, index) => (
              <FamilyOverView
                key={family.id}
                className={`${index === 0 ? "" : "mt-XS"}`}
                data={family}
                isSelected={family.id === currentFamily?.id}
                onClick={onSeeFamilyDetail}
              />
            ))}
          </EmptyQueryBoundary>
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
