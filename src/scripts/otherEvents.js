document.addEventListener("DOMContentLoaded", function () {
    const points = Array.from(document.querySelectorAll('.other-events__point'));

    const leftButton = document.querySelector('#other-events__button--left');
    const rightButton = document.querySelector('#other-events__button--right');

    const timeline = document.querySelector('.other-events__timeline');
    let track = timeline.querySelector('.other-events__track');
    if (!track) {
        track = document.createElement('div');
        track.className = 'other-events__track';
        while (timeline.firstChild) {
            track.appendChild(timeline.firstChild);
        }
        timeline.appendChild(track);
    }

    let VISIBLE = getVisibleCount(); // начальное количество видимых
    console.log("🚀 ~ VISIBLE:", VISIBLE)

    const currentIndex = points.findIndex(p =>
        p.classList.contains('other-events__point--current')
    );

    let start = currentIndex - 1;

    function getVisibleCount() {
        const w = window.innerWidth;
        if (w < 425) return 1;
        if (w < 1024) return 2;
        return 3;
    }

    function clampStart() {
        if (start < 0) start = 0;
        if (start > points.length - VISIBLE) start = points.length - VISIBLE;
    }

    clampStart();

    track.style.display = 'flex';
    track.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
    track.style.gap = '16px';
    track.style.width = '100%';

    const parent = track.parentElement;
    if (parent) {
        parent.style.overflow = 'hidden';
        parent.style.width = '100%';
        parent.style.position = 'relative';
    }

    function updateTimeline() {
        VISIBLE = getVisibleCount();
        clampStart();

        const containerWidth = parent ? parent.offsetWidth : 0;
        const gap = 16;

        const cardWidth = containerWidth > 0
            ? Math.floor((containerWidth - gap * (VISIBLE - 1)) / VISIBLE)
            : points[0]?.offsetWidth || 0;

        const offset = -(start * (cardWidth + gap));
        track.style.transform = `translateX(${offset}px)`;

        points.forEach((p) => {
            p.style.minWidth = cardWidth + 'px';
            p.style.maxWidth = cardWidth + 'px';
            p.style.flex = '0 0 ' + cardWidth + 'px';
        });

        updateButtonStates();
    }

    function updateButtonStates() {
        leftButton.style.opacity = start === 0 ? "0.5" : "1";
        leftButton.style.cursor = start === 0 ? "not-allowed" : "pointer";

        rightButton.style.opacity = start >= points.length - VISIBLE ? "0.5" : "1";
        rightButton.style.cursor = start >= points.length - VISIBLE ? "not-allowed" : "pointer";
    }

    leftButton.addEventListener('click', () => {
        if (start > 0) {
            start--;
            updateTimeline();
        }
    });

    rightButton.addEventListener('click', () => {
        if (start < points.length - VISIBLE) {
            start++;
            updateTimeline();
        }
    });

    window.addEventListener('resize', updateTimeline);

    updateTimeline();
});
