import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { AppColor, VIETNAMESE_REG } from "@utils/constant";

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

  return (
    <div className="flex flex-col gap-L">
      <p className="text-center font-semiBold text-h4">Thông Tin Phật Tử</p>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { value, onChange } }) => (
          <Form.Input
            error={errors.fullName?.message}
            title="Họ và Tên:"
            value={value?.toLowerCase()}
            onChange={(text) => onChange(text.toUpperCase())}
          />
        )}
        rules={{
          required: true,
          pattern: {
            value: VIETNAMESE_REG,
            message: "Chỉ được nhập các chữ cái",
          },
          minLength: {
            value: 3,
            message: "Tối thiểu 3 ký tự",
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
            value={value?.toLowerCase()}
            onChange={(text) => onChange(text.toUpperCase())}
          />
        )}
        rules={{
          pattern: {
            value: VIETNAMESE_REG,
            message: "Chỉ được nhập các chữ cái",
          },
          minLength: {
            value: 3,
            message: "Tối thiểu 3 ký tự",
          },
        }}
      />

      <Button
        color={AppColor.blue[100]}
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
