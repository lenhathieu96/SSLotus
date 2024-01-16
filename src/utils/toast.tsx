import { toast } from "react-toastify";

const showToast = (message: string) =>
  toast(message, { type: "success", theme: "colored" });

export default showToast;
