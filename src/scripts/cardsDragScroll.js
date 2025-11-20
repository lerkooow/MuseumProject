document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.cards__slider');
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('is-dragging');
        startX = e.clientX;
        scrollLeft = slider.scrollLeft;
        e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('is-dragging');
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('is-dragging');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.clientX;
        const walk = (x - startX) * 1.2;
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        isDown = true;
        startX = e.touches[0].clientX;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown || e.touches.length !== 1) return;
        const x = e.touches[0].clientX;
        const walk = (x - startX) * 1.2;
        slider.scrollLeft = scrollLeft - walk;
    });
});
