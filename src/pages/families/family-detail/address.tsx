import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import equals from "react-fast-compare";

import Button from "@components/button";

interface Props {
  defaultAddress: string;
  onAddressChange: (updatedAddress: string) => void;
}

const FamilyDetailAddressComp = ({
  defaultAddress,
  onAddressChange,
}: Props) => {
  const addressInputRef = useRef<HTMLInputElement>(null);

  const [isEditingAddress, setIsEditingAddress] = useState<boolean>();
  const [inputValue, setInputValue] = useState<string>(defaultAddress);

  const onEdit = () => {
    setIsEditingAddress(true);
  };

  const onInputBlur = () => {
    setIsEditingAddress(false);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (addressInputRef.current && isEditingAddress) {
      addressInputRef.current.focus();
    }
  }, [isEditingAddress, addressInputRef]);

  useEffect(() => {
    if (defaultAddress !== inputValue) {
      onAddressChange(inputValue);
    }
  }, [inputValue, defaultAddress, onAddressChange]);

  useEffect(() => {
    setInputValue(defaultAddress);
  }, [defaultAddress]);

  return (
    <div className="flex w-full flex-row items-center justify-between gap-XS">
      <span className="font-semibold text-h4">Địa chỉ: </span>
      <input
        ref={addressInputRef}
        className="flex-1 font-semibold text-body1 focus:outline-none"
        readOnly={!isEditingAddress}
        value={inputValue}
        onBlur={onInputBlur}
        onChange={onInputChange}
      />

      <Button.Icon
        className="bg-transparent p-ZERO active:bg-transparent"
        icon="PencilIcon"
        iconColor="blue-100"
        iconSize="LS"
        onClick={onEdit}
      />
    </div>
  );
};

const FamilyDetailAddress = memo(FamilyDetailAddressComp, equals);
export default FamilyDetailAddress;
