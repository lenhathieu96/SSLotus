import { useCallback, useState } from "react";
import { useInstantSearch } from "react-instantsearch";
import { toast } from "react-toastify";

import AddFamilyContent from "@components/modal/add-family-content";
import RootView from "@components/root-view";

import { Family } from "@models";
import { FamilyService } from "@services";
import Utils from "@utils/utils";

import EmptyQueryBoundary from "./empty-query-boundary";
import FamiliesListHeader from "./families-list-header";
import FamilyDetail from "./family-detail";
import FamilyOverView from "./family-overview";

export default function FamiliesPage() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [currentFamily, setCurrentFamily] = useState<Family | undefined>();

  const { refresh } = useInstantSearch();

  const resetCurrentFamily = useCallback(() => {
    setCurrentFamily(undefined);
  }, []);

  const onUpdateFamilyDetail = (updatedFamily: Family) => {
    toast.promise(FamilyService.updateFamilyProfile(updatedFamily), {
      error: {
        render() {
          return "Cập nhập thất bại";
        },
        type: "error",
        theme: "colored",
      },
      success: {
        render() {
          setCurrentFamily(updatedFamily);
          return "Cập nhập thành công";
        },
        type: "success",
        theme: "colored",
      },
    });
    //refresh algolia search cache
    refresh();
    const updatedFamilies = [...families].map((family) => {
      if (family.id === updatedFamily.id) {
        return { ...updatedFamily };
      }
      return { ...family };
    });
    setFamilies(updatedFamilies);
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

  // useEffect(() => {
  //   const familiesData = hits.map(
  //     (item) =>
  //       ({
  //         id: item.id as number,
  //         address: item.address as string,
  //         members: (item.members as Person[]) ?? [],
  //         appointment: item.appointment
  //           ? {
  //               type: "CA",
  //               date: new Date((item.appointment as Appointment).date),
  //               period: (item.appointment as Appointment).period,
  //             }
  //           : undefined,
  //       }) satisfies Family,
  //   );
  //   setFamilies(familiesData);
  // }, [hits]);

  return (
    <RootView className="flex h-full flex-col items-start gap-xs py-xxs">
      <FamiliesListHeader
        enableAddNewFamily={currentFamily?.id !== -1}
        onAddNewFamily={onPressAddNewFamily}
        onClearQueryTxt={resetCurrentFamily}
        onStartSearching={resetCurrentFamily}
      />

      <div className="flex size-full flex-row gap-m overflow-hidden">
        <div
          className={`${
            currentFamily ? "w-2/5" : "w-full"
          }  no-scrollbar overflow-x-hidden overflow-y-scroll rounded-2xl pl-xxs pt-xxs transition-all duration-500`}
        >
          <EmptyQueryBoundary fallback={null}>
            {families.map((family, index) => (
              <FamilyOverView
                key={family.id}
                className={`${index === 0 ? "" : "mt-xs"}`}
                data={family}
                isSelected={family.id === currentFamily?.id}
                onClick={onSeeFamilyDetail}
              />
            ))}
          </EmptyQueryBoundary>
        </div>

        {currentFamily && (
          <div className="grow  rounded-2xl p-xs transition-all duration-500">
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
