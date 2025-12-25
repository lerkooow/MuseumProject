document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".people-list__card");
    const allCards = Array.from(cards);

    const alphabetButtons = document.querySelectorAll(".people-list__alphabet-btn");
    const searchInput = document.getElementById("peopleSearch");
    const dropdowns = document.querySelectorAll(".dropdown");
    const peopleCount = document.getElementById("peopleCount");
    const emptyMessage = document.getElementById("emptyMessage");
    const gridContainer = document.querySelector(".people-list__grid");
    const leftButton = document.querySelector("#people-button-left .button__arrow");
    const rightButton = document.querySelector("#people-button-right .button__arrow");

    let activeLetter = null;
    let selectedYear = "all";
    let selectedFactory = "all";
    let searchQuery = "";
    let currentPage = 0;

    function getCardsPerPage() {
        return window.innerWidth <= 768 ? 3 : 6;
    }

    let cardsPerPage = getCardsPerPage();

    function getFilteredCards() {
        return allCards.filter((card) => {
            const name = card
                .querySelector(".people-list__name")
                .innerText.replace(/\s+/g, " ")
                .trim();

            const years = card
                .querySelector(".people-list__stamp")
                .alt.toLowerCase();

            const factoryValue = card.dataset.factory || "all";

            const nameBeforeBrackets = name.split("(")[0].trim();
            const nameParts = nameBeforeBrackets.split(/\s+/);
            const surname = nameParts[nameParts.length - 1];
            const surnameLower = surname.toLowerCase();
            const firstLetterOfSurname = surname.charAt(0).toUpperCase();

            const matchesLetter =
                !activeLetter || firstLetterOfSurname === activeLetter;

            const matchesYear =
                selectedYear === "all" || years.includes(selectedYear);

            const matchesFactory =
                selectedFactory === "all" || factoryValue === selectedFactory;

            const matchesSearch =
                !searchQuery || surnameLower.startsWith(searchQuery);

            return (
                matchesLetter &&
                matchesYear &&
                matchesFactory &&
                matchesSearch
            );
        });
    }

    function updateButtonStates() {
        const filteredCards = getFilteredCards();
        const totalCards = filteredCards.length;
        const maxPage = Math.ceil(totalCards / cardsPerPage) - 1;

        if (totalCards === 0) {
            leftButton.parentElement.style.display = "none";
            rightButton.parentElement.style.display = "none";
            return;
        } else {
            leftButton.parentElement.style.display = "flex";
            rightButton.parentElement.style.display = "flex";
        }

        leftButton.style.opacity = currentPage === 0 ? "0.5" : "1";
        leftButton.style.cursor = currentPage === 0 ? "not-allowed" : "pointer";

        rightButton.style.opacity =
            currentPage >= maxPage || totalCards <= cardsPerPage ? "0.5" : "1";
        rightButton.style.cursor =
            currentPage >= maxPage || totalCards <= cardsPerPage
                ? "not-allowed"
                : "pointer";
    }

    function updateDisplay() {
        cardsPerPage = getCardsPerPage();
        const filteredCards = getFilteredCards();
        const totalFiltered = filteredCards.length;
        const maxPage = Math.ceil(totalFiltered / cardsPerPage) - 1;

        currentPage = Math.max(0, Math.min(currentPage, maxPage));

        gridContainer.innerHTML = "";

        const startIndex = currentPage * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;

        filteredCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = "flex";
                gridContainer.appendChild(card);
            }
        });

        peopleCount.textContent = totalFiltered;

        emptyMessage.style.display = totalFiltered === 0 ? "flex" : "none";
        gridContainer.style.display = totalFiltered === 0 ? "none" : "grid";

        updateButtonStates();
    }

    function filterCards() {
        currentPage = 0;
        updateDisplay();
    }

    alphabetButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (activeLetter === btn.dataset.letter) {
                activeLetter = null;
                btn.classList.remove("active");
            } else {
                alphabetButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                activeLetter = btn.dataset.letter;
            }
            filterCards();
        });
    });

    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        filterCards();
    });

    dropdowns.forEach((dropdown, index) => {
        dropdown.querySelectorAll(".dropdown__item").forEach((item) => {
            item.addEventListener("click", () => {
                const value = item.dataset.value;
                if (index === 0) selectedYear = value;
                if (index === 1) selectedFactory = value;
                filterCards();
            });
        });
    });

    leftButton.addEventListener("click", () => {
        currentPage--;
        updateDisplay();
    });

    rightButton.addEventListener("click", () => {
        currentPage++;
        updateDisplay();
    });

    window.addEventListener("resize", () => {
        currentPage = 0;
        updateDisplay();
    });

    allCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("hovered");
        });
    });


    updateDisplay();
});
