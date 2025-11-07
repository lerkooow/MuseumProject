function initializeDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        const dropdownButton = dropdown.querySelector(".dropdown__button");
        const dropdownList = dropdown.querySelector(".dropdown__list");
        const buttonText = dropdownButton.querySelector(".dropdown__button-text");
        const items = dropdownList.querySelectorAll(".dropdown__item");

        dropdownButton.addEventListener("click", (e) => {
            e.stopPropagation();

            dropdowns.forEach((otherDropdown) => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove("dropdown_opened");
                }
            });

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
    });

    document.addEventListener("click", (e) => {
        dropdowns.forEach((dropdown) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("dropdown_opened");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", initializeDropdowns);


