document.addEventListener('DOMContentLoaded', function () {
    const timeline = document.querySelector('.other-events__timeline');
    if (!timeline) return;

    let track = timeline.querySelector('.other-events__track');

    if (!track) {
        track = document.createElement('div');
        track.className = 'other-events__track';
        while (timeline.firstChild) {
            track.appendChild(timeline.firstChild);
        }
        timeline.appendChild(track);
    }

    const points = Array.from(track.querySelectorAll('.other-events__point'));
    const btnLeft = document.querySelector('#other-events__button--left .button__arrow');
    const btnRight = document.querySelector('#other-events__button--right .button__arrow');
    let current = 0;

    timeline.style.overflow = 'hidden';
    timeline.style.position = 'relative';

    track.style.display = 'flex';
    track.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
    track.style.gap = '90px';
    track.style.width = '100%';
    track.style.justifyContent = 'space-between';

    function getPointWidthWithGap() {
        const el = points[0];
        if (!el) return 0;
        const width = el.offsetWidth;
        const trackStyle = window.getComputedStyle(track);
        let gap = 0;
        if (trackStyle.gap && trackStyle.gap !== 'normal') {
            gap = parseInt(trackStyle.gap) || 0;
        }
        return width + gap;
    }

    function getVisibleCount() {
        const containerWidth = timeline.offsetWidth;
        const w = getPointWidthWithGap();
        return Math.max(1, Math.floor(containerWidth / w));
    }

    function updateSlider() {
        const w = getPointWidthWithGap();
        const visible = getVisibleCount();

        if (current > points.length - visible) {
            current = Math.max(0, points.length - visible);
        }

        const offset = -(current * w);
        track.style.transform = `translateX(${offset}px)`;

        btnLeft.disabled = current === 0;
        btnRight.disabled = current >= points.length - visible;

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
        const visible = getVisibleCount();
        if (current < points.length - visible) {
            current++;
            updateSlider();
        }
    });

    window.addEventListener('resize', function () {
        if (current > points.length - getVisibleCount()) {
            current = Math.max(0, points.length - getVisibleCount());
        }
        updateSlider();
    });

    const currentPoint = track.querySelector('.other-events__point--current');
    if (currentPoint) {
        const currentIndex = points.indexOf(currentPoint);
        const visible = getVisibleCount();
        if (currentIndex !== -1) {
            if (currentIndex < 0) {
                current = 0;
            } else if (currentIndex > points.length - visible) {
                current = Math.max(0, points.length - visible);
            } else {
                current = currentIndex - Math.floor(visible / 2);
                if (current < 0) current = 0;
                if (current > points.length - visible) current = Math.max(0, points.length - visible);
            }
        }
    }
    updateSlider();
});
