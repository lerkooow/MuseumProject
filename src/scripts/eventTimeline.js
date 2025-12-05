document.addEventListener("DOMContentLoaded", function () {
    const timelines = document.querySelectorAll(".event-timeline, .event-timeline--mobile");
    timelines.forEach(timeline => {
        const currentYear = Number(timeline.dataset.currentYear);
        const items = Array.from(timeline.querySelectorAll(".event-timeline__item"));
        const lines = Array.from(timeline.querySelectorAll(".event-timeline__line"));

        items.forEach((item, index) => {
            const yearEl = item.querySelector(".event-timeline__year");
            const iconEl = item.querySelector("img");
            const year = Number(yearEl.textContent.trim());

            let state = "";
            if (year < currentYear) {
                state = "past";
            } else if (year === currentYear) {
                state = "active";
            } else {
                state = "future";
            }

            item.classList.add(state);

            if (state === "past" || state === "active") {
                iconEl.src = "../assets/icons/circle_brown.svg";
            } else {
                iconEl.src = "../assets/icons/circle.svg";
            }

            if (lines[index]) {
                lines[index].classList.add(state);
            }

            if (index === 0) {
                lines[0].classList.add(state);
            }
        });
    });
});
