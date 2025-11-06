const factoriesHistoryData = [
  {
    name: "Полотняно-<br />Заводская бумажная<br />мануфактура",
    url: "#",
    icon: "../assets/icons/history_logo1.svg",
    img: "../assets/images/factories_history1.jpg",
    year: "1720",
    theme: "theme-beige"
  },
  {
    name: "Сухонский<br />картонно-бумажный<br />комбинат",
    url: "#",
    icon: "../assets/icons/history_logo2.svg",
    img: "../assets/images/factories_history2.jpg",
    year: "1911",
    theme: "theme-warm-white"
  },
  {
    name: "Сухонский<br />картонно-бумажный<br />комбинат",
    url: "#",
    icon: "../assets/icons/history_logo2.svg",
    img: "../assets/images/factories_history2.jpg",
    year: "1911",
    theme: "theme-warm-white"
  }
];


function createFactoriesHistoryItem(factory) {
  return `
    <div class="history-card ${factory.theme || 'theme-beige'}">
      <img src="${factory.icon}" alt="icon" class="history-card__logo" />
      <div class="history-card__header">
        <div class="history-card__title-wrapper">
          <h3 class="history-card__title">${factory.name}</h3>
          <img src="../assets/icons/arrow_brown_300.svg" alt="arrow" class="history-card__arrow" />
          <div class="history-card__content">
            <div class="history-card__year-block">
              <p class="history-card__year-label">
                Год<br />
                основания
              </p>
              <p class="history-card__year">${factory.year}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="history-card__image">
        <img src="${factory.img}" alt="${factory.name}" />
      </div>
    </div>
  `;
}


function loadFactoriesHistory() {
  const listContainer = document.querySelector(".history__slider-container");
  if (!listContainer) return;

  const factoriesHTML = factoriesHistoryData.map(createFactoriesHistoryItem).join("");
  listContainer.innerHTML = factoriesHTML;
}

window.initHistorySlider = function () {
  const sliderContainer = document.querySelector(".history__slider-container");
  const leftButton = document.querySelector("#history-button-left");
  const rightButton = document.querySelector("#history-button-right");

  if (!sliderContainer || !leftButton || !rightButton) return;

  let currentIndex = 0;
  const cards = document.querySelectorAll(".history-card");
  const totalCards = cards.length;

  if (totalCards === 0) return;

  function getVisibleCards() {
    if (window.innerWidth <= 768) {
      const containerWidth = sliderContainer.parentElement.offsetWidth;
      const cardWidth = 320;
      const gap = 12;
      return Math.floor((containerWidth + gap) / (cardWidth + gap));
    }
    return 2;
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

document.addEventListener("DOMContentLoaded", loadFactoriesHistory);