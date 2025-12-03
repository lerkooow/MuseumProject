document.addEventListener('DOMContentLoaded', function () {
    const gallerySection = document.querySelector('.event__photo-gallery--mobile');
    if (!gallerySection) return;

    const content = gallerySection.querySelector('.event__photo-gallery_content--mobile');
    const track = content.querySelector('.event__photo-gallery_track');
    const cards = Array.from(track.querySelectorAll('.event__photo-gallery_wrapper--mobile'));

    const btnLeft = gallerySection.querySelector('#event__photo-gallery_button--left button');
    const btnRight = gallerySection.querySelector('#event__photo-gallery_button--right button');

    let currentIndex = 0;
    let cardWidth = 0;
    let gap = 16;

    function measureWidth() {
        gap = 16;
        cardWidth = cards[0].offsetWidth + gap;
    }

    function updateSlider() {
        measureWidth();
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        btnLeft.disabled = currentIndex === 0;
        btnRight.disabled = currentIndex === cards.length - 1;

        btnLeft.style.opacity = btnLeft.disabled ? '0.5' : '1';
        btnRight.style.opacity = btnRight.disabled ? '0.5' : '1';
    }

    btnLeft.addEventListener('click', () => {
        if (currentIndex > 0) currentIndex--;
        updateSlider();
    });

    btnRight.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) currentIndex++;
        updateSlider();
    });

    track.style.display = 'flex';
    track.style.gap = '16px';
    track.style.transition = 'transform 0.4s ease';

    content.style.overflow = 'hidden';

    updateSlider();
});
