import { toast } from "react-toastify";

const notify = (msg, type) => {
  toast(msg, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    pauseOnFocusLoss: true,
    type,
  });
};
export default notify;
