document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer = document.querySelector(".dynasty__slider-container");
    const leftButton = document.querySelector("#dynasty-button-left");
    const rightButton = document.querySelector("#dynasty-button-right");

    if (!sliderContainer || !leftButton || !rightButton) {
        return;
    }

    const cards = sliderContainer.querySelectorAll(".dynasty-card");
    const totalCards = cards.length;
    const cardsPerView = 3;
    let currentIndex = 0;

    function getCardWidth() {
        return cards[0].offsetWidth;
    }

    function updateSlider() {
        const cardWidth = getCardWidth();
        const gap = 24;
        const offset = currentIndex * (cardWidth + gap);
        sliderContainer.style.transform = `translateX(-${offset}px)`;
    }

    leftButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    rightButton.addEventListener("click", function () {
        const maxIndex = Math.max(0, totalCards - cardsPerView);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    window.addEventListener("resize", function () {
        updateSlider();
    });
});
