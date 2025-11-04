fetch("../components/dropdown.html")
    .then((response) => response.text())
    .then((data) => {

        const container = document.getElementById("dropdown-container");

        if (!container) {
            return;
        }

        container.innerHTML = data;

        const dropdown = document.getElementById("dropdown");
        const dropdownButton = document.getElementById("dropdownButton");
        const dropdownList = document.getElementById("dropdownList");
        const buttonText = dropdownButton.querySelector(".dropdown__button-text");
        const items = dropdownList.querySelectorAll(".dropdown__item");

        dropdownButton.addEventListener("click", () => {
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


