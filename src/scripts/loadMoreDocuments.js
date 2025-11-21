document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.querySelector('.documents__show-more');
    const cards = document.querySelectorAll('.documents-card');
    let cardsPerPage;
    let currentPage = 1;

    function getCardsPerPage() {
        if (window.innerWidth <= 600) {
            return 3;
        } else if (window.innerWidth <= 768) {
            return 4;
        } else {
            return 6;
        }
    }

    function showCards() {
        const endIndex = currentPage * cardsPerPage;
        cards.forEach((card, index) => {
            if (index < endIndex) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        if (endIndex >= cards.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'flex';
        }
    }

    function recalcAndShow() {
        const oldCardsPerPage = cardsPerPage;
        cardsPerPage = getCardsPerPage();
        currentPage = Math.ceil(Array.from(cards).filter(card => !card.classList.contains('hidden')).length / cardsPerPage) || 1;
        showCards();
    }

    cardsPerPage = getCardsPerPage();
    showCards();

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            currentPage++;
            showCards();
            const firstNewCardIndex = (currentPage - 1) * cardsPerPage;
            if (cards[firstNewCardIndex]) {
                setTimeout(() => {
                    cards[firstNewCardIndex].scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 100);
            }
        });
    }

    window.addEventListener('resize', recalcAndShow);
});
