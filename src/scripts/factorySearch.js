function initFactorySearch() {
    function initSearch(inputId) {
        const searchInput = document.getElementById(inputId);
        if (!searchInput) return;

        const container = searchInput.closest('.factories-search, .factories-search__mobile');
        if (!container) return;

        const factoryWrappers = container.querySelectorAll(".factories-search__item-wrapper");

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
    }

    initSearch("factorySearch");
    initSearch("factorySearchMobile");
}

document.addEventListener("DOMContentLoaded", initFactorySearch);
