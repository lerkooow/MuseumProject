document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.factory-people__cards');
    let track = cardsContainer.querySelector('.factory-people__track');
    if (!track) {
        track = document.createElement('div');
        track.className = 'factory-people__track';
        while (cardsContainer.firstChild) {
            track.appendChild(cardsContainer.firstChild);
        }
        cardsContainer.appendChild(track);
    }
    const cards = Array.from(track.querySelectorAll('.factory-people__card'));
    const btnLeft = document.querySelector('#factory-people__button--left .button__arrow');
    const btnRight = document.querySelector('#factory-people__button--right .button__arrow');
    let current = 0;

    cardsContainer.style.overflow = 'hidden';
    cardsContainer.style.position = 'relative';
    track.style.display = 'flex';
    track.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
    track.style.gap = '16px';

    function getCardWidth() {
        const card = cards[0];
        const style = window.getComputedStyle(card);
        const width = card.offsetWidth;
        const marginRight = parseInt(style.marginRight) || 0;
        return width + marginRight;
    }

    function getVisibleCount() {
        const containerWidth = cardsContainer.offsetWidth;
        const cardWidth = getCardWidth();
        return Math.max(1, Math.floor(containerWidth / cardWidth));
    }

    function updateSlider() {
        const cardWidth = getCardWidth();
        const offset = -(current * cardWidth);
        track.style.transform = `translateX(${offset}px)`;

        btnLeft.disabled = current === 0;
        btnRight.disabled = current >= cards.length - getVisibleCount();
        btnLeft.style.opacity = btnLeft.disabled ? '0.5' : '1';
        btnRight.style.opacity = btnRight.disabled ? '0.5' : '1';
    }

    btnLeft.addEventListener('click', function () {
        if (current > 0) {
            current--;
            updateSlider();
        }
    });
    btnRight.addEventListener('click', function () {
        if (current < cards.length - getVisibleCount()) {
            current++;
            updateSlider();
        }
    });

    window.addEventListener('resize', function () {
        if (current > cards.length - getVisibleCount()) {
            current = Math.max(0, cards.length - getVisibleCount());
        }
        updateSlider();
    });

    updateSlider();
});
