import { useMemo } from "react";

interface Props {
  title: string;
  value?: string | number;
  error?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function FormInput({
  title,
  value,
  error,
  onChange,
}: Readonly<Props>) {
  const borderStyle = useMemo(() => {
    return error ? "border-1 border-red-200" : "border-none";
  }, [error]);

  return (
    <div className="flex w-full flex-col gap-XXXS">
      <p className="font-semiBold text-body1 text-black-300">{title}</p>

      <div className="flex h-EXTRA flex-col justify-center  py-XS">
        <input
          className={`rounded-2xl bg-gray-100 p-XS font-medium text-body1 outline-none ${borderStyle}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div className="flex h-XL flex-col justify-center ">
        <p
          className={`font-regular text-body2 text-red-200 transition-all duration-500`}
        >
          {error}
        </p>
      </div>
    </div>
  );
}
