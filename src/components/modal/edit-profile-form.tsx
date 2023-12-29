import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { CURRENT_YEAR, VIETNAMESE_REG } from "@utils/constant";

import Button from "@components/button";
import Form from "@components/form";
import { modalRef } from "@components/modal/index.ref";

import { Person } from "@models";

type Props = {
  defaultProfile?: Person;
  onSubmit: (updatedProfile: Person) => void;
};

export default function EditProfileForm({
  defaultProfile,
  onSubmit,
}: Readonly<Props>) {
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm<Person>({
    defaultValues: defaultProfile,
    mode: "onChange",
  });

  const buttonLabel = useMemo(() => {
    return defaultProfile ? "Cập nhập" : "Thêm mới";
  }, [defaultProfile]);

  console.log(!isDirty, !isValid);

  return (
    <div className="flex flex-col gap-L">
      <p className="text-center font-semiBold text-h3">Thông Tin Phật Tử</p>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { value, onChange } }) => (
          <Form.Input
            error={errors.fullName?.message}
            title="Họ và Tên:"
            value={value}
            onChange={onChange}
          />
        )}
        rules={{
          required: true,
          pattern: {
            value: VIETNAMESE_REG,
            message: "Chỉ được nhập các chữ cái",
          },
        }}
      />
      <Controller
        control={control}
        name="christineName"
        render={({ field: { value, onChange } }) => (
          <Form.Input
            error={errors.christineName?.message}
            title="Pháp danh:"
            value={value}
            onChange={onChange}
          />
        )}
        rules={{
          pattern: {
            value: VIETNAMESE_REG,
            message: "Chỉ được nhập các chữ cái",
          },
        }}
      />
      <Controller
        control={control}
        name="yob"
        render={({ field: { value, onChange } }) => (
          <Form.Input
            error={errors.yob?.message}
            title="Năm sinh:"
            value={value}
            onChange={onChange}
          />
        )}
        rules={{
          pattern: {
            value: /^\d+$/,
            message: "Năm sinh chỉ được nhập số",
          },
          min: { value: 1900, message: "Năm sinh phải lớn hơn 1900" },
          max: {
            value: CURRENT_YEAR,
            message: `Năm sinh không được lớn hơn năm hiện tại -- ${CURRENT_YEAR}`,
          },
        }}
      />

      <Button
        color="blue-100"
        disabled={!isDirty || !isValid}
        label={buttonLabel}
        onClick={handleSubmit((value) => {
          modalRef.current?.hide();
          onSubmit(value);
        })}
      />
    </div>
  );
}
