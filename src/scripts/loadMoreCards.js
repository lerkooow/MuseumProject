document.addEventListener('DOMContentLoaded', function () {
    const isMultimediaPage = document.querySelector('.multimedia__cards');
    const isAwardsPage = document.querySelector('.awards__cards');

    const pagePrefix = isMultimediaPage ? 'multimedia' : 'awards';

    const cardsContainer = document.querySelector(`.${pagePrefix}__cards`);
    const cards = document.querySelectorAll(`.${pagePrefix}__card`);
    const loadMoreBtn = document.querySelector(`.${pagePrefix}__show-more button`);
    const loadMoreText = document.querySelector(`.${pagePrefix}__show-more--text`);

    let currentVisibleCount = 0;

    function updateCardsVisibility() {
        if (window.innerWidth <= 768) {
            const itemsPerLoad = 3;

            if (currentVisibleCount === 0) {
                currentVisibleCount = itemsPerLoad;
            }

            cards.forEach((card, index) => {
                if (index < currentVisibleCount) {
                    card.classList.remove(`${pagePrefix}__card--hidden`);
                } else {
                    card.classList.add(`${pagePrefix}__card--hidden`);
                }
            });

            if (currentVisibleCount < cards.length) {
                loadMoreBtn.parentElement.style.display = 'flex';
                loadMoreText.textContent = 'Показать еще';
                cardsContainer.classList.remove(`${pagePrefix}__cards--no-button`);
            } else {
                loadMoreBtn.parentElement.style.display = 'none';
                cardsContainer.classList.add(`${pagePrefix}__cards--no-button`);
            }
        } else {
            const itemsPerLoad = 12;

            if (currentVisibleCount === 0) {
                currentVisibleCount = itemsPerLoad;
            }

            cards.forEach((card, index) => {
                if (index < currentVisibleCount) {
                    card.classList.remove(`${pagePrefix}__card--hidden`);
                } else {
                    card.classList.add(`${pagePrefix}__card--hidden`);
                }
            });

            if (currentVisibleCount < cards.length) {
                loadMoreBtn.parentElement.style.display = 'flex';
                loadMoreText.textContent = 'Показать еще';
                cardsContainer.classList.remove(`${pagePrefix}__cards--no-button`);
            } else {
                loadMoreBtn.parentElement.style.display = 'none';
                cardsContainer.classList.add(`${pagePrefix}__cards--no-button`);
            }
        }
    }

    loadMoreBtn.addEventListener('click', function () {
        const itemsPerLoad = window.innerWidth <= 768 ? 3 : 12;
        currentVisibleCount += itemsPerLoad;
        updateCardsVisibility();
    });

    updateCardsVisibility();

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            currentVisibleCount = 0;
            updateCardsVisibility();
        }, 250);
    });
});
