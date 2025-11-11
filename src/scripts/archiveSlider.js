function initArchiveSlider() {
    const sliderContainer = document.querySelector(".archive__slider-container");
    const leftButton = document.querySelector("#archive-button-left .button__arrow");
    const rightButton = document.querySelector("#archive-button-right .button__arrow");
    const filterButtons = document.querySelectorAll(".archive__filter");

    if (!sliderContainer || !leftButton || !rightButton) return;

    let currentIndex = 0;
    let currentFilter = "all";
    let allCards = [];
    let filteredCards = [];

    function initCards() {
        const cards = document.querySelectorAll(".archive-card");
        allCards = Array.from(cards).map((card) => ({
            element: card,
            tags: card.dataset.tags ? card.dataset.tags.split(",") : ["all"],
        }));
        filteredCards = [...allCards];
    }

    function getVisibleCards() {
        if (window.innerWidth <= 768) {
            return 1;
        } else if (window.innerWidth <= 1024) {
            return 2;
        }
        return 4;
    }

    function filterCards(filterType) {
        currentFilter = filterType;
        currentIndex = 0;

        allCards.forEach((card) => {
            card.element.style.display = "none";
        });

        if (filterType === "all") {
            filteredCards = [...allCards];
        } else {
            filteredCards = allCards.filter((card) => card.tags.includes(filterType));
        }

        filteredCards.forEach((card) => {
            card.element.style.display = "flex";
        });

        updateSlider();
    }

    function updateSlider() {
        if (filteredCards.length === 0) return;

        const cardWidth = filteredCards[0].element.offsetWidth;
        const gap = window.innerWidth <= 768 ? 12 : 16;
        const offset = -(currentIndex * (cardWidth + gap));
        sliderContainer.style.transform = `translateX(${offset}px)`;
        updateButtonStates();
    }

    function updateButtonStates() {
        const visibleCards = getVisibleCards();
        const totalCards = filteredCards.length;

        if (currentIndex === 0) {
            leftButton.style.opacity = "0.5";
            leftButton.style.cursor = "not-allowed";
        } else {
            leftButton.style.opacity = "1";
            leftButton.style.cursor = "pointer";
        }

        if (currentIndex >= totalCards - visibleCards || totalCards <= visibleCards) {
            rightButton.style.opacity = "0.5";
            rightButton.style.cursor = "not-allowed";
        } else {
            rightButton.style.opacity = "1";
            rightButton.style.cursor = "pointer";
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

    leftButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    rightButton.addEventListener("click", () => {
        const visibleCards = getVisibleCards();
        if (currentIndex < filteredCards.length - visibleCards) {
            currentIndex++;
            updateSlider();
        }
    });

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((btn) => btn.classList.remove("active"));

            button.classList.add("active");

            let filterType = "all";
            if (button.classList.contains("heart")) {
                filterType = "heart";
            } else if (button.classList.contains("bird")) {
                filterType = "bird";
            } else if (button.classList.contains("medal")) {
                filterType = "medal";
            }

            filterCards(filterType);
        });
    });

    window.addEventListener("resize", () => {
        const visibleCards = getVisibleCards();
        if (currentIndex > filteredCards.length - visibleCards) {
            currentIndex = Math.max(0, filteredCards.length - visibleCards);
        }
        updateSlider();
    });

    initCards();
    updateFilterCounts();
    updateSlider();
}

document.addEventListener("DOMContentLoaded", initArchiveSlider);
