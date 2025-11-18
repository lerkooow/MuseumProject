document.addEventListener('DOMContentLoaded', function () {
    const timelineItems = document.querySelectorAll('.timeline__item');
    const cards = document.querySelectorAll('.history-equipment .interactive-cards');
    const allCardNodes = Array.from(document.querySelectorAll('.history-equipment .interactive-card'));

    if (!timelineItems.length || !cards.length) return;

    const years = Array.from(timelineItems).map(item => {
        const yearNode = item.querySelector('.timeline__year');
        return yearNode ? yearNode.textContent.trim() : '';
    });

    function showCardsForYear(idx) {
        const year = years[idx];
        allCardNodes.forEach(card => {
            card.style.display = 'none';
        });
        let shown = 0;
        for (let card of allCardNodes) {
            const cardYears = (card.getAttribute('data-years') || '').split(',').map(y => y.trim());
            if (cardYears.includes(year) && shown < 3) {
                card.style.display = '';
                shown++;
            }
        }
        cards.forEach(container => {
            const hasVisible = Array.from(container.querySelectorAll('.interactive-card')).some(card => card.style.display !== 'none');
            container.style.display = hasVisible ? '' : 'none';
        });
        timelineItems.forEach((item, i) => {
            item.classList.toggle('active', i === idx);
            const year = item.querySelector('.timeline__year');
            if (year) year.classList.toggle('active', i === idx);
            const circle = item.querySelector('img');
            if (circle) circle.src = i === idx ? '../assets/icons/circle_active.svg' : '../assets/icons/circle.svg';
        });
    }

    showCardsForYear(0);

    timelineItems.forEach((item, idx) => {
        item.addEventListener('click', () => {
            showCardsForYear(idx);
        });
    });

    showCard(0);

    timelineItems.forEach((item, idx) => {
        item.addEventListener('click', () => {
            showCard(idx);
        });
    });
});
