function initFactorySlider({ containerSelector, leftBtnSelector, rightBtnSelector, cardSelector, desktopVisible, gap, mobileGap }) {
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
      return Math.floor((containerWidth + mobileGap) / (cardWidth + mobileGap));
    }
    return desktopVisible;
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

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth;
    const currentGap = window.innerWidth <= 768 ? mobileGap : gap;
    const offset = -(currentIndex * (cardWidth + currentGap));
    sliderContainer.style.transform = `translateX(${offset}px)`;
    updateButtonStates();
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

  updateButtonStates();
}

document.addEventListener("DOMContentLoaded", function () {
  initFactorySlider({
    containerSelector: ".anniversary__slider-container",
    leftBtnSelector: "#anniversary-button-left .button__arrow",
    rightBtnSelector: "#anniversary-button-right .button__arrow",
    cardSelector: ".anniversary-card",
    desktopVisible: 3,
    gap: 16,
    mobileGap: 12
  });

  initFactorySlider({
    containerSelector: ".history__slider-container",
    leftBtnSelector: "#history-button-left .button__arrow",
    rightBtnSelector: "#history-button-right .button__arrow",
    cardSelector: ".history-card",
    desktopVisible: 2,
    gap: 40,
    mobileGap: 12
  });
});


const filters = document.querySelector('.factories-map__filters');

if (filters) {
  filters.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      filters.scrollLeft += e.deltaY;
    }
  });
}

