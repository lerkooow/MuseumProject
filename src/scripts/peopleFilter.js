export const peopleData = [
    {
        id: 1,
        name: "Василий Иванович Орлов",
        patronymic: "Иванович",
        surname: "Орлов",
        position: "Мастер бумажного производства",
        factory: "Сухонский",
        years: "1920-1945",
        region: "Сухонская фабрика",
        image: "../assets/images/people.jpg",
        badge: "ВЕТЕРАН ВОЙНЫ"
    },
    {
        id: 2,
        name: "Елена Александровна Ермолова (Андреева)",
        patronymic: "Александровна",
        surname: "Ермолова",
        position: "Мастер бумажного производства",
        factory: "Сухонский",
        years: "1935-1965",
        region: "Сухонская фабрика",
        image: "../assets/images/people.jpg",
        badge: "ВЕТЕРАН ТРУДА"
    },
    {
        id: 3,
        name: "Константин Петрович Морозов",
        patronymic: "Петрович",
        surname: "Морозов",
        position: "Основатель завода, инженер БДП",
        factory: "Сухонский",
        years: "1890-1925",
        region: "Сухонская фабрика",
        image: "../assets/images/people.jpg"
    },
    {
        id: 4,
        name: "Петр Алексеевич Калиткин",
        patronymic: "Алексеевич",
        surname: "Калиткин",
        position: "Основатель завода, инженер БДП",
        factory: "Сухонский",
        years: "1895-1930",
        region: "Сухонская фабрика",
        image: "../assets/images/people.jpg"
    },
    {
        id: 5,
        name: "Николай Вячеславович Печаткин",
        patronymic: "Вячеславович",
        surname: "Печаткин",
        position: "Основатель завода, инженер БДП",
        factory: "Сухонский",
        years: "1900-1935",
        region: "Сухонская фабрика",
        image: "../assets/images/people.jpg"
    },
    {
        id: 6,
        name: "Клавдия Константиновна Печаткина",
        patronymic: "Константиновна",
        surname: "Печаткина",
        position: "Основатель завода, инженер БДП",
        factory: "Сухонский",
        years: "1905-1940",
        region: "Сухонская фабрика",
        image: "../assets/images/people.jpg"
    }
];

let currentFilters = {
    letter: 'all',
    search: '',
    region: 'all',
    years: 'all',
    factory: 'all',
    page: 1,
    itemsPerPage: 12
};

document.addEventListener('DOMContentLoaded', () => {
    updatePeopleCount();
    initializeFilters();
    initializeDropdowns();
    renderPeople();
});

function updatePeopleCount() {
    const countElement = document.getElementById('peopleCount');
    if (countElement) {
        countElement.textContent = peopleData.length;
    }
}

function initializeFilters() {
    const alphabetButtons = document.querySelectorAll('.people-list__alphabet-btn');
    alphabetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alphabetButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilters.letter = btn.dataset.letter;
            currentFilters.page = 1;
            renderPeople();
        });
    });

    const searchInput = document.getElementById('peopleSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value.toLowerCase();
            currentFilters.page = 1;
            renderPeople();
        });
    }

    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentFilters.page > 1) {
                currentFilters.page--;
                renderPeople();
                scrollToTop();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const filteredData = getFilteredPeople();
            const totalPages = Math.ceil(filteredData.length / currentFilters.itemsPerPage);
            if (currentFilters.page < totalPages) {
                currentFilters.page++;
                renderPeople();
                scrollToTop();
            }
        });
    }
}

function initializeDropdowns() {
    initializeDropdown('dropdown-years', 'dropdown-years.html', 'beige', (value) => {
        currentFilters.years = value;
        currentFilters.page = 1;
        renderPeople();
    });

    initializeDropdown('dropdown-factories', 'dropdown-factories.html', 'beige', (value) => {
        currentFilters.factory = value;
        currentFilters.page = 1;
        renderPeople();
    });
}

