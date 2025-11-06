const factoriesData = [
    {
        name: "Балахнинская картонная фабрика",
        url: "#",
    },
    {
        name: "Ветлужский картонный комбинат",
        url: "#",
    },
    {
        name: "Ижорский целлюлозно-бумажный завод",
        url: "#",
    },
    {
        name: "Невинномысская фабрика спецбумаг",
        url: "#",
    },
    {
        name: "Озёрская бумажная фабрика",
        url: "#",
    },
    {
        name: "Полотняно-Заводской бумажная мануфактура",
        url: "#",
    },
    {
        name: "Сухонский картонно-бумажный комбинат",
        url: "#",
    },
    {
        name: "Троицкая бумажная фабрика",
        url: "#",
    },
];

function createFactoryItem(factory) {
    return `
    <div class="factories-search__item-wrapper">
      <a href="${factory.url}" class="factories-search__item">
        <span>${factory.name}</span>
        <img src="../assets/icons/arrow_small.svg" alt="arrow" class="factories-search__arrow" />
      </a>
      <img src="../assets/icons/line_factories.svg" alt="divider" class="factories-search__divider" />
    </div>
  `;
}

function loadFactories() {
    const factoriesHTML = factoriesData.map(createFactoryItem).join("");

    // Загружаем в десктопную версию
    const listContainer = document.getElementById("factoriesList");
    if (listContainer) {
        listContainer.innerHTML = factoriesHTML;
    }

    // Загружаем в мобильную версию
    const listContainerMobile = document.getElementById("factoriesListMobile");
    if (listContainerMobile) {
        listContainerMobile.innerHTML = factoriesHTML;
    }

    initFactorySearch();
}

function initFactorySearch() {
    // Функция для инициализации поиска
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

    // Инициализация десктопной версии
    initSearch("factorySearch");

    // Инициализация мобильной версии
    initSearch("factorySearchMobile");
}

document.addEventListener("DOMContentLoaded", loadFactories);
