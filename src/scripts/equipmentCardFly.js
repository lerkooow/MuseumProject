document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.equipment__cards').forEach(cardsBlock => {
        const rightBtn = cardsBlock.querySelector('.button__arrow.right');
        const leftBtn = cardsBlock.querySelector('.button__arrow.left');
        const wrapper = cardsBlock.querySelector('.equipment__wrapper');

        if (!rightBtn || !leftBtn || !wrapper) return;

        const cardImg = wrapper.querySelector('.equipment__card-image--main');
        const imageBlock = wrapper.querySelector('.equipment__image img');

        if (!cardImg || !imageBlock) return;

        let originalSrc = imageBlock.src;
        let isShown = false;
        let isAnimating = false;

        function getZIndexBelowInfo() {
            return 2;
        }

        function getTransform(fromRect, toRect) {
            const scaleX = toRect.width / fromRect.width;
            const scaleY = toRect.height / fromRect.height;
            const translateX = (toRect.left + toRect.width / 2) - (fromRect.left + fromRect.width / 2);
            const translateY = (toRect.top + toRect.height / 2) - (fromRect.top + fromRect.height / 2);
            return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
        }

        rightBtn.addEventListener('click', () => {
            if (isShown || isAnimating) return;
            isAnimating = true;
            isShown = true;

            const fly = cardImg.cloneNode(true);
            const fromRect = cardImg.getBoundingClientRect();
            const toRect = imageBlock.getBoundingClientRect();

            const fromStyle = window.getComputedStyle(cardImg);

            fly.style.position = 'fixed';
            fly.style.left = fromRect.left + 'px';
            fly.style.top = fromRect.top + 'px';
            fly.style.width = fromRect.width + 'px';
            fly.style.height = fromRect.height + 'px';
            fly.style.margin = '0';
            fly.style.padding = '0';
            fly.style.objectFit = fromStyle.objectFit;
            fly.style.pointerEvents = 'none';
            fly.style.zIndex = getZIndexBelowInfo();
            fly.style.transition = 'transform 1.8s ease-in-out';
            fly.style.transformOrigin = 'center center';
            fly.style.transform = 'rotate(-4deg)';
            fly.style.opacity = '1';

            document.body.appendChild(fly);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    fly.style.transform = getTransform(fromRect, toRect);
                });
            });

            fly.addEventListener('transitionend', (e) => {
                if (e.propertyName === 'transform') {
                    imageBlock.src = cardImg.src;

                    setTimeout(() => {
                        fly.remove();
                        isAnimating = false;
                    }, 50);
                }
            }, { once: true });
        });

        leftBtn.addEventListener('click', () => {
            if (!isShown || isAnimating) return;
            isAnimating = true;
            isShown = false;

            const flyingSrc = imageBlock.src;
            const fromRect = imageBlock.getBoundingClientRect();

            const fly = document.createElement('img');
            fly.src = flyingSrc;

            const fromStyle = window.getComputedStyle(imageBlock);

            fly.style.position = 'fixed';
            fly.style.left = fromRect.left + 'px';
            fly.style.top = fromRect.top + 'px';
            fly.style.width = fromRect.width + 'px';
            fly.style.height = fromRect.height + 'px';
            fly.style.margin = '0';
            fly.style.padding = '0';
            fly.style.objectFit = fromStyle.objectFit;
            fly.style.pointerEvents = 'none';
            fly.style.zIndex = getZIndexBelowInfo();
            fly.style.transition = 'transform 1.8s ease-in-out';
            fly.style.transformOrigin = 'center center';
            fly.style.transform = 'none';
            fly.style.opacity = '1';

            document.body.appendChild(fly);

            imageBlock.src = originalSrc;

            const toRect = cardImg.getBoundingClientRect();

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    fly.style.transform = getTransform(fromRect, toRect) + ' rotate(-4deg)';
                });
            });

            fly.addEventListener('transitionend', (e) => {
                if (e.propertyName === 'transform') {
                    setTimeout(() => {
                        fly.remove();
                        isAnimating = false;
                    }, 50);
                }
            }, { once: true });
        });
    });
});