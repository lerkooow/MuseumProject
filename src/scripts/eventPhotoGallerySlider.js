document.addEventListener('DOMContentLoaded', function () {
    const gallerySection = document.querySelector('.event__photo-gallery_items');
    if (gallerySection) {
        const slides = Array.from(gallerySection.querySelectorAll('.event__photo-gallery_content'));
        let current = 0;
        const leftBtn = document.querySelector('#event__photo-gallery_button--left .button__arrow');
        const rightBtn = document.querySelector('#event__photo-gallery_button--right .button__arrow');

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
    }

    const mobileGallery = document.querySelector('.event__photo-gallery.event__photo-gallery--mobile');
    if (mobileGallery) {
        const track = mobileGallery.querySelector('.event__photo-gallery_track');
        if (!track) return;
        const slides = Array.from(track.querySelectorAll('.event__photo-gallery_wrapper'));
        let current = 0;
        const leftBtn = mobileGallery.querySelector('#event__photo-gallery_button--left .button__arrow');
        const rightBtn = mobileGallery.querySelector('#event__photo-gallery_button--right .button__arrow');

        function getCardWidthWithGap() {
            const card = slides[0];
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
            const containerWidth = mobileGallery.offsetWidth;
            const cardWidthWithGap = getCardWidthWithGap();
            return Math.max(1, Math.floor(containerWidth / cardWidthWithGap));
        }

        function updateMobileSlider() {
            const cardWidthWithGap = getCardWidthWithGap();
            const visibleCount = getVisibleCount();
            if (current > slides.length - visibleCount) {
                current = Math.max(0, slides.length - visibleCount);
            }
            track.style.display = 'flex';
            track.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
            const offset = -(current * cardWidthWithGap);
            track.style.transform = `translateX(${offset}px)`;

            slides.forEach((slide) => {
                slide.style.display = '';
            });

            if (slides.length <= visibleCount) {
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
                    rightBtn.disabled = current >= slides.length - visibleCount;
                    rightBtn.style.opacity = rightBtn.disabled ? '0.5' : '1';
                }
            }
        }

        updateMobileSlider();
        window.addEventListener('resize', updateMobileSlider);

        if (leftBtn) {
            leftBtn.addEventListener('click', function (e) {
                e.preventDefault();
                if (slides.length > getVisibleCount() && current > 0) {
                    current--;
                    updateMobileSlider();
                }
            });
        }
        if (rightBtn) {
            rightBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const visibleCount = getVisibleCount();
                if (slides.length > visibleCount && current < slides.length - visibleCount) {
                    current++;
                    updateMobileSlider();
                }
            });
        }
    }
});
