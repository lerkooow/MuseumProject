document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('multimediaModal');
    const modalImage = document.getElementById('multimediaModalImage');
    const modalVideo = document.getElementById('multimediaModalVideo');
    const closeModal = document.getElementById('closeMultimediaModal');
    const closeModalMobile = document.getElementById('closeMultimediaModalMobile');

    const multimediaImages = document.querySelectorAll('.multimedia-image');
    const multimediaVideos = document.querySelectorAll('.multimedia-video');

    multimediaImages.forEach((img) => {
        img.addEventListener('click', function (e) {
            e.stopPropagation();
            openModal(this.src, 'image');
        });
    });

    multimediaVideos.forEach((video) => {
        video.addEventListener('click', function (e) {
            e.stopPropagation();
            const videoSrc = this.getAttribute('data-src') || this.querySelector('source').src;
            openModal(videoSrc, 'video');
        });
    });

    function openModal(mediaSrc, mediaType) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (mediaType === 'image') {
            modalImage.src = mediaSrc;
            modalImage.style.display = 'block';
            modalVideo.style.display = 'none';
            modalVideo.pause();
        } else if (mediaType === 'video') {
            modalVideo.querySelector('source').src = mediaSrc;
            modalVideo.load();
            modalVideo.style.display = 'block';
            modalImage.style.display = 'none';
            modalVideo.play().catch(error => {
                console.log('Автовоспроизведение заблокировано браузером:', error);
            });
        }

        document.body.style.paddingRight = `${scrollbarWidth}px`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModalWindow() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        modalVideo.pause();
        modalVideo.currentTime = 0;
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
