document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.querySelector('.documents__show-more');
    const cards = document.querySelectorAll('.documents-card');
    let cardsPerPage;

    if (window.innerWidth <= 645) {
        cardsPerPage = 3;
    } else {
        cardsPerPage = 6;
    }
    let currentPage = 1;

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
});
