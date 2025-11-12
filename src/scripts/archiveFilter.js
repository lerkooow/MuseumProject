let currentFilter = "all";
let allCards = [];

if (typeof window.filteredCards === "undefined") {
    window.filteredCards = [];
}
if (typeof window.currentIndex === "undefined") {
    window.currentIndex = 0;
}

function initCards() {
    const cards = document.querySelectorAll(".archive-card");
    allCards = Array.from(cards).map((card) => ({
        element: card,
        tags: card.dataset.tags ? card.dataset.tags.split(",") : ["all"],
    }));
    window.filteredCards = [...allCards];
}

function filterCards(filterType) {
    currentFilter = filterType;
    window.currentIndex = 0;

    allCards.forEach((card) => {
        card.element.style.display = "none";
    });

    if (filterType === "all") {
        window.filteredCards = [...allCards];
    } else {
        window.filteredCards = allCards.filter((card) => card.tags.includes(filterType));
    }

    window.filteredCards.forEach((card) => {
        card.element.style.display = "flex";
    });

    if (typeof window.updateSlider === "function") {
        window.updateSlider();
    }
}

function updateFilterCounts() {
    const heartCount = allCards.filter((card) => card.tags.includes("heart")).length;
    const birdCount = allCards.filter((card) => card.tags.includes("bird")).length;
    const medalCount = allCards.filter((card) => card.tags.includes("medal")).length;

    document.querySelector(".archive__filter.heart span").textContent = heartCount;
    document.querySelector(".archive__filter.bird span").textContent = birdCount;
    document.querySelector(".archive__filter.medal span").textContent = medalCount;
}

const filterButtons = document.querySelectorAll(".archive__filter");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        let filterType = "all";

        if (button.classList.contains("active")) {
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            filterType = "all";
        } else {
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            if (button.classList.contains("heart")) {
                filterType = "heart";
            } else if (button.classList.contains("bird")) {
                filterType = "bird";
            } else if (button.classList.contains("medal")) {
                filterType = "medal";
            }
        }

        filterCards(filterType);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    initCards();
    updateFilterCounts();
});
