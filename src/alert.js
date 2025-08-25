import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showAlert = (type, title, text) => {
  MySwal.fire({
    icon: type, // "success", "error", "warning", "info", "question"
    title: title,
    text: text,
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};
