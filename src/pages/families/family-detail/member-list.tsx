import { memo } from "react";
import equals from "react-fast-compare";

import Button from "@components/button";

import { Person } from "@models";

interface Props {
  members: Person[];
  onEditMemberProfile: (currentProfile: Person, index: number) => void;
  onRemoveMember: (index: number) => void;
}

const MemberListComp = ({
  members,
  onEditMemberProfile,
  onRemoveMember,
}: Props) => {
  return (
    <div className="flex-1 overflow-y-scroll">
      {members.map((member, index) => (
        <div
          key={`key-${member.fullName}`}
          className="mb-XS flex flex-row items-center justify-between border-b-2 py-XXXS"
        >
          <div className="flex flex-col gap-XS">
            <p className="font-semibold text-body1">{member.fullName}</p>
            {member.christineName && (
              <div className="ml-XS flex flex-row items-baseline gap-XXXS">
                <p className="font-regular text-body1">Pháp danh: </p>
                <p className="font-semibold text-body1">
                  {member.christineName}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-row gap-S pr-XXS">
            <Button.Icon
              icon="PencilIcon"
              iconColor="blue-100"
              iconSize="LS"
              onClick={() => onEditMemberProfile(member, index)}
            />
            <Button.Icon
              className="bg-transparent p-ZERO active:bg-transparent"
              icon="TrashIcon"
              iconColor="red-200"
              iconSize="LS"
              onClick={() => onRemoveMember(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const MemberList = memo(MemberListComp, equals);
export default MemberList;
