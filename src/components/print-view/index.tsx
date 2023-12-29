import { forwardRef, LegacyRef } from "react";

import { Family } from "@models";

import { DharmachakraPng } from "@assets/png";

interface Props {
  data: Family;
}

const PAGE_BREAK_INDEX = 15;

const PrintPreView = forwardRef(
  ({ data }: Props, ref: LegacyRef<HTMLDivElement>) => {
    const baseCellStyles =
      "border-2 border-black-300 p-XXS font-medium text-body2";

    return (
      <div ref={ref} className=" print: m-XL">
        <div className="flex flex-row items-center justify-between">
          <div className="flex w-1/5 bg-white-100">
            <img
              alt="DharmachakraPng"
              className="h-auto w-full "
              src={DharmachakraPng}
            />
          </div>

          <div className="items-center justify-center">
            <span className="text-printh1 font-semibold">CẦU AN</span>
          </div>

          <div className="w-1/5 items-baseline justify-center border-2 border-black-300 px-XXXS">
            <span className="font-regular text-body2">Mã sô: </span>
            <span className="text-body1 font-semibold">{data.id}</span>
          </div>
        </div>
        <table className="mt-XS w-full">
          <thead className="border-2 border-black-300">
            <tr>
              <th className={`${baseCellStyles} w-1/2 font-semiBold`}>
                HỌ VÀ TÊN
              </th>
              <th className={`${baseCellStyles} w-1/2 font-semiBold`}>
                Pháp Danh
              </th>
              <th className={`${baseCellStyles} w-1/4 font-semiBold`}>Tuổi</th>
            </tr>
          </thead>
          <tbody className="border-2 border-black-300">
            {data.member.map((person, index) => (
              <tr
                key={`table-key-${person.fullName}`}
                style={{
                  pageBreakBefore:
                    index === PAGE_BREAK_INDEX ? "always" : "auto",
                  marginTop: index === PAGE_BREAK_INDEX ? "24px" : undefined,
                }}
              >
                <td className={`${baseCellStyles} w-1/2`}>{person.fullName}</td>
                <td className={`${baseCellStyles} w-1/2`}>
                  {person.christineName}
                </td>
                <td className={`${baseCellStyles} w-1/4 text-center `}>
                  {new Date().getFullYear() - parseInt(person.yob, 10) + 1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);

PrintPreView.displayName = "PrintPreView";

export default PrintPreView;
