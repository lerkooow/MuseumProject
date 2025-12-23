function initFactorySearch() {
    let currentSearchTerm = '';

    function initSearch(inputId) {
        const searchInput = document.getElementById(inputId);
        if (!searchInput) return;

        const container = searchInput.closest('.factories-search, .factories-search__mobile');
        if (!container) return;

        const factoryWrappers = container.querySelectorAll(".factories-search__item-wrapper");
        const listContainer = container.querySelector(".factories-search__list");

        let noResultsMessage = listContainer.querySelector('.factories-search__no-results');
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'factories-search__no-results hidden';
            noResultsMessage.innerHTML = '<p>К сожалению, по вашему запросу ничего не найдено.</p><span>Попробуйте изменить запрос или начать ввод с первых букв названия фабрики</span>';
            listContainer.appendChild(noResultsMessage);
        }

        searchInput.addEventListener("input", function (e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            currentSearchTerm = searchTerm;

            let visibleCount = 0;

            factoryWrappers.forEach((wrapper) => {
                const factoryName = wrapper.querySelector(".factories-search__item span").textContent.toLowerCase();

                if (factoryName.includes(searchTerm)) {
                    wrapper.classList.remove("hidden");
                    visibleCount++;
                } else {
                    wrapper.classList.add("hidden");
                }
            });

            if (searchTerm && visibleCount === 0) {
                noResultsMessage.classList.remove("hidden");
            } else {
                noResultsMessage.classList.add("hidden");
            }

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

                noResultsMessage.classList.add("hidden");

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

                noResultsMessage.classList.add("hidden");

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
