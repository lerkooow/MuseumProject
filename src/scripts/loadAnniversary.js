const factoriesAnniversaryData = [
  {
    name: "Троицкая<br /> бумажная фабрика",
    icon: "../assets/icons/factories_logo1.svg",
    img: "../assets/images/factories_100.jpg",
    year: "1925",
    icon_year: "../assets/icons/anniversary_100.svg"

  },
  {
    name: "Балахнинская<br /> картонная фабрика",
    icon: "../assets/icons/factories_logo2.svg",
    img: "../assets/images/factories_75.jpg",
    year: "1950",
    icon_year: "../assets/icons/anniversary_75.svg"

  },
  {
    name: "Сухонский картонно-бумажный комбинат",
    icon: "../assets/icons/factories_logo3.svg",
    img: "../assets/images/factories_50.jpg",
    year: "1975",
    icon_year: "../assets/icons/anniversary_50.svg"
  },
  {
    name: "Сухонский картонно-бумажный комбинат",
    icon: "../assets/icons/factories_logo3.svg",
    img: "../assets/images/factories_50.jpg",
    year: "1975",
    icon_year: "../assets/icons/anniversary_50.svg"
  }
];


function createFactoriesAnniversaryItem(factory) {
  return `
    <div class="anniversary-card">
      <img src="${factory.img}" alt="factories" />
      <div class="anniversary-card__wrapper">
        <div class="anniversary-card__header">
          <p class="anniversary-card__year">${factory.year}</p>
          <img src="${factory.icon}" alt="factories_logo" />
          <p class="anniversary-card__text">ГОД</p>
        </div>
        <div class="anniversary-card__title">
          <p>${factory.name}</p>
          <img src="${factory.icon_year}" alt="anniversary" />
        </div>
      </div>
    </div>
  `;
}



function loadFactoriesAnniversary() {
  const listContainer = document.querySelector(".anniversary__slider-container");
  if (!listContainer) return;

  const factoriesHTML = factoriesAnniversaryData.map(createFactoriesAnniversaryItem).join("");
  listContainer.innerHTML = factoriesHTML;
}

window.initAnniversarySlider = function () {
  const sliderContainer = document.querySelector(".anniversary__slider-container");
  const leftButton = document.querySelector("#anniversary-button-left");
  const rightButton = document.querySelector("#anniversary-button-right");

  if (!sliderContainer || !leftButton || !rightButton) return;

  let currentIndex = 0;
  const cards = document.querySelectorAll(".anniversary-card");
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
    if (currentIndex < totalCards - 3) {
      currentIndex++;
      updateSlider();
    }
  });

  window.addEventListener("resize", updateSlider);
}


document.addEventListener("DOMContentLoaded", loadFactoriesAnniversary);