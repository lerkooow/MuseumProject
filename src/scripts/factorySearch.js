function initFactorySearch() {
    let currentSearchTerm = '';

    function initSearch(inputId) {
        const searchInput = document.getElementById(inputId);
        if (!searchInput) return;

        const container = searchInput.closest('.factories-search, .factories-search__mobile');
        if (!container) return;

        const factoryWrappers = container.querySelectorAll(".factories-search__item-wrapper");

        searchInput.addEventListener("input", function (e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            currentSearchTerm = searchTerm;

            factoryWrappers.forEach((wrapper) => {
                const factoryName = wrapper.querySelector(".factories-search__item span").textContent.toLowerCase();

                if (factoryName.includes(searchTerm)) {
                    wrapper.classList.remove("hidden");
                } else {
                    wrapper.classList.add("hidden");
                }
            });

            if (window.filterMapCombined) {
                const filters = window.getActiveFilters ? window.getActiveFilters() : {
                    year: 'all-years',
                    type: 'all-types',
                    region: 'all-regions'
                };
                window.filterMapCombined(filters, searchTerm);
            }
        });

        searchInput.addEventListener("focus", function () {
            if (this.value === "") {
                factoryWrappers.forEach((wrapper) => {
                    wrapper.classList.remove("hidden");
                });

                currentSearchTerm = '';
                if (window.filterMapCombined) {
                    const filters = window.getActiveFilters ? window.getActiveFilters() : {
                        year: 'all-years',
                        type: 'all-types',
                        region: 'all-regions'
                    };
                    window.filterMapCombined(filters, '');
                }
            }
        });

        searchInput.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                this.value = "";
                factoryWrappers.forEach((wrapper) => {
                    wrapper.classList.remove("hidden");
                });

                currentSearchTerm = '';
                if (window.filterMapCombined) {
                    const filters = window.getActiveFilters ? window.getActiveFilters() : {
                        year: 'all-years',
                        type: 'all-types',
                        region: 'all-regions'
                    };
                    window.filterMapCombined(filters, '');
                }
            }
        });
    }

    initSearch("factorySearch");
    initSearch("factorySearchMobile");

    window.getCurrentSearchTerm = () => currentSearchTerm;
}

document.addEventListener("DOMContentLoaded", initFactorySearch);
