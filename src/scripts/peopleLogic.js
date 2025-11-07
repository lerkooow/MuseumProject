document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".people-list__card");
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
    const cardsPerPage = 6;

    function getFilteredCards() {
        return Array.from(cards).filter((card) => {
            const name = card.querySelector(".people-list__name").innerText.replace(/\s+/g, " ").trim();
            const years = card.querySelector(".people-list__stamp").alt.toLowerCase();
            const factory = card.querySelector(".people-list__factory p").innerText.toLowerCase();

            const nameBeforeBrackets = name.split("(")[0].trim();
            const nameParts = nameBeforeBrackets.split(/\s+/);
            const surname = nameParts[nameParts.length - 1];
            const firstLetterOfSurname = surname.charAt(0).toUpperCase();

            const matchesLetter = !activeLetter || firstLetterOfSurname === activeLetter;
            const matchesYear = selectedYear === "all" || years.includes(selectedYear.toLowerCase());
            const matchesFactory = selectedFactory === "all" || factory.includes(selectedFactory.toLowerCase());
            const matchesSearch = name.toLowerCase().includes(searchQuery);

            return matchesLetter && matchesYear && matchesFactory && matchesSearch;
        });
    }

    function updateDisplay() {
        const filteredCards = getFilteredCards();
        const totalFiltered = filteredCards.length;
        const maxPage = Math.ceil(totalFiltered / cardsPerPage) - 1;

        if (currentPage < 0) currentPage = 0;
        if (currentPage > maxPage) currentPage = maxPage;

        cards.forEach(card => card.style.display = "none");

        const startIndex = currentPage * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;

        filteredCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = "flex";
            }
        });

        peopleCount.textContent = totalFiltered;

        if (totalFiltered === 0) {
            emptyMessage.style.display = "flex";
            gridContainer.style.display = "none";
        } else {
            emptyMessage.style.display = "none";
            gridContainer.style.display = "grid";
        }
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
        const items = dropdown.querySelectorAll(".dropdown__item");

        items.forEach((item) => {
            item.addEventListener("click", () => {
                const value = item.dataset.value.toLowerCase();

                if (index === 0) selectedYear = value;
                if (index === 1) selectedFactory = value;

                filterCards();
            });
        });
    });

    if (leftButton && rightButton) {
        leftButton.addEventListener("click", () => {
            currentPage--;
            updateDisplay();
        });

        rightButton.addEventListener("click", () => {
            currentPage++;
            updateDisplay();
        });
    }

    updateDisplay();

});
