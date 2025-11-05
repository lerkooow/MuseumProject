document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer = document.querySelector(".history__slider-container");
    const leftButton = document.querySelector("#button-container__left");
    const rightButton = document.querySelector("#button-container__right");

    if (!sliderContainer || !leftButton || !rightButton) return;

    let currentIndex = 0;
    const cards = document.querySelectorAll(".history-card");
    const totalCards = cards.length;

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 16;
        const offset = -(currentIndex * (cardWidth + gap));
        sliderContainer.style.transform = `translateX(${offset}px)`;
    }

    leftButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    rightButton.addEventListener("click", () => {
        if (currentIndex < totalCards - 2) {
            currentIndex++;
            updateSlider();
        }
    });

    window.addEventListener("resize", updateSlider);
});
