document.addEventListener('DOMContentLoaded', function () {
    const sliderSection = document.querySelector('.photo-gallery');
    if (!sliderSection) return;

    const slides = Array.from(sliderSection.querySelectorAll('.photo-gallery__images'));
    if (slides.length === 0) return;

    let current = 0;

    const leftBtn = document.querySelector('#photo-gallery__button--left .button__arrow');
    const rightBtn = document.querySelector('#photo-gallery__button--right .button__arrow');

    function updateSlider() {
        slides.forEach((slide, idx) => {
            slide.style.display = idx === current ? '' : 'none';
        });

        if (slides.length <= 1) {
            if (leftBtn) {
                leftBtn.disabled = true;
                leftBtn.style.opacity = '0.5';
            }
            if (rightBtn) {
                rightBtn.disabled = true;
                rightBtn.style.opacity = '0.5';
            }
        } else {
            if (leftBtn) {
                leftBtn.disabled = current === 0;
                leftBtn.style.opacity = leftBtn.disabled ? '0.5' : '1';
            }
            if (rightBtn) {
                rightBtn.disabled = current === slides.length - 1;
                rightBtn.style.opacity = rightBtn.disabled ? '0.5' : '1';
            }
        }
    }

    updateSlider();

    if (leftBtn) {
        leftBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (slides.length > 1 && current > 0) {
                current--;
                updateSlider();
            }
        });
    }
    if (rightBtn) {
        rightBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (slides.length > 1 && current < slides.length - 1) {
                current++;
                updateSlider();
            }
        });
    }
});
