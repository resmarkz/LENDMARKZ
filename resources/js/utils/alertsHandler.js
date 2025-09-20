import Swal from "sweetalert2";

export function errorHandler(errors) {
    if (!errors) return;
    if (typeof errors === "string") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errors,
        });
        return;
    }

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

export function successHandler(success) {
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