function initializeDropdown(containerId, componentFile, colorTheme = 'brown', onSelect) {
    fetch(`../components/${componentFile}`)
        .then((response) => response.text())
        .then((data) => {
            const container = document.getElementById(containerId);

            if (!container) {
                return;
            }

            container.innerHTML = data;

            const dropdown = container.querySelector('.dropdown');
            const dropdownButton = container.querySelector('.dropdown__button');
            const dropdownList = container.querySelector('.dropdown__list');
            const buttonText = dropdownButton.querySelector('.dropdown__button-text');
            const items = dropdownList.querySelectorAll('.dropdown__item');

            if (colorTheme === 'beige') {
                dropdown.classList.add('dropdown--beige');
            } else {
                dropdown.classList.add('dropdown--brown');
            }

            dropdownButton.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('dropdown_opened');
            });

            items.forEach((item) => {
                item.addEventListener('click', () => {
                    items.forEach((i) => i.classList.remove('dropdown__item_selected'));

                    item.classList.add('dropdown__item_selected');
                    buttonText.textContent = item.textContent;
                    dropdown.classList.remove('dropdown_opened');

                    if (onSelect) {
                        const value = item.dataset.value;
                        onSelect(value);
                    }
                });
            });

            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('dropdown_opened');
                }
            });
        });
}

function getFilteredPeople() {
    return peopleData.filter(person => {
        const letterMatch = currentFilters.letter === 'all' ||
            person.surname.charAt(0).toUpperCase() === currentFilters.letter;

        const searchMatch = currentFilters.search === '' ||
            person.name.toLowerCase().includes(currentFilters.search) ||
            person.position.toLowerCase().includes(currentFilters.search);

        const regionMatch = currentFilters.region === 'all' ||
            person.region === currentFilters.region;

        let yearsMatch = currentFilters.years === 'all';
        if (!yearsMatch && person.years) {
            const [personStartYear, personEndYear] = person.years.split('-').map(Number);
            const [filterStartYear, filterEndYear] = currentFilters.years.split('-').map(Number);

            if (filterStartYear && filterEndYear) {
                yearsMatch = (personStartYear <= filterEndYear) && (personEndYear >= filterStartYear);
            }
        }

        const factoryMatch = currentFilters.factory === 'all' ||
            person.factory.toLowerCase() === currentFilters.factory.toLowerCase() ||
            person.region.toLowerCase().includes(currentFilters.factory.toLowerCase());

        return letterMatch && searchMatch && regionMatch && yearsMatch && factoryMatch;
    });
}

function renderPeople() {
    const grid = document.getElementById('peopleGrid');
    if (!grid) return;

    const filteredData = getFilteredPeople();
    const startIndex = (currentFilters.page - 1) * currentFilters.itemsPerPage;
    const endIndex = startIndex + currentFilters.itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    grid.innerHTML = '';

    if (pageData.length === 0) {
        grid.innerHTML = '<div class="people-list__empty">Ничего не найдено</div>';
        updatePagination(0);
        return;
    }

    pageData.forEach(person => {
        const card = createPersonCard(person);
        grid.appendChild(card);
    });

    updatePagination(filteredData.length);

    updateAlphabetButtons();
}

function createPersonCard(person) {
    const card = document.createElement('div');
    card.className = 'people-list__card';
    card.onclick = () => {
        window.location.href = `person-detail.html?id=${person.id}`;
    };

    card.innerHTML = `
    <img src="${person.image}" alt="${person.name}" class="people-list__card-image" />
    ${person.badge ? `<div class="people-list__card-badge">${person.badge}</div>` : ''}
    <div class="people-list__card-content">
      <h3 class="people-list__card-name">${person.name}</h3>
      <p class="people-list__card-info">${person.position}</p>
      <p class="people-list__card-info">${person.factory}</p>
      <div class="people-list__card-arrow">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
    </div>
  `;

    return card;
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / currentFilters.itemsPerPage);
    const paginationPages = document.getElementById('paginationPages');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (!paginationPages) return;

    paginationPages.innerHTML = '';

    if (prevBtn) {
        prevBtn.disabled = currentFilters.page === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentFilters.page === totalPages || totalPages === 0;
    }

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentFilters.page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'people-list__pagination-page';
        if (i === currentFilters.page) {
            pageBtn.classList.add('active');
        }
        pageBtn.textContent = i;
        pageBtn.onclick = () => {
            currentFilters.page = i;
            renderPeople();
            scrollToTop();
        };
        paginationPages.appendChild(pageBtn);
    }
}

function updateAlphabetButtons() {
    const alphabetButtons = document.querySelectorAll('.people-list__alphabet-btn:not([data-letter="all"])');

    alphabetButtons.forEach(btn => {
        const letter = btn.dataset.letter;
        const hasData = peopleData.some(person =>
            person.surname.charAt(0).toUpperCase() === letter
        );
        btn.disabled = !hasData;
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
