import { useMemo } from "react";

interface Props {
  title: string;
  value?: string | number;
  error?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

export default function FormInput({
  title,
  value,
  defaultValue,
  error,
  onChange,
}: Readonly<Props>) {
  const borderStyle = useMemo(() => {
    return error ? "border-1 border-red-200" : "border-none";
  }, [error]);

  return (
    <div className="flex w-full flex-col gap-xxxs">
      <p className="text-body1 font-semibold text-black-300">{title}</p>

      <div className="flex h-extra flex-col justify-center  py-xs">
        <input
          className={`rounded-2xl bg-gray-100 p-xs text-body1 font-medium outline-none ${borderStyle}`}
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div className="flex h-xl flex-col justify-center ">
        <p
          className={`text-body2 font-normal text-red-200 transition-all duration-500`}
        >
          {error}
        </p>
      </div>
    </div>
  );
}
