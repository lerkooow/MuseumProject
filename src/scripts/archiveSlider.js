function initArchiveSlider() {
    const sliderContainer = document.querySelector(".archive__slider-container");
    const leftButton = document.querySelector("#archive-button-left .button__arrow");
    const rightButton = document.querySelector("#archive-button-right .button__arrow");

    if (!sliderContainer || !leftButton || !rightButton) return;

    if (typeof window.currentIndex === "undefined") {
        window.currentIndex = 0;
    }

    function getVisibleCards() {
        if (window.innerWidth <= 768) {
            return 1;
        } else if (window.innerWidth <= 1024) {
            return 2;
        }
        return 4;
    }

    function updateSlider() {
        if (typeof window.filteredCards === "undefined" || window.filteredCards.length === 0) return;

        const cardWidth = window.filteredCards[0].element.offsetWidth;
        const gap = window.innerWidth <= 768 ? 12 : 16;
        const offset = -(window.currentIndex * (cardWidth + gap));

        sliderContainer.style.transform = `translateX(${offset}px)`;
        updateButtonStates();
    }

    function updateButtonStates() {
        const visibleCards = getVisibleCards();
        const totalCards = window.filteredCards.length;

        if (window.currentIndex === 0) {
            leftButton.style.opacity = "0.5";
            leftButton.style.cursor = "not-allowed";
        } else {
            leftButton.style.opacity = "1";
            leftButton.style.cursor = "pointer";
        }

        if (window.currentIndex >= totalCards - visibleCards || totalCards <= visibleCards) {
            rightButton.style.opacity = "0.5";
            rightButton.style.cursor = "not-allowed";
        } else {
            rightButton.style.opacity = "1";
            rightButton.style.cursor = "pointer";
        }
    }

    leftButton.addEventListener("click", () => {
        if (window.currentIndex > 0) {
            window.currentIndex--;
            updateSlider();
        }
    });

    rightButton.addEventListener("click", () => {
        const visibleCards = getVisibleCards();
        if (window.currentIndex < window.filteredCards.length - visibleCards) {
            window.currentIndex++;
            updateSlider();
        }
    });

    window.addEventListener("resize", () => {
        const visibleCards = getVisibleCards();
        if (window.currentIndex > window.filteredCards.length - visibleCards) {
            window.currentIndex = Math.max(0, window.filteredCards.length - visibleCards);
        }
        updateSlider();
    });

    if (typeof window !== "undefined") {
        window.updateSlider = updateSlider;
    }

    updateSlider();
}

document.addEventListener("DOMContentLoaded", () => {
    initArchiveSlider();
});
