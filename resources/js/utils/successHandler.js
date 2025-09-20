import Swal from "sweetalert2";

export default function successHandler(success) {
    if (!success) return;

    if (typeof success === "string") {
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: success,
            showConfirmButton: false,
            timer: 2000,
        });
        return;
    }
    const successKeys = Object.keys(success);
    if (successKeys.length > 0) {
        const successMessages = successKeys
            .map((key) => success[key])
            .join("\n");
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: successMessages,
            showConfirmButton: false,
            timer: 2000,
        });
    }
}
