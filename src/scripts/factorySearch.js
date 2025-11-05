document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("factorySearch");
    const factoryWrappers = document.querySelectorAll(".factories-search__item-wrapper");

    if (!searchInput) return;

    searchInput.addEventListener("input", function (e) {
        const searchTerm = e.target.value.toLowerCase().trim();

        factoryWrappers.forEach((wrapper) => {
            const factoryName = wrapper.querySelector(".factories-search__item span").textContent.toLowerCase();

            if (factoryName.includes(searchTerm)) {
                wrapper.classList.remove("hidden");
            } else {
                wrapper.classList.add("hidden");
            }
        });
    });

    searchInput.addEventListener("focus", function () {
        if (this.value === "") {
            factoryWrappers.forEach((wrapper) => {
                wrapper.classList.remove("hidden");
            });
        }
    });
});
