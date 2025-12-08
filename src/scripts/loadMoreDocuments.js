document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.querySelector('.documents__show-more');
    const cards = Array.from(document.querySelectorAll('.documents-card'));
    if (!cards.length) {
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }
    let cardsPerPage = getCardsPerPage();
    let currentPage = 1;

    function getCardsPerPage() {
        const w = window.innerWidth;
        if (w <= 600) return 3;
        if (w <= 768) return 4;
        return 6;
    }

    function showCards() {
        const endIndex = currentPage * cardsPerPage;
        cards.forEach((card, index) => {
            card.classList.toggle('hidden', index >= endIndex);
        });
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex >= cards.length ? 'none' : 'flex';
        }
    }

    function recalcAndShow() {
        const newCardsPerPage = getCardsPerPage();
        if (newCardsPerPage !== cardsPerPage) {
            const firstVisibleIndex = cards.findIndex(c => !c.classList.contains('hidden'));
            const visibleIndex = firstVisibleIndex === -1 ? 0 : firstVisibleIndex;
            cardsPerPage = newCardsPerPage;
            currentPage = Math.floor(visibleIndex / cardsPerPage) + 1;
            if (currentPage < 1) currentPage = 1;
        }
        showCards();
    }

    cards.forEach(card => card.classList.add('hidden'));
    showCards();

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            currentPage++;
            showCards();
            const firstNewCardIndex = (currentPage - 1) * cardsPerPage;
            const firstNewCard = cards[firstNewCardIndex];
            if (firstNewCard) {
                setTimeout(() => {
                    firstNewCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        });
    }

    window.addEventListener('resize', recalcAndShow);
    if (window.ResizeObserver) {
        try {
            const ro = new ResizeObserver(recalcAndShow);
            ro.observe(document.documentElement);
        } catch (e) { }
    }
});
