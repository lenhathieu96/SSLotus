import { Lunar, Solar } from "lunar-typescript";

const Helper = {
  isNumeric: (input: string): boolean => {
    const regex = /^\d+$/;
    return regex.test(input);
  },

  convertSolarToLunarDate: (solarDate: Date): Lunar => {
    return Lunar.fromSolar(
      Solar.fromYmd(
        solarDate.getFullYear(),
        solarDate.getMonth() + 1,
        solarDate.getDate(),
      ),
    );
  },

  getDisplayLunarDate: (date: Lunar) => {
    const day = date.getDay();
    const displayDay = day > 10 ? day : `Mồng ${day}`;
    const month = date.getMonth();
    let displayMonth = month.toString();
    if (month === 12) {
      displayMonth = "Chạp";
    }
    if (month === 1) {
      displayMonth = "Giêng";
    }

    return `${displayDay} Tháng ${displayMonth}`;
  },
};

export default Helper;
