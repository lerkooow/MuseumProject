document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('interactiveModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const closeModalMobile = document.querySelector('.interactive-modal__close--mobile');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');

    let currentImages = [];
    let currentIndex = 0;

    const documentImages = document.querySelectorAll('.document-image');
    documentImages.forEach((img) => {
        img.addEventListener('click', function (e) {
            e.stopPropagation();

            const card = this.closest('.interactive-card');
            const images = card.querySelectorAll('.document-image');

            currentImages = Array.from(images).map(img => img.src);
            currentIndex = parseInt(this.dataset.index);

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
