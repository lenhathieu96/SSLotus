import algoliasearch from "algoliasearch";

import tailwindConfig from "../../tailwind.config";

export const AppColor = tailwindConfig.theme.colors;

export const VIETNAMESE_REG =
  /^[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz\s]+$/i;

export const CURRENT_YEAR = new Date().getFullYear();

export const SEARCH_CLIENT = algoliasearch(
  "TMHHDJJ8E0",
  "5679b552565ea97339bc998684d9fe49",
);
