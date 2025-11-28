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

    const mobileSlider = sliderSection.querySelector('.photo-gallery__images--mobile');
    if (mobileSlider) {
        let track = mobileSlider.querySelector('.photo-gallery__track');
        if (!track) {
            track = document.createElement('div');
            track.className = 'photo-gallery__track';
            while (mobileSlider.firstChild) {
                track.appendChild(mobileSlider.firstChild);
            }
            mobileSlider.appendChild(track);
        }
        const cards = Array.from(track.querySelectorAll('.photo-gallery__images_wrapper'));
        let current = 0;

        mobileSlider.style.overflow = 'hidden';
        mobileSlider.style.position = 'relative';
        track.style.display = 'flex';
        track.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
        track.style.gap = '16px';


        function getCardWidthWithGap() {
            const card = cards[0];
            if (!card) return 0;
            const cardWidth = card.offsetWidth;
            const trackStyle = window.getComputedStyle(track);
            let gap = 0;
            if (trackStyle.gap && trackStyle.gap !== 'normal') {
                gap = parseInt(trackStyle.gap) || 0;
            }
            return cardWidth + gap;
        }

        function getVisibleCount() {
            const containerWidth = mobileSlider.offsetWidth;
            const cardWidthWithGap = getCardWidthWithGap();
            return Math.max(1, Math.floor(containerWidth / cardWidthWithGap));
        }

        function updateMobileSlider() {
            const cardWidthWithGap = getCardWidthWithGap();
            const visibleCount = getVisibleCount();
            if (current > cards.length - visibleCount) {
                current = Math.max(0, cards.length - visibleCount);
            }
            const offset = -(current * cardWidthWithGap);
            track.style.transform = `translateX(${offset}px)`;

            if (leftBtn) {
                leftBtn.disabled = current === 0;
                leftBtn.style.opacity = leftBtn.disabled ? '0.5' : '1';
            }
            if (rightBtn) {
                rightBtn.disabled = current >= cards.length - visibleCount;
                rightBtn.style.opacity = rightBtn.disabled ? '0.5' : '1';
            }
        }

        function handleMobileSlider() {
            if (window.innerWidth <= 1024) {
                mobileSlider.style.display = '';
                slides.forEach(slide => slide.style.display = 'none');
                updateMobileSlider();
            } else {
                mobileSlider.style.display = 'none';
                updateSlider();
            }
        }

        handleMobileSlider();
        window.addEventListener('resize', function () {
            if (window.innerWidth <= 1024) {
                updateMobileSlider();
            }
            handleMobileSlider();
        });

        if (leftBtn) {
            leftBtn.addEventListener('click', function (e) {
                if (window.innerWidth > 1024) return;
                e.preventDefault();
                if (current > 0) {
                    current--;
                    updateMobileSlider();
                }
            });
        }
        if (rightBtn) {
            rightBtn.addEventListener('click', function (e) {
                if (window.innerWidth > 1024) return;
                e.preventDefault();
                const visibleCount = getVisibleCount();
                if (current < cards.length - visibleCount) {
                    current++;
                    updateMobileSlider();
                }
            });
        }
    }
});
