function showToast(message, type = "success") {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.className =
        "fixed top-24 left-1/2 -translate-x-1/2 text-white px-6 py-3 rounded-xl shadow-2xl z-50 font-medium transition-all duration-300";

    if (type === "success") {

        toast.classList.add(
            "bg-green-600"
        );

    } else if (type === "error") {

        toast.classList.add(
            "bg-red-600"
        );

    } else {

        toast.classList.add(
            "bg-blue-600"
        );
    }

    toast.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        toast.classList.add(
            "hidden"
        );

    }, 3000);
}