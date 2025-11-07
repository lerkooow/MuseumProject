function initSlider() {
    const slider = document.getElementById("cardsSlider");
    if (!slider) return;

    let startX = 0;
    let isDragging = false;

    slider.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener("touchmove", e => {
        const diff = startX - e.touches[0].clientX;
        slider.scrollLeft += diff * 0.8;
        startX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener("touchend", () => startX = 0);

    slider.addEventListener("mousedown", e => {
        isDragging = true;
        startX = e.pageX;
        slider.dataset.scrollStart = slider.scrollLeft;
        e.preventDefault();
    });

    slider.addEventListener("mousemove", e => {
        if (!isDragging) return;
        const walk = (e.pageX - startX) * 2;
        slider.scrollLeft = slider.dataset.scrollStart - walk;
    });

    slider.addEventListener("mouseup", () => isDragging = false);
}

document.addEventListener("DOMContentLoaded", initSlider);
