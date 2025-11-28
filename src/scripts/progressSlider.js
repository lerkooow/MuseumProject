document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.progress__cards');
    let track = cardsContainer.querySelector('.progress__track');
    if (!track) {
        track = document.createElement('div');
        track.className = 'progress__track';
        while (cardsContainer.firstChild) {
            track.appendChild(cardsContainer.firstChild);
        }
        cardsContainer.appendChild(track);
    }
    const cards = Array.from(track.querySelectorAll('.progress__card'));
    const btnLeft = document.querySelector('#progress__button--left .button__arrow');
    const btnRight = document.querySelector('#progress__button--right .button__arrow');
    let current = 0;

    cardsContainer.style.position = 'relative';
    track.style.overflow = 'hidden';
    track.style.display = 'flex';
    track.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
    track.style.gap = '16px';
    track.style.alignItems = 'flex-end';


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
