document.addEventListener('DOMContentLoaded', function () {
    const timelineItems = document.querySelectorAll('.timeline__item');
    const wrappers = document.querySelectorAll('.equipment__wrapper');
    if (!timelineItems.length || !wrappers.length) return;

    const years = Array.from(timelineItems).map(item => {
        const yearNode = item.querySelector('.timeline__year');
        return yearNode ? yearNode.textContent.trim() : '';
    });

    function showWrappersForYear(idx) {
        const year = years[idx];
        wrappers.forEach(wrapper => {
            const wrapperYears = (wrapper.getAttribute('data-years') || '').split(',').map(y => y.trim());
            wrapper.parentElement.style.display = wrapperYears.includes(year) ? '' : 'none';
        });
        timelineItems.forEach((item, i) => {
            item.classList.toggle('active', i === idx);
            const yearEl = item.querySelector('.timeline__year');
            if (yearEl) yearEl.classList.toggle('active', i === idx);
            const circle = item.querySelector('img');
            if (circle) circle.src = i === idx ? '../assets/icons/circle_active.svg' : '../assets/icons/circle.svg';
        });
    }

    showWrappersForYear(0);

    timelineItems.forEach((item, idx) => {
        item.addEventListener('click', () => {
            showWrappersForYear(idx);
        });
    });
});
