function initializeDropdown(containerId, componentFile = "dropdown.html", colorTheme = "brown") {
    fetch(`../components/${componentFile}`)
        .then((response) => response.text())
        .then((data) => {
            const container = document.getElementById(containerId);

            if (!container) {
                return;
            }

            container.innerHTML = data;

            const dropdown = container.querySelector(".dropdown");
            const dropdownButton = container.querySelector(".dropdown__button");
            const dropdownList = container.querySelector(".dropdown__list");
            const buttonText = dropdownButton.querySelector(".dropdown__button-text");
            const items = dropdownList.querySelectorAll(".dropdown__item");

            if (colorTheme === "beige") {
                dropdown.classList.add("dropdown--beige");
            } else {
                dropdown.classList.add("dropdown--brown");
            }

            dropdownButton.addEventListener("click", (e) => {
                e.stopPropagation();
                dropdown.classList.toggle("dropdown_opened");
            });

            items.forEach((item) => {
                item.addEventListener("click", () => {
                    items.forEach((i) => i.classList.remove("dropdown__item_selected"));

                    item.classList.add("dropdown__item_selected");
                    buttonText.textContent = item.textContent;
                    dropdown.classList.remove("dropdown_opened");
                });
            });

            document.addEventListener("click", (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove("dropdown_opened");
                }
            });
        });
}

const singleContainer = document.getElementById("dropdown-container");
if (singleContainer && !document.getElementById("dropdown-container-2")) {
    initializeDropdown("dropdown-container", "dropdown.html", "brown");
}

if (document.getElementById("dropdown-container-2")) {
    initializeDropdown("dropdown-container", "dropdown.html", "beige");
    initializeDropdown("dropdown-container-2", "dropdown-product.html", "beige");
    initializeDropdown("dropdown-container-3", "dropdown-region.html", "beige");
}


