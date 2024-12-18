import { memo, useEffect, useMemo, useRef, useState } from "react";
import equals from "react-fast-compare";
import { useReactToPrint } from "react-to-print";

import FamilyDetailHeader from "@pages/families/family-detail/header";

import Button from "@components/button";
import AddFamilyContent from "@components/modal/add-family-content";
import CalendarContent from "@components/modal/calendar-content";
import EditProfileForm from "@components/modal/edit-profile-content";
import PrintView from "@components/print-view";

import { Appointment, AppointmentDate, Family, Person } from "@models";
import Utils from "@utils/utils";

import FamilyDetailFooter from "./footer";
import MemberList from "./member-list";

interface Props {
  data: Family;
  onUpdateFamilyDetail: (family: Family) => void;
  onClose: () => void;
}

const FamilyDetailComp = ({ data, onUpdateFamilyDetail, onClose }: Props) => {
  const [familyDetail, setFamilyDetail] = useState<Family>(data);

  const printPreviewRef = useRef(null);
  const isUpdated = useMemo(
    () => !equals(data, familyDetail) && familyDetail.members.length > 0,
    [familyDetail, data],
  );

  const onPrint = useReactToPrint({
    // content: () => printPreviewRef.current,
  });
  const onSetAppointment = (date: AppointmentDate) => {
    const userAppointment = date.selectedDate
      ? ({
          type: "CA",
          date: date.selectedDate.toDate(),
          period: date.period,
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
  const onPressChangeAddress = () => {
    Utils.showCustomModal(
      <AddFamilyContent
        defaultAddress={familyDetail.address}
        onAddFamily={onAddressChange}
      />,
    );
  };
  const onPressSetAppointment = () => {
    Utils.showCustomModal(
      <CalendarContent
        defaultAppointmentType={familyDetail.appointment?.type}
        defaultPeriod={familyDetail.appointment?.period}
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

  useEffect(() => {
    setFamilyDetail(data);
  }, [data]);

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
      <div className="flex w-full flex-row items-center justify-between gap-XS">
        <span className="font-semibold text-h4">{`Địa chỉ: ${familyDetail.address}`}</span>
        <Button.Icon
          className="bg-transparent p-ZERO active:bg-transparent"
          icon="PencilIcon"
          iconColor="blue-100"
          iconSize="LS"
          onClick={onPressChangeAddress}
        />
      </div>

      <span className="font-semibold text-h4">{`Số lượng thành viên: ${familyDetail.members.length}`}</span>
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
