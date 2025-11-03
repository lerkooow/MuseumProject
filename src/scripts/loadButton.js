function loadButton(targetId, classes = []) {
    fetch("button.html")
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
            img.src = "../assets/icons/arrow_beige_100.svg";
        });
}

