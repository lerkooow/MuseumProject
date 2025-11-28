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

    cardsContainer.style.overflow = 'hidden';
    cardsContainer.style.position = 'relative';
    track.style.display = 'flex';
    track.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
    track.style.gap = '16px';



    function getGapPx() {
        if (cards.length < 2) return 0;
        const first = cards[0];
        const second = cards[1];
        const gap = Math.round(second.getBoundingClientRect().left - first.getBoundingClientRect().right);
        return gap > 0 ? gap : 0;
    }

    function getCardWidthWithGap() {
        const card = cards[0];
        if (!card) return 0;
        const cardWidth = card.offsetWidth;
        const gap = getGapPx();
        return cardWidth + gap;
    }

    function getVisibleCount() {
        const containerWidth = cardsContainer.offsetWidth;
        const cardWidthWithGap = getCardWidthWithGap();
        return Math.max(1, Math.floor(containerWidth / cardWidthWithGap));
    }

    function updateSlider() {
        const cardWidthWithGap = getCardWidthWithGap();
        const visibleCount = getVisibleCount();
        if (current > cards.length - visibleCount) {
            current = Math.max(0, cards.length - visibleCount);
        }
        const offset = -(current * cardWidthWithGap);
        track.style.transform = `translateX(${offset}px)`;

        btnLeft.disabled = current === 0;
        btnRight.disabled = current >= cards.length - visibleCount;
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
        const visibleCount = getVisibleCount();
        if (current < cards.length - visibleCount) {
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
