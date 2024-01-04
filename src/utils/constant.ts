import tailwindConfig from "../../tailwind.config";

export const AppColor = tailwindConfig.theme.colors;

export const VIETNAMESE_REG =
  /^[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz\s]+$/i;

export const CURRENT_YEAR = new Date().getFullYear();
