import { memo, useCallback, useRef } from "react";
import equals from "react-fast-compare";
import { useReactToPrint } from "react-to-print";
import Utils from "@utils/utils";
import { Dayjs } from "dayjs";

import FamilyDetailHeader from "@pages/families/family-detail/header";

import CalendarContent from "@components/modal/calendar-content";
import EditProfileForm from "@components/modal/edit-profile-form";
import PrintView from "@components/print-view";

import { Family, Person } from "@models";

import FamilyDetailAddress from "./address";
import FamilyDetailFooter from "./footer";
import MemberList from "./member-list";

interface Props {
  data: Family;
  onClose: () => void;
}

const FamilyDetailComp = ({ data, onClose }: Props) => {
  const printPreviewRef = useRef(null);

  const onPrint = useReactToPrint({
    content: () => printPreviewRef.current,
  });
  const onAddressChange = useCallback((updateAddress: string) => {
    console.log("Address changed: ", updateAddress);
  }, []);
  const onUpdateFamilyDetail = () => {
    console.log("update profile");
  };
  const onSetAppointment = (date: Dayjs) => {
    console.log("set appointment at ", date);
  };
  const onAddNewMember = (profile: Person) => {
    console.log("Add new member :", profile);
  };
  const onRemoveMember = (profile: Person) => {
    console.log("remove : ", profile.fullName);
  };
  const onUpdateMemberProfile = (profile: Person) => {
    console.log("update profile: ", profile);
  };

  //Handle button press event
  const onPressAddMember = () => {
    Utils.showBlankModal(<EditProfileForm onSubmit={onAddNewMember} />);
  };
  const onPressSetAppointment = () => {
    Utils.showBlankModal(<CalendarContent onConfirm={onSetAppointment} />);
  };
  const onPressRemoveMember = (profile: Person) => {
    Utils.showConfirmModal({
      title: "Bạn có chắc chắc xoá ?",
      onConfirm: () => onRemoveMember(profile),
    });
  };

  const onPressEditProfile = (profile: Person) => {
    Utils.showBlankModal(
      <EditProfileForm
        defaultProfile={profile}
        onSubmit={onUpdateMemberProfile}
      />,
    );
  };

  return (
    <div className="flex h-full flex-col gap-L">
      {/**Header */}
      <FamilyDetailHeader
        onClose={onClose}
        onPrint={onPrint}
        onSetAppointment={onPressSetAppointment}
      />

      {/**Address */}
      <FamilyDetailAddress
        defaultAddress={data.address}
        onAddressChange={onAddressChange}
      />

      <span className="font-semiBold text-subtitle2">Thành viên: </span>
      <MemberList
        members={data.member}
        onEditMemberProfile={onPressEditProfile}
        onRemoveMember={onPressRemoveMember}
      />

      <FamilyDetailFooter
        isUpdated
        onAddNewMember={onPressAddMember}
        onUpdate={onUpdateFamilyDetail}
      />

      <div className="hidden">
        <PrintView ref={printPreviewRef} data={data} />
      </div>
    </div>
  );
};

const FamilyDetail = memo(FamilyDetailComp, equals);
export default FamilyDetail;
