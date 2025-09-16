import Swal from "sweetalert2";

export default function successHandler(success) {
    const successKeys = Object.keys(success);
    if (successKeys.length > 0) {
        const successMessages = successKeys.map((key) => success[key]);
        Swal.fire({
            icon: "success",
            title: "Success!",
            html: successMessages.join("<br>"),
            showConfirmButton: false,
            timer: 2000,
        });
    }
}
