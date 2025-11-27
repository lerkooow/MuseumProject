document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector(".factory-blocks__video-wrapper video");
    const playBtn = document.querySelector(".factory-blocks__play-btn");
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