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
          key={`key-${member.fullName}-${index}`}
          className="mb-xs flex flex-row items-center justify-between border-b-2 py-xxxs"
        >
          <div className="flex flex-col gap-xs">
            <p className="text-body1 font-semibold">{member.fullName}</p>
            {member.christineName && (
              <div className="ml-xs flex flex-row items-baseline gap-xxxs">
                <p className="text-body1 font-normal">Pháp danh: </p>
                <p className="text-body1 font-semibold">
                  {member.christineName}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-row gap-s pr-xxs">
            <Button.Icon
              icon="PencilIcon"
              iconColor="blue-100"
              iconSize="ls"
              onClick={() => onEditMemberProfile(member, index)}
            />
            <Button.Icon
              className="bg-transparent p-zero active:bg-transparent"
              icon="TrashIcon"
              iconColor="red-200"
              iconSize="ls"
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
