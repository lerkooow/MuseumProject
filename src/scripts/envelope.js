
const envelopes = document.querySelectorAll('.envelope');

envelopes.forEach(envelope => {
    const topPart = envelope.querySelector('.envelope__top');
    const text = envelope.querySelector('.envelope__text');

    envelope.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            topPart.style.zIndex = '4';
            text.style.zIndex = '1';
            envelope.classList.remove('close');
            envelope.classList.add('open');
            setTimeout(() => {
                text.style.top = window.innerWidth < 768 ? '9%' : '15%';
                text.style.zIndex = '3';
                topPart.style.zIndex = '1';
            }, 300);
            return;
        } else {
            text.style.top = '40%';
            text.style.zIndex = '3';
            envelope.classList.remove('open');
            envelope.classList.add('close');
            setTimeout(() => {
                topPart.style.zIndex = '4';
                text.style.zIndex = '1';
            }, 300);
            setTimeout(() => {
                envelope.classList.remove('close');
            }, 1500);
        }
    });
    window.addEventListener('resize', () => {
        if (envelope.classList.contains('open')) {
            text.style.top = window.innerWidth < 768 ? '9%' : '15%';
        }
    });
});
