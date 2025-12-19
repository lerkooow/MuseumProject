document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search__input');
    const searchSection = document.querySelector('.search');
    const peopleSection = document.querySelector('.search-people');
    const peopleGrid = document.querySelector('.search-people__grid');
    const leftButton = document.querySelector('#search-people-button-left .button__arrow');
    const rightButton = document.querySelector('#search-people-button-right .button__arrow');

    const factoriesSection = document.querySelector('.search-factories');
    const factoriesSlider = document.querySelector('.history__slider-container');
    const factoriesLeftButton = document.querySelector('#search-factories-button-left .button__arrow');
    const factoriesRightButton = document.querySelector('#search-factories-button-right .button__arrow');

    const eventsSection = document.querySelector('.search-events');
    const eventsGrid = document.querySelector('.search-events__cards');
    const eventsLeftButton = document.querySelector('#search-events-button-left .button__arrow');
    const eventsRightButton = document.querySelector('#search-events-button-right .button__arrow');

    const resultsBlock = document.querySelector('.search__results');

    const allPeople = [
        {
            name: 'Василий Иванович Орлов',
            firstName: 'Василий',
            middleName: 'Иванович',
            lastName: 'Орлов',
            post: 'Мастер бумажного производства',
            factory: 'Сухонский картонно-бумажный комбинат',
            image: '../assets/images/vasily-orlov.jpg',
            stamp: '../assets/icons/stamp1972-2021.svg',
            stampAlt: '1972-2021',
            link: '#'
        },
        {
            name: 'Елена Александровна Ермолова (Андреева)',
            firstName: 'Елена',
            middleName: 'Александровна',
            lastName: 'Ермолова',
            post: 'Мастер бумажного производства',
            factory: 'Сухонский картонно-бумажный комбинат',
            image: '../assets/images/elena-ermolova.jpg',
            stamp: '../assets/icons/stamp1927-1964.svg',
            stampAlt: '1927-1964',
            link: '#'
        },
        {
            name: 'Константин Петрович Печаткин',
            firstName: 'Константин',
            middleName: 'Петрович',
            lastName: 'Печаткин',
            post: 'Основатель завода, инженер БДМ',
            factory: 'Сухонский картонно-бумажный комбинат',
            image: '../assets/images/konstantin-pechatkin.jpg',
            stamp: '../assets/icons/stamp1927-1964.svg',
            stampAlt: '1927-1964',
            link: '#'
        },
        {
            name: 'Петр Алексеевич Печаткин',
            firstName: 'Петр',
            middleName: 'Алексеевич',
            lastName: 'Печаткин',
            post: 'Основатель завода, инженер БДМ',
            factory: 'Сухонский картонно-бумажный комбинат',
            image: '../assets/images/petr-pechatkin.jpg',
            stamp: '../assets/icons/stamp1911-1945.svg',
            stampAlt: '1911-1945',
            link: '#'
        },
        {
            name: 'Николай Вячеславович Печаткин',
            firstName: 'Николай',
            middleName: 'Вячеславович',
            lastName: 'Печаткин',
            post: 'Основатель завода, инженер БДМ',
            factory: 'Сухонский картонно-бумажный комбинат',
            image: '../assets/images/nikolay-pechatkin.jpg',
            stamp: '../assets/icons/stamp1911-1945.svg',
            stampAlt: '1911-1945',
            link: 'employee.html'
        },
        {
            name: 'Клавдия Константиновна Печаткина',
            firstName: 'Клавдия',
            middleName: 'Константиновна',
            lastName: 'Печаткина',
            post: 'Основатель завода, инженер БДМ',
            factory: 'Сухонский картонно-бумажный комбинат',
            image: '../assets/images/claudia-pechatkina.jpg',
            stamp: '../assets/icons/stamp1927-1964.svg',
            stampAlt: '1927-1964',
            link: '#'
        },
        {
            name: 'Клавдия Константиновна Печаткина',
            firstName: 'Клавдия',
            middleName: 'Константиновна',
            lastName: 'Печаткина',
            post: 'Основатель завода, инженер БДМ',
            factory: 'Сухонский картонно-бумажный комбинат',
            image: '../assets/images/claudia-pechatkina.jpg',
            stamp: '../assets/icons/stamp1927-1964.svg',
            stampAlt: '1927-1964',
            link: '#'
        }
    ];

    const allFactories = [
        {
            name: 'Полотняно-Заводская бумажная мануфактура',
            year: '1720',
            logo: '../assets/icons/polotnyano-zavodskaya_logo.svg',
            image: '../assets/images/polotnyano-zavodskaya.jpg',
            theme: 'theme-beige',
            link: '#'
        },
        {
            name: 'Сухонский картонно-бумажный комбинат',
            year: '1911',
            logo: '../assets/icons/sukhonsky_logo.svg',
            image: '../assets/images/sukhonsky.jpg',
            theme: 'theme-warm-white',
            link: 'factory.html'
        },
        {
            name: 'Сухонский картонно-бумажный комбинат',
            year: '1911',
            logo: '../assets/icons/sukhonsky_logo.svg',
            image: '../assets/images/sukhonsky.jpg',
            theme: 'theme-warm-white',
            link: 'factory.html'
        }
    ];

    const allEvents = [
        {
            title: 'День чествования работников',
            date: 'июль 1963',
            image: '../assets/images/multimedia_photo1.jpg',
            description: 'За преданность делу и высокие результаты в работе цеха.Труд и инициативность отмечены руководством комбината на торжественном собрании.',
            awarded: 'Сухонский картонно-бумажный комбинат. Начальник цеха Н.Ф. Мелюшина',
            link: '#'
        },
        {
            title: 'Актив детских садов Сокола и Печаткино',
            date: 'июль 1929',
            image: '../assets/images/multimedia_photo6.jpg',
            description: 'За инициативу и активное участие в организации работы дошкольных учреждений района.',
            awarded: 'Актив детских садов.Коллектив заведующих и воспитателей.',
            link: '#'
        },
        {
            title: 'Трудовые будни обойного цеха',
            date: 'июль 1963',
            image: '../assets/images/multimedia_photo4.jpg',
            description: 'За добросовестный труд и ежедневный вклад в работу обойного производства. Его опыт и внимание к деталям помогали обеспечивать стабильный выпуск продукции и поддерживать высокое качество.',
            awarded: 'Работник обойного цеха.Мастер участка Иванов И.П.',
            link: '#'
        },
        {
            title: 'Почётный диплом ВДНХ СССР',
            date: 'июль 1963',
            image: '../assets/images/multimedia_photo4.jpg',
            description: 'За разработку и успешный запуск первой в регионе автоматизированной линии по производству влагостойкого упаковочного картона.',
            awarded: 'Сухонский картонно-бумажный комбинат.Коллектив технического отдела и главный инженер Семёнов В.П.',
            link: '#'
        },
        {
            title: 'День чествования работников',
            date: 'июль 1963',
            image: '../assets/images/multimedia_photo1.jpg',
            description: 'За преданность делу и высокие результаты в работе цеха.Труд и инициативность отмечены руководством комбината на торжественном собрании.',
            awarded: 'Сухонский картонно-бумажный комбинат. Начальник цеха Н.Ф. Мелюшина',
            link: '#'
        },
        {
            title: 'Почётный диплом ВДНХ СССР',
            date: 'июль 1963',
            image: '../assets/images/multimedia_photo6.jpg',
            description: 'За разработку и успешный запуск первой в регионе автоматизированной линии по производству влагостойкого упаковочного картона.',
            awarded: 'Сухонский картонно-бумажный комбинат. Коллектив технического отдела и главный инженер Семёнов В.П.',
            link: '#'
        }
    ];

    let filteredPeople = [];
    let filteredFactories = [];
    let filteredEvents = [];
    let currentPage = 0;
    let currentFactoryPage = 0;
    let currentEventPage = 0;
    let cardsPerPage = window.innerWidth <= 805 ? 1 : 4;
    let eventsPerView = window.innerWidth <= 768 ? 1 : 3;
    const eventsPerPage = 1;
    let allFactoriesCards = [];
    let allEventsCards = [];

    function updateScreenSize() {
        cardsPerPage = window.innerWidth <= 805 ? 1 : 4;
        eventsPerView = window.innerWidth <= 768 ? 1 : 3;
    }

    function createPersonCard(person) {
        const factoryLines = person.factory.split(' ').reduce((acc, word, index, arr) => {
            if (index === 0) return word;
            if (index % 2 === 0) return acc + '<br />' + word;
            return acc + ' ' + word;
        }, '');

        return `
            <a href="${person.link}" class="search-people__card">
                <div class="search-people__left">
                    <div class="search-people__wrapper">
                        <p class="search-people__name">
                            ${person.firstName}<br />
                            ${person.middleName}<br />
                            ${person.lastName}
                        </p>
                        <p class="search-people__post">${person.post}</p>
                    </div>
                    <div class="search-people__factory">
                        <p>${factoryLines}</p>
                        <img src="../assets/icons/arrow_brown_300.svg" alt="arrow right" class="search-people__arrow" />
                    </div>
                </div>
                <div class="search-people__right">
                    <img src="${person.image}" alt="${person.name}" loading="lazy" />
                </div>
                <img src="${person.stamp}" alt="${person.stampAlt}" class="search-people__stamp" loading="lazy" />
            </a>
        `;
    }

    function displayCards() {
        const startIndex = currentPage * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const cardsToShow = filteredPeople.slice(startIndex, endIndex);

        peopleGrid.innerHTML = cardsToShow.map(person => createPersonCard(person)).join('');

        leftButton.disabled = currentPage === 0;
        rightButton.disabled = endIndex >= filteredPeople.length;

        leftButton.style.opacity = leftButton.disabled ? '0.5' : '1';
        rightButton.style.opacity = rightButton.disabled ? '0.5' : '1';
        leftButton.style.cursor = leftButton.disabled ? 'not-allowed' : 'pointer';
        rightButton.style.cursor = rightButton.disabled ? 'not-allowed' : 'pointer';
    }

    function searchPeople(query) {
        if (!query.trim()) {
            return [];
        }

        const searchTerm = query.toLowerCase().trim();

        return allPeople.filter(person => {
            const lastName = person.lastName.toLowerCase();

            return lastName.startsWith(searchTerm);
        });
    }

    function createFactoryCard(factory) {
        return `
            <a href="${factory.link}" class="history-card ${factory.theme}">
                <div class="history-card__header">
                    <img src="${factory.logo}" alt="icon" class="history-card__logo" />
                    <div class="history-card__title-wrapper">
                        <div class="history-card__arrow-wrapper">
                            <p class="history-card__title">${factory.name}</p>
                            <img src="../assets/icons/arrow_brown_300.svg" alt="arrow" class="history-card__arrow" />
                        </div>
                        <div class="history-card__content">
                            <div class="history-card__year-block">
                                <p class="history-card__year-label">Год основания</p>
                                <p class="history-card__year">${factory.year}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="history-card__image">
                    <img src="${factory.image}" alt="${factory.name}" />
                </div>
            </a>
        `;
    }

    function getFactoriesGapPx() {
        const cards = factoriesSlider.querySelectorAll('.history-card');
        if (cards.length < 2) return 0;
        const first = cards[0];
        const second = cards[1];
        const gap = Math.round(second.getBoundingClientRect().left - first.getBoundingClientRect().right);
        return gap > 0 ? gap : 0;
    }

    function getFactoryCardWidthWithGap() {
        const cards = factoriesSlider.querySelectorAll('.history-card');
        const card = cards[0];
        if (!card) return 0;
        const cardWidth = card.offsetWidth;
        const gap = getFactoriesGapPx();
        return cardWidth + gap;
    }

    function getVisibleFactoriesCount() {
        const containerWidth = factoriesSlider.parentElement ? factoriesSlider.parentElement.offsetWidth : factoriesSlider.offsetWidth;
        const cardWidthWithGap = getFactoryCardWidthWithGap();
        return Math.max(1, Math.floor(containerWidth / cardWidthWithGap));
    }

    function displayFactories() {
        if (!factoriesSlider.style.transition) {
            factoriesSlider.style.transition = 'transform 0.5s ease';
        }

        if (allFactoriesCards.length === 0) {
            allFactoriesCards = filteredFactories.map(factory => createFactoryCard(factory));
            factoriesSlider.innerHTML = allFactoriesCards.join('');
        }

        const cards = factoriesSlider.querySelectorAll('.history-card');
        if (cards.length > 0) {
            const cardWidthWithGap = getFactoryCardWidthWithGap();
            const visibleCount = getVisibleFactoriesCount();

            if (currentFactoryPage > filteredFactories.length - visibleCount) {
                currentFactoryPage = Math.max(0, filteredFactories.length - visibleCount);
            }

            const offset = -(currentFactoryPage * cardWidthWithGap);
            factoriesSlider.style.transform = `translateX(${offset}px)`;

            const shouldDisableSlider = filteredFactories.length <= 2;

            if (shouldDisableSlider) {
                factoriesLeftButton.disabled = true;
                factoriesRightButton.disabled = true;
                factoriesLeftButton.style.opacity = '0.5';
                factoriesRightButton.style.opacity = '0.5';
                factoriesLeftButton.style.cursor = 'not-allowed';
                factoriesRightButton.style.cursor = 'not-allowed';
            } else {
                factoriesLeftButton.disabled = currentFactoryPage === 0;
                factoriesRightButton.disabled = currentFactoryPage >= filteredFactories.length - visibleCount;

                factoriesLeftButton.style.opacity = factoriesLeftButton.disabled ? '0.5' : '1';
                factoriesRightButton.style.opacity = factoriesRightButton.disabled ? '0.5' : '1';
                factoriesLeftButton.style.cursor = factoriesLeftButton.disabled ? 'not-allowed' : 'pointer';
                factoriesRightButton.style.cursor = factoriesRightButton.disabled ? 'not-allowed' : 'pointer';
            }
        }
    }

    function searchFactories(query) {
        if (!query.trim()) {
            return [];
        }

        const searchTerm = query.toLowerCase().trim();

        return allFactories.filter(factory => {
            const factoryName = factory.name.toLowerCase();
            return factoryName.startsWith(searchTerm);
        });
    }

    function createEventCard(event) {
        return `
            <a href="${event.link}" class="search-events__card">
                <img src="../assets/icons/clip.svg" alt="clip" class="search-events__clip" />
                <div class="search-events__img">
                    <p>${event.date}</p>
                    <img src="${event.image}" alt="Фото" loading="lazy" />
                </div>
                <div class="search-events__info">
                    <p class="search-events__card--title">${event.title}</p>
                    <p class="search-events__card--description">${event.description}</p>
                    <p class="search-events__card--awarded"><span>Кто награждён:</span><br />${event.awarded}</p>
                </div>
            </a>
        `;
    }

    function displayEvents() {
        if (!eventsGrid.style.transition) {
            eventsGrid.style.transition = 'transform 0.5s ease';
        }

        if (allEventsCards.length === 0) {
            allEventsCards = filteredEvents.map(event => createEventCard(event));
            eventsGrid.innerHTML = allEventsCards.join('');
        }

        const cards = eventsGrid.querySelectorAll('.search-events__card');
        if (cards.length > 0) {
            const cardWidth = cards[0].offsetWidth;
            const gap = 16;
            const offset = -(currentEventPage * eventsPerPage * (cardWidth + gap));
            eventsGrid.style.transform = `translateX(${offset}px)`;
        }

        const shouldDisableSlider = filteredEvents.length <= eventsPerView;

        if (shouldDisableSlider) {
            eventsLeftButton.disabled = true;
            eventsRightButton.disabled = true;
            eventsLeftButton.style.opacity = '0.5';
            eventsRightButton.style.opacity = '0.5';
            eventsLeftButton.style.cursor = 'not-allowed';
            eventsRightButton.style.cursor = 'not-allowed';
        } else {
            eventsLeftButton.disabled = currentEventPage === 0;
            eventsRightButton.disabled = (currentEventPage + eventsPerPage) >= filteredEvents.length;

            eventsLeftButton.style.opacity = eventsLeftButton.disabled ? '0.5' : '1';
            eventsRightButton.style.opacity = eventsRightButton.disabled ? '0.5' : '1';
            eventsLeftButton.style.cursor = eventsLeftButton.disabled ? 'not-allowed' : 'pointer';
            eventsRightButton.style.cursor = eventsRightButton.disabled ? 'not-allowed' : 'pointer';
        }
    }

    function searchEvents(query) {
        if (!query.trim()) {
            return [];
        }

        const searchTerm = query.toLowerCase().trim();

        return allEvents.filter(event => {
            const eventTitle = event.title.toLowerCase();
            return eventTitle.startsWith(searchTerm);
        });
    }

    function showResults(peopleCount, factoriesCount, eventsCount) {
        searchSection.classList.add('search--with-results');

        const partsPeople = [];
        const partsFactories = [];
        const partsEvents = [];

        const peopleWord =
            peopleCount === 0 || peopleCount === 1
                ? 'человек'
                : peopleCount < 5
                    ? 'человека'
                    : 'человек';
        partsPeople.push(`${peopleCount} ${peopleWord}`);

        const factoryWord =
            factoriesCount === 1
                ? 'фабрика'
                : factoriesCount >= 2 && factoriesCount <= 4
                    ? 'фабрики'
                    : 'фабрик';
        partsFactories.push(`${factoriesCount} ${factoryWord}`);

        const eventWord =
            eventsCount === 1
                ? 'событие'
                : eventsCount >= 2 && eventsCount <= 4
                    ? 'события'
                    : 'событий';
        partsEvents.push(`${eventsCount} ${eventWord}`);

        const foundWord = peopleCount === 1 && factoriesCount === 0 && eventsCount === 0 ? 'найден' : 'найдено';

        resultsBlock.textContent = `По вашему запросу ${foundWord} ${partsPeople.join(', ')}, ${partsFactories.join(', ')} и ${partsEvents.join(', ')}`;
        resultsBlock.style.display = 'block';

        if (peopleCount > 0) {
            document.getElementById('peopleCount').textContent = peopleCount;
            peopleSection.style.display = 'block';
            displayCards();
        } else {
            peopleSection.style.display = 'none';
        }

        if (factoriesCount > 0) {
            document.getElementById('factoriesCount').textContent = factoriesCount;
            factoriesSection.style.display = 'block';
            displayFactories();
        } else {
            factoriesSection.style.display = 'none';
        }

        if (eventsCount > 0) {
            document.getElementById('eventsCount').textContent = eventsCount;
            eventsSection.style.display = 'block';
            displayEvents();
        } else {
            eventsSection.style.display = 'none';
        }
    }

    function showNoResults() {
        searchSection.classList.remove('search--with-results');

        resultsBlock.innerHTML = 'К сожалению, по вашему запросу ничего не найдено.<br /><span>Попробуйте изменить запрос или начать ввод с первых букв фамилии, названия фабрики или события.</span>';
        resultsBlock.style.display = 'flex';
        resultsBlock.style.flexDirection = 'column';


        peopleSection.style.display = 'none';
        factoriesSection.style.display = 'none';
        eventsSection.style.display = 'none';
    }

    function hideResults() {
        searchSection.classList.remove('search--with-results');

        resultsBlock.style.display = 'none';

        peopleSection.style.display = 'none';
        factoriesSection.style.display = 'none';
        eventsSection.style.display = 'none';
        document.getElementById('peopleCount').textContent = '0';
        document.getElementById('factoriesCount').textContent = '0';
        document.getElementById('eventsCount').textContent = '0';
    }

    searchInput.addEventListener('input', function (e) {
        const query = e.target.value;

        if (!query.trim()) {
            hideResults();
            return;
        }

        filteredPeople = searchPeople(query);
        filteredFactories = searchFactories(query);
        filteredEvents = searchEvents(query);
        currentPage = 0;
        currentFactoryPage = 0;
        currentEventPage = 0;
        allFactoriesCards = [];
        allEventsCards = [];

        const totalResults = filteredPeople.length + filteredFactories.length + filteredEvents.length;

        if (totalResults > 0) {
            showResults(filteredPeople.length, filteredFactories.length, filteredEvents.length);
        } else {
            showNoResults();
        }
    });

    leftButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            displayCards();
            window.scrollTo({ behavior: 'smooth' });
        }
    });

    rightButton.addEventListener('click', () => {
        if ((currentPage + 1) * cardsPerPage < filteredPeople.length) {
            currentPage++;
            displayCards();
            window.scrollTo({ behavior: 'smooth' });
        }
    });

    factoriesLeftButton.addEventListener('click', () => {
        if (currentFactoryPage > 0) {
            currentFactoryPage--;
            displayFactories();
            window.scrollTo({ behavior: 'smooth' });
        }
    });

    factoriesRightButton.addEventListener('click', () => {
        const visibleCount = getVisibleFactoriesCount();
        if (currentFactoryPage < filteredFactories.length - visibleCount) {
            currentFactoryPage++;
            displayFactories();
            window.scrollTo({ behavior: 'smooth' });
        }
    });

    eventsLeftButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (currentEventPage > 0) {
            currentEventPage--;
            displayEvents();
            window.scrollTo({ behavior: 'smooth' });
        }
    });

    eventsRightButton.addEventListener('click', () => {
        if ((currentEventPage + eventsPerPage) < filteredEvents.length) {
            currentEventPage++;
            displayEvents();
            window.scrollTo({ behavior: 'smooth' });
        }
    });

    window.addEventListener('resize', () => {
        updateScreenSize();

        if (filteredPeople.length > 0) {
            currentPage = 0;
            displayCards();
        }

        if (filteredFactories.length > 0) {
            const visibleCount = getVisibleFactoriesCount();
            if (currentFactoryPage > filteredFactories.length - visibleCount) {
                currentFactoryPage = Math.max(0, filteredFactories.length - visibleCount);
            }
            allFactoriesCards = [];
            displayFactories();
        }

        if (filteredEvents.length > 0) {
            allEventsCards = [];
            currentEventPage = 0;
            displayEvents();
        }
    });

    hideResults();
});
