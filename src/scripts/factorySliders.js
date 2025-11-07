function initFactorySlider({ containerSelector, leftBtnSelector, rightBtnSelector, cardSelector, desktopVisible }) {
  const sliderContainer = document.querySelector(containerSelector);
  const leftButton = document.querySelector(leftBtnSelector);
  const rightButton = document.querySelector(rightBtnSelector);

  if (!sliderContainer || !leftButton || !rightButton) return;

  let currentIndex = 0;
  const cards = document.querySelectorAll(cardSelector);
  const totalCards = cards.length;

  if (totalCards === 0) return;

  function getVisibleCards() {
    if (window.innerWidth <= 768) {
      const containerWidth = sliderContainer.parentElement.offsetWidth;
      const cardWidth = 320;
      const gap = 12;
      return Math.floor((containerWidth + gap) / (cardWidth + gap));
    }
    return desktopVisible;
  }

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth;
    const gap = window.innerWidth <= 768 ? 12 : 16;
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
}

document.addEventListener("DOMContentLoaded", function () {
  initFactorySlider({
    containerSelector: ".anniversary__slider-container",
    leftBtnSelector: "#anniversary-button-left .button__arrow",
    rightBtnSelector: "#anniversary-button-right .button__arrow",
    cardSelector: ".anniversary-card",
    desktopVisible: 3
  });

  initFactorySlider({
    containerSelector: ".history__slider-container",
    leftBtnSelector: "#history-button-left .button__arrow",
    rightBtnSelector: "#history-button-right .button__arrow",
    cardSelector: ".history-card",
    desktopVisible: 2
  });
});
