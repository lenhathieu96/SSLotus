import { memo, useMemo, useRef, useState } from "react";
import equals from "react-fast-compare";
import { useReactToPrint } from "react-to-print";
import Utils from "@utils/utils";
import { Dayjs } from "dayjs";

import FamilyDetailHeader from "@pages/families/family-detail/header";

import CalendarContent from "@components/modal/calendar-content";
import EditProfileForm from "@components/modal/edit-profile-content";
import PrintView from "@components/print-view";

import { Appointment, Family, Person } from "@models";

import FamilyDetailAddress from "./address";
import FamilyDetailFooter from "./footer";
import MemberList from "./member-list";

interface Props {
  data: Family;
  onUpdateFamilyDetail: (family: Family) => void;
  onClose: () => void;
}

const FamilyDetailComp = ({ data, onUpdateFamilyDetail, onClose }: Props) => {
  const printPreviewRef = useRef(null);

  const [familyDetail, setFamilyDetail] = useState<Family>(data);

  const isUpdated = useMemo(
    () => !equals(data, familyDetail) && familyDetail.members.length > 0,
    [familyDetail, data],
  );

  const onPrint = useReactToPrint({
    content: () => printPreviewRef.current,
  });

  const onSetAppointment = (date?: Dayjs) => {
    const userAppointment = date
      ? ({
          type: "CA",
          date: date.toDate(),
        } satisfies Appointment)
      : undefined;

    setFamilyDetail({
      ...familyDetail,
      appointment: userAppointment,
    });
  };
  const onAddressChange = (updateAddress: string) => {
    if (updateAddress !== familyDetail.address) {
      setFamilyDetail({
        ...familyDetail,
        address: updateAddress.toUpperCase(),
      });
    }
  };
  const onAddNewMember = (profile: Person) => {
    setFamilyDetail({
      ...familyDetail,
      members: [...familyDetail.members, profile],
    });
  };
  const onUpdateMemberProfile = (profile: Person, index: number) => {
    const tempMembers = [...familyDetail.members];
    tempMembers[index] = profile;
    setFamilyDetail({
      ...familyDetail,
      members: tempMembers,
    });
  };
  const onRemoveMember = (index: number) => {
    const tempMembers = [...familyDetail.members];
    tempMembers.splice(index, 1);
    setFamilyDetail({
      ...familyDetail,
      members: tempMembers,
    });
  };

  //Handle button press event
  const onPressAddMember = () => {
    Utils.showCustomModal(<EditProfileForm onSubmit={onAddNewMember} />);
  };
  const onPressSetAppointment = () => {
    Utils.showCustomModal(
      <CalendarContent
        defaultSelectedDate={familyDetail.appointment?.date}
        onConfirm={onSetAppointment}
      />,
    );
  };
  const onPressRemoveMember = (index: number) => {
    Utils.showConfirmModal({
      title: "Bạn có chắc chắc xoá ?",
      onConfirm: () => onRemoveMember(index),
    });
  };
  const onPressEditProfile = (profile: Person, index: number) => {
    Utils.showCustomModal(
      <EditProfileForm
        defaultProfile={profile}
        onSubmit={(updatedProfile) =>
          onUpdateMemberProfile(updatedProfile, index)
        }
      />,
    );
  };
  const onPressCloseDetail = () => {
    if (isUpdated) {
      return Utils.showConfirmModal({
        title: "Bạn có chắc chắn thoát ?",
        description:
          "Có một số thông tin bạn chưa lưu lại, khi thoát ra các thông tin ấy sẽ mất và không thể khôi phục",
        onConfirm: onClose,
      });
    }
    onClose();
  };

  return (
    <div className="flex h-full flex-col gap-L">
      {/**Header */}
      <FamilyDetailHeader
        appointmentDate={familyDetail.appointment?.date}
        printEnabled={!isUpdated}
        showControlOptions={familyDetail.members.length > 0}
        onClose={onPressCloseDetail}
        onPrint={onPrint}
        onSetAppointment={onPressSetAppointment}
      />

      {/**Address */}
      <FamilyDetailAddress
        defaultAddress={familyDetail.address.toUpperCase()}
        onAddressChange={onAddressChange}
      />

      <span className="font-semiBold text-h4">Thành viên: </span>
      <MemberList
        members={familyDetail.members}
        onEditMemberProfile={onPressEditProfile}
        onRemoveMember={onPressRemoveMember}
      />

      <FamilyDetailFooter
        isUpdated={isUpdated}
        onAddNewMember={onPressAddMember}
        onUpdate={() => onUpdateFamilyDetail(familyDetail)}
      />

      <div className="hidden">
        <PrintView ref={printPreviewRef} data={familyDetail} />
      </div>
    </div>
  );
};

const FamilyDetail = memo(FamilyDetailComp, equals);
export default FamilyDetail;
