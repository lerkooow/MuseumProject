document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.event__video_frame').forEach(frame => {
        const video = frame.querySelector('video');
        const playBtn = frame.querySelector('.event__video_play-btn');
        if (video && playBtn) {
            video.addEventListener("play", () => {
                playBtn.style.display = "none";
            });
            video.addEventListener("pause", () => {
                playBtn.style.display = "";
            });
            if (!video.paused) playBtn.style.display = "none";
        }
    });
});