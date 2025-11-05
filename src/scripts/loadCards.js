const cardsData = [
    {
        title: "Фабрики",
        subtitle: "10 предприятий",
        image: "../assets/images/factories.jpg",
        description: "Столетия труда, технологический прогресс и награды",
        theme: "theme-beige",
        date: "",
        url: "factories.html",
    },
    {
        title: "Люди",
        subtitle: "Верившие в историю",
        image: "../assets/images/people.jpg",
        description: "Становление, вклад в развитие и семейные традиции",
        theme: "theme-warm-white",
        date: "",
        url: "#people",
    },
    {
        title: "Событие",
        subtitle: "В этот день в истории",
        image: "../assets/images/event.jpg",
        description: "Пуск новой линии\n на Сухонском картонно-\nбумажном комбинате",
        theme: "theme-warm-beige",
        date: "2 июля 1974 года",
        url: "#event",
    },
];

function createCard(data) {
    return `
        <a class="card ${data.theme}" href="${data.url || '#'}">
            <div class="card__container">
                <div class="card__header">
                    <img src="../assets/icons/lines_long.svg" alt="lines" />
                    <h2 class="card__title">${data.title}</h2>
                    <p class="card__subtitle">${data.subtitle}</p>
                </div>
                <div class="card__image">
                    <img src="${data.image}" alt="${data.title}">
                </div>
                <div class="card__footer">
                    <p class="${data.title === "Событие" ? "card__description--event" : "card__description"}">${data.description}</p>
                    ${data.date ? `<p class="card__date">${data.date}</p>` : ''}
                </div>
            </div>
        </a>
    `;
}

function loadCards() {
    const container = document.getElementById("cardsContainer");
    if (!container || !cardsData || cardsData.length === 0) return;

    container.innerHTML = cardsData.map(createCard).join("");
    initSlider();
}

function initSlider() {
    const slider = document.getElementById("cardsSlider");
    if (!slider) return;

    let startX = 0;
    let isDragging = false;
    let scrollStart = 0;

    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchmove', e => {
        if (!startX) return;
        const diff = startX - e.touches[0].clientX;
        slider.scrollLeft += diff * 0.8;
        startX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', () => startX = 0);

    slider.addEventListener('mousedown', e => {
        isDragging = true;
        scrollStart = slider.scrollLeft;
        startX = e.pageX;
        e.preventDefault();
    });

    slider.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const walk = (e.pageX - startX) * 2;
        slider.scrollLeft = scrollStart - walk;
    });

    slider.addEventListener('mouseup', () => {
        isDragging = false;
    });

    slider.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    slider.style.userSelect = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    loadCards();
});
