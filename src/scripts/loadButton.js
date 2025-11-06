function loadButton(targetId, classes = [], iconSrc = "../assets/icons/arrow_beige_100.svg") {
    return fetch("../components/button.html")
        .then((response) => response.text())
        .then((data) => {
            const container = document.getElementById(targetId);

            if (!container) {
                return;
            }

            container.innerHTML = data;

            const button = container.querySelector("button");
            classes.forEach((cls) => button.classList.add(cls));

            const img = button.querySelector("img");
            img.src = iconSrc;
        });
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("history-button-left") && document.getElementById("history-button-right")) {
        Promise.all([
            loadButton("history-button-left", ["left", "brown"], "../assets/icons/arrow_beige_100.svg"),
            loadButton("history-button-right", ["right", "brown"], "../assets/icons/arrow_beige_100.svg")
        ]).then(() => {
            if (window.initHistorySlider) {
                window.initHistorySlider();
            }
        });
    }

    if (document.getElementById("anniversary-button-left") && document.getElementById("anniversary-button-right")) {
        Promise.all([
            loadButton("anniversary-button-left", ["left", "brown"], "../assets/icons/arrow_beige_100.svg"),
            loadButton("anniversary-button-right", ["right", "brown"], "../assets/icons/arrow_beige_100.svg")
        ]).then(() => {
            if (window.initAnniversarySlider) {
                window.initAnniversarySlider();
            }
        });
    }
});
