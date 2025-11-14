document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('relatedModal');
    const modalImage = document.getElementById('relatedModalImage');
    const closeModal = document.getElementById('closeRelatedModal');
    const closeModalMobile = document.querySelector('.related-modal__close--mobile');
    const prevButton = document.getElementById('prevRelatedImage');
    const nextButton = document.getElementById('nextRelatedImage');

    let currentImages = [];
    let currentIndex = 0;

    const relatedImages = document.querySelectorAll('.related-card__image--main, .related-card__image--back');

    relatedImages.forEach((img) => {
        img.addEventListener('click', function (e) {
            e.stopPropagation();

            const card = this.closest('.related-card');
            const images = [];
            const main = card.querySelector('.related-card__image--main');
            const back = card.querySelector('.related-card__image--back');
            if (main) images.push(main.src);
            if (back) images.push(back.src);

            currentImages = images;
            if (this.classList.contains('related-card__image--main')) {
                currentIndex = 0;
            } else {
                currentIndex = 1;
            }

            openModal();
        });
    });

    function openModal() {
        updateModalImage();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModalWindow() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateModalImage() {
        modalImage.src = currentImages[currentIndex];

        prevButton.style.display = currentImages.length > 1 ? 'flex' : 'none';
        nextButton.style.display = currentImages.length > 1 ? 'flex' : 'none';
    }

    function showPrevImage() {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : currentImages.length - 1;
        updateModalImage();
    }

    function showNextImage() {
        currentIndex = currentIndex < currentImages.length - 1 ? currentIndex + 1 : 0;
        updateModalImage();
    }

    closeModal.addEventListener('click', closeModalWindow);

    if (closeModalMobile) {
        closeModalMobile.addEventListener('click', closeModalWindow);
    }

    prevButton.addEventListener('click', function (e) {
        e.stopPropagation();
        showPrevImage();
    });

    nextButton.addEventListener('click', function (e) {
        e.stopPropagation();
        showNextImage();
    });

    document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeModalWindow();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
});
