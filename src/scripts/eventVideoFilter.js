let currentVideoFilter = "all";
let allVideoFrames = [];

if (typeof window.filteredVideoFrames === "undefined") {
    window.filteredVideoFrames = [];
}
if (typeof window.currentVideoIndex === "undefined") {
    window.currentVideoIndex = 0;
}

function initVideoFrames() {
    const frames = document.querySelectorAll(".event__video_frame");
    allVideoFrames = Array.from(frames).map((frame) => ({
        element: frame,
        tags: frame.dataset.tags ? frame.dataset.tags.split(",") : ["all"],
    }));
    window.filteredVideoFrames = [...allVideoFrames];
}

function filterVideoFrames(filterType) {
    currentVideoFilter = filterType;
    window.currentVideoIndex = 0;

    allVideoFrames.forEach((frame) => {
        frame.element.style.display = "none";
    });

    if (filterType === "all") {
        window.filteredVideoFrames = [...allVideoFrames];
    } else {
        window.filteredVideoFrames = allVideoFrames.filter((frame) => frame.tags.includes(filterType));
    }

    window.filteredVideoFrames.forEach((frame) => {
        frame.element.style.display = "flex";
    });
}

function updateVideoFilterCounts() {
    const heartCount = allVideoFrames.filter((frame) => frame.tags.includes("heart")).length;
    const birdCount = allVideoFrames.filter((frame) => frame.tags.includes("bird")).length;
    const medalCount = allVideoFrames.filter((frame) => frame.tags.includes("medal")).length;

    document.querySelector(".event__filter.heart span").textContent = heartCount;
    document.querySelector(".event__filter.bird span").textContent = birdCount;
    document.querySelector(".event__filter.medal span").textContent = medalCount;
}

const videoFilterButtons = document.querySelectorAll(".event__filter");

videoFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        let filterType = "all";

        if (button.classList.contains("active")) {
            videoFilterButtons.forEach((btn) => btn.classList.remove("active"));
            filterType = "all";
        } else {
            videoFilterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            if (button.classList.contains("heart")) {
                filterType = "heart";
            } else if (button.classList.contains("bird")) {
                filterType = "bird";
            } else if (button.classList.contains("medal")) {
                filterType = "medal";
            }
        }

        filterVideoFrames(filterType);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    initVideoFrames();
    updateVideoFilterCounts();
});
