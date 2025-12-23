document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.interactive-cards');
    const showMoreBtn = document.querySelector('.documents__show-more');
    const allCards = Array.from(document.querySelectorAll('.interactive-card'));

    let baseCardsToShow = getCardsToShow();
    let currentVisibleCount = baseCardsToShow;

    function getCardsToShow() {
        const width = window.innerWidth;
        if (width <= 600) return 3;
        if (width <= 768) return 4;
        return 6;
    }

    function updateCardDisplay() {
        allCards.forEach((card, index) => {
            if (index < currentVisibleCount) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        if (currentVisibleCount >= allCards.length) {
            showMoreBtn.style.display = 'none';
            cardsContainer.style.marginBottom = 'clamp(40px, 11vw, 220px)';
        } else {
            showMoreBtn.style.display = 'flex';
            cardsContainer.style.marginBottom = '';
        }
    }

    function handleShowMore() {
        currentVisibleCount = Math.min(
            currentVisibleCount + baseCardsToShow,
            allCards.length
        );
        updateCardDisplay();
    }

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', handleShowMore);
    }

    window.addEventListener('resize', () => {
        const newBase = getCardsToShow();

        if (newBase !== baseCardsToShow) {
            const multiplier = Math.ceil(currentVisibleCount / baseCardsToShow);

            baseCardsToShow = newBase;
            currentVisibleCount = Math.min(
                baseCardsToShow * multiplier,
                allCards.length
            );

            updateCardDisplay();
        }
    });

    updateCardDisplay();
});
