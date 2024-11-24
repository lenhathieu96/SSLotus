import { forwardRef, LegacyRef, useMemo } from "react";

import { Family } from "@models";
import Helper from "@utils/helper";
import Utils from "@utils/utils";

import "./index.css";

import { DharmachakraPng } from "@assets/png";

interface Props {
  data: Family;
}

const FIRST_PAGE_BREAK_INDEX = 12;
const PAGE_BREAK_INDEX = 13;

const PrintPreView = forwardRef(
  ({ data }: Props, ref: LegacyRef<HTMLDivElement>) => {
    const baseCellStyles =
      "border-2 border-black-300 p-XXXS font-semibold text-h2";

    const appointmentDate = useMemo(() => {
      if (data.appointment?.date) {
        const lunarDate = Helper.convertSolarToLunarDate(
          data.appointment?.date,
        );
        return `${Utils.renderPeriod(
          data.appointment.period,
        )} | ${Helper.getDisplayLunarDate(lunarDate, true)}`;
      }

      return "";
    }, [data.appointment]);

    return (
      <div ref={ref}>
        <div className="flex flex-row items-center justify-between">
          <div className="flex w-1/5 bg-white-100">
            <img
              alt="DharmachakraPng"
              className=" h-[16] w-[16] "
              src={DharmachakraPng}
            />
          </div>

          <div className="flex grow flex-col items-center justify-center">
            <p className="font-semibold text-h1">
              {/* {data.appointment?.type === "CA" ? "CẦU AN" : "CẦU SIÊU"} */}
              CẦU AN
            </p>
            <p className="font-semibold text-h3">{data.address}</p>
          </div>

          <div className="flex flex-col items-center gap-XXXS">
            <span className="font-semibold text-h3">{appointmentDate}</span>
            <div className="flex flex-col items-center justify-center border-2 border-black-300  px-XXS">
              <span className="text-center font-regular text-body2">
                Mã sô:
              </span>
              <span className="font-semibold text-body1">{data.id}</span>
            </div>
          </div>
        </div>

        <table className="mt-XS w-full">
          <thead className="border-2 border-black-300">
            <tr>
              <th className={`${baseCellStyles} w-1/12 font-semibold`}>STT</th>
              <th className={`${baseCellStyles} w-1/2 font-semibold`}>
                HỌ VÀ TÊN
              </th>
              <th className={`${baseCellStyles} w-1/2 font-semibold`}>
                Pháp Danh
              </th>
            </tr>
          </thead>
          <tbody className="border-2 border-black-300">
            {data.members.map((person, index) => (
              <tr
                key={`table-key-${person.fullName}`}
                style={{
                  pageBreakBefore:
                    index === FIRST_PAGE_BREAK_INDEX ||
                    (index > PAGE_BREAK_INDEX && index % PAGE_BREAK_INDEX === 0)
                      ? "always"
                      : "auto",
                }}
              >
                <td className={`${baseCellStyles} w-1/12 text-center `}>
                  {index + 1}
                </td>
                <td className={`${baseCellStyles} w-1/2`}>{person.fullName}</td>
                <td className={`${baseCellStyles} w-1/2`}>
                  {person.christineName}
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
