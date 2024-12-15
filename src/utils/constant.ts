import { algoliasearch } from "algoliasearch";

import tailwindConfig from "../../tailwind.config";

export const AppColor = tailwindConfig.theme.colors;

export const PAGODA_ID = "tdph";

export const VIETNAMESE_REG =
  /^[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz\s]+$/i;

export const CURRENT_YEAR = new Date().getFullYear();

export const SEARCH_CLIENT = algoliasearch(
  import.meta.env.VITE_ALGOLIA_PROJECT_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY,
);

export const PERIODS = ["MORNING", "AFTERNOON", "NOON", "UNKNOWN"] as const;
export const APPOINTMENT_TYPES = ["CA", "CS"] as const;
