document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.factory-history__cards');
    let track = cardsContainer.querySelector('.factory-history__track');

    if (!track) {
        track = document.createElement('div');
        track.className = 'factory-history__track';
        while (cardsContainer.firstChild) {
            track.appendChild(cardsContainer.firstChild);
        }
        cardsContainer.appendChild(track);
    }

    const cards = Array.from(track.querySelectorAll('.factory-history__card'));
    const btnLeft = document.querySelector('#factory-history__button--left .button__arrow');
    const btnRight = document.querySelector('#factory-history__button--right .button__arrow');

    let current = 0;
    const STEP = 3;

    cardsContainer.style.overflow = 'hidden';
    cardsContainer.style.position = 'relative';
    track.style.display = 'flex';
    track.style.transition = 'transform 0.8s cubic-bezier(.4,0,.2,1)';
    track.style.gap = '16px';

    function getGapPx() {
        if (cards.length < 2) return 0;
        const first = cards[0];
        const second = cards[1];
        const gap = Math.round(
            second.getBoundingClientRect().left - first.getBoundingClientRect().right
        );
        return gap > 0 ? gap : 0;
    }

    function getCardWidthWithGap() {
        const card = cards[0];
        if (!card) return 0;
        return card.offsetWidth + getGapPx();
    }

    function getVisibleCount() {
        const containerWidth = cardsContainer.offsetWidth;
        return Math.max(1, Math.floor(containerWidth / getCardWidthWithGap()));
    }

    function updateSlider() {
        const visibleCount = getVisibleCount();
        const maxIndex = Math.max(0, cards.length - visibleCount);

        current = Math.min(Math.max(current, 0), maxIndex);

        const offset = -(current * getCardWidthWithGap());
        track.style.transform = `translateX(${offset}px)`;

        btnLeft.disabled = current === 0;
        btnRight.disabled = current >= maxIndex;

        btnLeft.style.opacity = btnLeft.disabled ? '0.5' : '1';
        btnRight.style.opacity = btnRight.disabled ? '0.5' : '1';
    }

    btnLeft.addEventListener('click', () => {
        current -= STEP;
        updateSlider();
    });

    btnRight.addEventListener('click', () => {
        current += STEP;
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);

    updateSlider();
});
