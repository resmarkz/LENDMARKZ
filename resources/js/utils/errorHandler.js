import Swal from "sweetalert2";

export default function errorHandler(errors) {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
        const errorMessages = errorKeys.map((key) => errors[key]);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            html: errorMessages.join("<br>"),
        });
    }
}
