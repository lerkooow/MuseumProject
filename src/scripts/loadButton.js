function loadButton(targetId, classes = [], iconSrc = "../assets/icons/arrow_beige_100.svg") {
    fetch("../components/button.html")
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
    if (document.getElementById("button-container__left") && document.getElementById("button-container__right")) {
        loadButton("button-container__left", ["left", "brown"], "../assets/icons/arrow_beige_100.svg");
        loadButton("button-container__right", ["right", "brown"], "../assets/icons/arrow_beige_100.svg");
    }
});
