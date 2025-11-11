document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.multimedia__cards');
    const cards = document.querySelectorAll('.multimedia__card');

    const loadMoreBtn = document.querySelector('.multimedia__show-more button');
    const loadMoreText = document.querySelector('.multimedia__show-more--text');

    let currentVisibleCount = 0;

    function updateCardsVisibility() {


        if (window.innerWidth <= 768) {
            const itemsPerLoad = 3;

            if (currentVisibleCount === 0) {
                currentVisibleCount = itemsPerLoad;
            }

            cards.forEach((card, index) => {
                if (index < currentVisibleCount) {
                    card.classList.remove('multimedia__card--hidden');
                } else {
                    card.classList.add('multimedia__card--hidden');
                }
            });

            if (currentVisibleCount < cards.length) {
                loadMoreBtn.style.display = 'flex';
                loadMoreText.textContent = 'Показать еще';
            } else {
                loadMoreBtn.style.display = 'none';
                loadMoreText.textContent = '';
            }
        } else {
            cards.forEach(card => {
                card.classList.remove('multimedia__card--hidden');
            });
            if (cardsContainer.contains(loadMoreBtn)) {
                loadMoreBtn.style.display = 'none';
            }
        }
    }

    loadMoreBtn.addEventListener('click', function () {
        const isSmallMobile = window.innerWidth <= 425;
        const itemsPerLoad = isSmallMobile ? 3 : 6;

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
