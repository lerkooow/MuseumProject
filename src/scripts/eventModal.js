document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('eventModal');
    const modalImage = document.getElementById('eventModalImage');
    const closeModal = document.getElementById('closeEventModal');
    const closeModalMobile = document.getElementById('closeEventModalMobile');
    const galleryImages = document.querySelectorAll('.event__photo-gallery_image img');

    galleryImages.forEach((img) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function (e) {
            e.stopPropagation();
            openModal(this.src, 'image');
        });
    });

    function openModal(mediaSrc, mediaType) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (mediaType === 'image') {
            modalImage.src = mediaSrc;
            modalImage.style.display = 'block';
        }

        document.body.style.paddingRight = `${scrollbarWidth}px`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModalWindow() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }

    closeModal.addEventListener('click', closeModalWindow);

    if (closeModalMobile) {
        closeModalMobile.addEventListener('click', closeModalWindow);
    }

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModalWindow();
        }
    });
});
