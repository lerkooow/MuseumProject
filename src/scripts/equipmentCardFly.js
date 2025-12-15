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

        imageBlock.style.transition = 'opacity 0.5s ease';

        rightBtn.addEventListener('click', () => {
            if (isShown || isAnimating) return;
            isAnimating = true;
            isShown = true;

            const fly = cardImg.cloneNode(true);
            const fromRect = cardImg.getBoundingClientRect();
            const toRect = imageBlock.getBoundingClientRect();

            const fromStyle = window.getComputedStyle(cardImg);
            const fromStyleImg = window.getComputedStyle(imageBlock);

            const imgPadding = parseFloat(fromStyleImg.paddingLeft || 0);

            fly.style.position = 'fixed';
            fly.style.left = fromRect.left + (imgPadding / 4) + 'px';
            fly.style.top = fromRect.top + (imgPadding / 2) + 'px';

            const maxFlyWidth = 1052;
            const maxFlyHeight = 689;
            let flyWidth = fromRect.width;
            let flyHeight = fromRect.height;
            if (flyWidth > maxFlyWidth) flyWidth = maxFlyWidth;
            if (flyHeight > maxFlyHeight) flyHeight = maxFlyHeight;
            fly.style.width = flyWidth + 'px';
            fly.style.height = flyHeight + 'px';
            fly.style.margin = '0';
            fly.style.padding = '0';
            fly.style.objectFit = fromStyle.objectFit;
            fly.style.pointerEvents = 'none';
            fly.style.zIndex = getZIndexBelowInfo();
            fly.style.transition = 'transform 3s ease-in-out, opacity 0.5s ease';
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
                    imageBlock.style.transition = 'opacity 0.5s ease';
                    imageBlock.style.opacity = '0';

                    setTimeout(() => {
                        imageBlock.src = cardImg.src;
                        imageBlock.onload = () => {
                            imageBlock.style.transition = 'opacity 0.5s ease';
                            imageBlock.style.opacity = '1';

                            setTimeout(() => {
                                fly.remove();
                                isAnimating = false;
                            }, 300);
                        };
                    }, 300);
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

            const imgPadding = parseFloat(fromStyle.paddingLeft || 0);
            fly.style.left = fromRect.left + imgPadding + 'px';
            fly.style.top = fromRect.top + imgPadding + 'px';

            const maxFlyWidth = 1052;
            const maxFlyHeight = 689;
            let flyWidth = fromRect.width - imgPadding * 2;
            let flyHeight = fromRect.height - imgPadding * 2;
            if (flyWidth > maxFlyWidth) flyWidth = maxFlyWidth;
            if (flyHeight > maxFlyHeight) flyHeight = maxFlyHeight;
            fly.style.width = flyWidth + 'px';
            fly.style.height = flyHeight + 'px';
            fly.style.objectFit = "cover"
            fly.style.position = 'fixed';
            fly.style.margin = '0';
            fly.style.padding = '0';
            fly.style.objectFit = fromStyle.objectFit;
            fly.style.pointerEvents = 'none';
            fly.style.zIndex = getZIndexBelowInfo();
            fly.style.transition = 'transform 3s ease-in-out, opacity 0.5s ease';
            fly.style.transformOrigin = 'center center';
            fly.style.transform = 'none';
            fly.style.opacity = '1';

            document.body.appendChild(fly);

            imageBlock.style.transition = 'opacity 0.5s ease';
            imageBlock.style.opacity = '0';

            setTimeout(() => {
                imageBlock.src = originalSrc;
                imageBlock.onload = () => {
                    imageBlock.style.transition = 'opacity 0.5s ease';
                    imageBlock.style.opacity = '1';

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
                            }, 100);
                        }
                    });
                };
            }, 100);
        });
    });
});