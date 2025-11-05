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

    initSlider();
}

function initSlider() {
    const sliderContainer = document.querySelector(".history__slider-container");
    const leftButton = document.querySelector("#button-container__left");
    const rightButton = document.querySelector("#button-container__right");

    if (!sliderContainer || !leftButton || !rightButton) return;

    let currentIndex = 0;
    const cards = document.querySelectorAll(".history-card");
    const totalCards = cards.length;

    if (totalCards === 0) return;

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
}

document.addEventListener("DOMContentLoaded", loadFactoriesHistory);