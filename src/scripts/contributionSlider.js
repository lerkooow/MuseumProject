function initContributionSlider() {
    const sliderContainer = document.querySelector(".contribution__slider-container");
    const leftButton = document.querySelector("#contribution-button-left .button__arrow");
    const rightButton = document.querySelector("#contribution-button-right .button__arrow");

    if (!sliderContainer || !leftButton || !rightButton) return;

    let currentIndex = 0;
    const cards = document.querySelectorAll(".contribution-card");
    const totalCards = cards.length;

    if (totalCards === 0) return;

    function getVisibleCards() {
        if (window.innerWidth <= 430) {
            return 1;
        } else if (window.innerWidth <= 1024) {
            return 2;
        }
        return 4;
    }

    function updateSlider() {
        if (cards.length === 0) return;

        const cardWidth = cards[0].offsetWidth;
        const gap = window.innerWidth <= 768 ? 12 : 16;
        const offset = -(currentIndex * (cardWidth + gap));
        sliderContainer.style.transform = `translateX(${offset}px)`;
        updateButtonStates();
    }

    function updateButtonStates() {
        const visibleCards = getVisibleCards();

        if (currentIndex === 0) {
            leftButton.style.opacity = "0.5";
            leftButton.style.cursor = "not-allowed";
        } else {
            leftButton.style.opacity = "1";
            leftButton.style.cursor = "pointer";
        }

        if (currentIndex >= totalCards - visibleCards) {
            rightButton.style.opacity = "0.5";
            rightButton.style.cursor = "not-allowed";
        } else {
            rightButton.style.opacity = "1";
            rightButton.style.cursor = "pointer";
        }
    }

    leftButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    rightButton.addEventListener("click", () => {
        const visibleCards = getVisibleCards();
        if (currentIndex < totalCards - visibleCards) {
            currentIndex++;
            updateSlider();
        }
    });

    window.addEventListener("resize", () => {
        const visibleCards = getVisibleCards();
        if (currentIndex > totalCards - visibleCards) {
            currentIndex = Math.max(0, totalCards - visibleCards);
        }
        updateSlider();
    });

    updateSlider();
}

document.addEventListener("DOMContentLoaded", initContributionSlider);
