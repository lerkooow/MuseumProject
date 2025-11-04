fetch("../components/menu.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("menu-container").innerHTML = data;

        const toggle = document.querySelector(".menu__toggle");
        const close = document.querySelector(".menu__close");
        const nav = document.querySelector(".menu__nav--mobile");
        const burgerIcon = document.querySelector(".menu__burger--mobile");
        const crossIcon = document.querySelector(".menu__cross--mobile");

        function toggleMenu() {
            const isActive = nav.classList.contains("active");

            if (isActive) {
                nav.classList.remove("active");
                burgerIcon.classList.remove("hidden");
                crossIcon.classList.add("hidden");
            } else {
                nav.classList.add("active");
                burgerIcon.classList.add("hidden");
                crossIcon.classList.remove("hidden");
            }
        }

        if (toggle) {
            toggle.addEventListener("click", toggleMenu);
        }

        if (close) {
            close.addEventListener("click", toggleMenu);
        }

        document.addEventListener("click", function (event) {
            if (nav.classList.contains("active") && !nav.contains(event.target) && !toggle.contains(event.target)) {
                nav.classList.remove("active");
                burgerIcon.classList.remove("hidden");
                crossIcon.classList.add("hidden");
            }
        });
    });
