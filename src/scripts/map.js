document.addEventListener('DOMContentLoaded', function () {
    const tooltip = document.querySelector('.region-tooltip');
    const svg = document.getElementById('svg2');
    if (!svg) return;


    const activeRegions = [
        'RU-NIZ', 'RU-KO', 'RU-LEN', 'RU-STA', 'RU-MOS', 'RU-KLU', 'RU-VLG'
    ];
    const regionNames = {
        'RU-NIZ': {
            name: "Нижегородская область",
            photo: "../assets/images/vlg-factory.jpg",
            city: "Балахна",
            factory: "Балахнинская картонная фабрика",
            logo: "../assets/icons/vlg_logo.svg",
            year: "1925",
            type: "cardboard"
        },
        'RU-KO': {
            name: "Республика Коми",
            photo: "../assets/images/vlg-factory.jpg",
            city: "Ветлуга",
            factory: "Ветлужский картонный комбинат",
            logo: "../assets/icons/vlg_logo.svg",
            year: "1911",
            type: "cardboard"
        },
        'RU-LEN': {
            name: "Ленинградская область",
            photo: "../assets/images/vlg-factory.jpg",
            city: "Колпино",
            factory: "Ижорский целлюлозно-бумажный завод",
            logo: "../assets/icons/vlg_logo.svg",
            year: "1916",
            type: "cellulose"
        },
        'RU-STA': {
            name: "Ставропольский край",
            photo: "../assets/images/vlg-factory.jpg",
            city: "Невинномысск",
            factory: "Невинномысская фабрика спецбумаг",
            logo: "../assets/icons/vlg_logo.svg",
            year: "1921",
            type: "paper"
        },
        'RU-MOS': {
            name: "Московская область",
            photo: "../assets/images/vlg-factory.jpg",
            city: "Озёры",
            factory: "Озёрская бумажная фабрика",
            logo: "../assets/icons/vlg_logo.svg",
            year: "1930",
            type: "paper"


        },
        'RU-KLU': {
            name: "Калужская область",
            photo: "../assets/images/vlg-factory.jpg",
            city: "Дзержинский район",
            factory: "Полотняно-Заводской бумажная мануфактура",
            logo: "../assets/icons/vlg_logo.svg",
            year: "1735",
            type: "paper"
        },
        'RU-VLG': {
            name: "Вологодская область",
            photo: "../assets/images/vlg-factory.jpg",
            city: "Сокол",
            factory: "Сухонский картонно-бумажный комбинат",
            logo: "../assets/icons/vlg_logo.svg",
            year: "1935",
            type: "paper"
        }
    };


    const regions = svg.querySelectorAll('path[id^="RU-"]');
    const regsDiv = document.querySelector('.regs');


    function calculateCentroid(pathData) {
        try {
            const coords = [];
            const matches = pathData.matchAll(/([ML])\s*([\d.-]+)[,\s]+([\d.-]+)/gi);


            for (const match of matches) {
                coords.push({
                    x: parseFloat(match[2]),
                    y: parseFloat(match[3])
                });
            }


            if (coords.length === 0) return null;


            let sumX = 0, sumY = 0;
            coords.forEach(coord => {
                sumX += coord.x;
                sumY += coord.y;
            });


            return {
                x: sumX / coords.length,
                y: sumY / coords.length
            };
        } catch (e) {
            return null;
        }
    }


    const markerPositions = {
        'RU-NIZ': { offsetX: -5, offsetY: 0 },
        'RU-KO': { offsetX: 0, offsetY: 0 },
        'RU-LEN': { offsetX: 0, offsetY: 0 },
        'RU-STA': { offsetX: 0, offsetY: 0 },
        'RU-MOS': { offsetX: 0, offsetY: 0 },
        'RU-KLU': { offsetX: 0, offsetY: 0 },
        'RU-VLG': { offsetX: 0, offsetY: 2 }
    };


    function createRegionMarker(region) {
        const bbox = region.getBBox();
        let centerX = bbox.x + bbox.width / 2;
        let centerY = bbox.y + bbox.height / 2;

        const customOffset = markerPositions[region.id];
        if (customOffset) {
            centerX += customOffset.offsetX;
            centerY += customOffset.offsetY;
        }

        const markerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        markerGroup.setAttribute(
            'transform',
            `translate(${centerX - 12}, ${centerY - 10})`
        );
        markerGroup.setAttribute('class', 'region-marker');
        markerGroup.setAttribute('data-region', region.id);

        markerGroup.style.pointerEvents = 'none';

        const filterGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        filterGroup.setAttribute('filter', 'url(#filter0_d_2238_3759)');

        const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        innerCircle.setAttribute('cx', '12');
        innerCircle.setAttribute('cy', '10');
        innerCircle.setAttribute('r', '4');
        innerCircle.setAttribute('fill', '#2D2421');

        const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        outerCircle.setAttribute('cx', '12');
        outerCircle.setAttribute('cy', '10');
        outerCircle.setAttribute('r', '5');
        outerCircle.setAttribute('stroke', 'white');
        outerCircle.setAttribute('stroke-opacity', '0.4');
        outerCircle.setAttribute('stroke-width', '2');
        outerCircle.setAttribute('fill', 'none');

        filterGroup.appendChild(innerCircle);
        filterGroup.appendChild(outerCircle);
        markerGroup.appendChild(filterGroup);

        return markerGroup;
    }


    svg.querySelectorAll('.region-marker').forEach(marker => marker.remove());


    regions.forEach(region => {
        if (activeRegions.includes(region.id)) {
            region.setAttribute('fill', '#5e524e');
            region.setAttribute('stroke', '#e2dad2');
            region.setAttribute('stroke-width', '1');
            region.style.cursor = 'pointer';
            region.setAttribute('pointer-events', 'auto');


            const marker = createRegionMarker(region);
            svg.appendChild(marker);
            region.style.transition = 'fill 0.3s, filter 0.3s';
            region.addEventListener('mouseenter', (e) => {
                region.setAttribute('fill', '#F58732');
                region.setAttribute('opacity', '0.8');
                region.style.setProperty('box-shadow', '1px 2px 3px 0px #AD5A1B inset, -1px -1px 8px 0px #FFFFFF1F inset');


                const markerCircle = marker.querySelector('circle[fill]');
                if (markerCircle) {
                    markerCircle.setAttribute('fill', '#F58732');
                }


                if (tooltip) {
                    const regionData = regionNames[region.id];
                    tooltip.innerHTML = `
                      <div class="tooltip-content">
                          <div class="tooltip-content__wrapper">
                              <img src="${regionData.photo}" alt="${regionData.name}" class="tooltip-content__photo" />
                              <div class="tooltip-content__logo">
                                  <img src="${regionData.logo}" alt="${regionData.name}" />
                              </div>
                          </div>
                          <div class="tooltip-text">
                              <p class="tooltip-text__factory">${regionData.factory}</p>
                              <div>
                                  <p class="tooltip-text__city">г. ${regionData.city}</p>
                                  <p class="tooltip-text__name">${regionData.name}</p>
                              </div>
                          </div>
                      </div>
                  `;
                    tooltip.style.display = 'block';

                    const bbox = region.getBBox();
                    const svgRect = svg.getBoundingClientRect();
                    const viewBox = svg.viewBox.baseVal;
                    const scaleX = svgRect.width / viewBox.width;
                    const scaleY = svgRect.height / viewBox.height;
                    const centerXSVG = bbox.x + bbox.width / 2;
                    const centerYSVG = bbox.y;
                    const centerXPage = (centerXSVG - viewBox.x) * scaleX;
                    const centerYPage = (centerYSVG - viewBox.y) * scaleY;
                    const tooltipHeight = tooltip.offsetHeight;
                    const screenWidth = window.innerWidth;


                    if (screenWidth < 430) {
                        tooltip.style.left = '50%';
                        tooltip.style.transform = 'translateX(-50%)';
                    } else {
                        tooltip.style.left = centerXPage - 50 + 'px';
                        tooltip.style.transform = 'none';
                    }


                    tooltip.style.top = (centerYPage - tooltipHeight) + 'px';
                }
            });
            region.addEventListener('mouseleave', () => {
                region.setAttribute('fill', '#5e524e');
                region.setAttribute('stroke', '#e2dad2');
                region.removeAttribute('opacity');
                region.style.removeProperty('box-shadow');


                const markerCircle = marker.querySelector('circle[fill]');
                if (markerCircle) {
                    markerCircle.setAttribute('fill', '#2D2421');
                }


                if (regsDiv) {
                    regsDiv.textContent = '';
                }
                if (tooltip) {
                    tooltip.style.display = 'none';
                }
            });


        } else {
            region.setAttribute('fill', '#cfc3b7');
            region.setAttribute('stroke', '#e2dad2');
            region.setAttribute('stroke-width', '2');
            region.style.cursor = 'default';
            region.setAttribute('pointer-events', 'none');
        }
    });


    document.querySelectorAll('svg path').forEach(p => {
        p.setAttribute('filter', 'url(#filter0_g_2238_3749)');
    });


    window.filterMapBySearch = function (searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            regions.forEach(regionElement => {
                const regionId = regionElement.id;
                if (activeRegions.includes(regionId)) {
                    regionElement.setAttribute('fill', '#5e524e');
                    regionElement.setAttribute('stroke', '#e2dad2');
                    regionElement.setAttribute('stroke-width', '1');
                    regionElement.style.cursor = 'pointer';
                    regionElement.setAttribute('pointer-events', 'auto');
                    regionElement.style.opacity = '1';


                    const marker = svg.querySelector(`.region-marker[data-region="${regionId}"]`);
                    if (marker) {
                        marker.style.display = 'block';
                    }
                }
            });
            return;
        }


        const search = searchTerm.toLowerCase().trim();


        regions.forEach(regionElement => {
            const regionId = regionElement.id;
            const regionData = regionNames[regionId];


            if (!regionData || !activeRegions.includes(regionId)) {
                return;
            }

            const factoryName = regionData.factory.toLowerCase();
            const shouldShow = factoryName.includes(search);
            const marker = svg.querySelector(`.region-marker[data-region="${regionId}"]`);


            if (shouldShow) {
                regionElement.setAttribute('fill', '#5e524e');
                regionElement.setAttribute('stroke', '#e2dad2');
                regionElement.setAttribute('stroke-width', '1');
                regionElement.style.cursor = 'pointer';
                regionElement.setAttribute('pointer-events', 'auto');
                regionElement.style.opacity = '1';


                if (marker) {
                    marker.style.display = 'block';
                }
            } else {
                regionElement.setAttribute('fill', '#cfc3b7');
                regionElement.setAttribute('stroke', '#e2dad2');
                regionElement.setAttribute('stroke-width', '2');
                regionElement.style.cursor = 'default';
                regionElement.setAttribute('pointer-events', 'none');
                regionElement.style.opacity = '0.5';


                if (marker) {
                    marker.style.display = 'none';
                }
            }
        });
    };


    window.filterMapRegions = function (filters) {
        const { year, type, region } = filters;


        regions.forEach(regionElement => {
            const regionId = regionElement.id;
            const regionData = regionNames[regionId];


            if (!regionData || !activeRegions.includes(regionId)) {
                return;
            }


            let shouldShow = true;


            if (year && year !== 'all-years') {
                shouldShow = shouldShow && regionData.year === year;
            }

            if (type && type !== 'all-types') {
                shouldShow = shouldShow && regionData.type === type;
            }

            if (region && region !== 'all-regions') {
                shouldShow = shouldShow && regionId === region;
            }


            const marker = svg.querySelector(`.region-marker[data-region="${regionId}"]`);


            if (shouldShow) {
                regionElement.setAttribute('fill', '#5e524e');
                regionElement.setAttribute('stroke', '#e2dad2');
                regionElement.setAttribute('stroke-width', '1');
                regionElement.style.cursor = 'pointer';
                regionElement.setAttribute('pointer-events', 'auto');
                regionElement.style.opacity = '1';


                if (marker) {
                    marker.style.display = 'block';
                }
            } else {
                regionElement.setAttribute('fill', '#cfc3b7');
                regionElement.setAttribute('stroke', '#e2dad2');
                regionElement.setAttribute('stroke-width', '2');
                regionElement.style.cursor = 'default';
                regionElement.setAttribute('pointer-events', 'none');
                regionElement.style.opacity = '0.5';


                if (marker) {
                    marker.style.display = 'none';
                }
            }
        });
    };

    window.filterMapCombined = function (filters, searchTerm = '') {
        const { year, type, region } = filters;
        const search = searchTerm.toLowerCase().trim();


        regions.forEach(regionElement => {
            const regionId = regionElement.id;
            const regionData = regionNames[regionId];


            if (!regionData || !activeRegions.includes(regionId)) {
                return;
            }


            let shouldShow = true;

            if (search) {
                const factoryName = regionData.factory.toLowerCase();
                shouldShow = shouldShow && factoryName.includes(search);
            }


            if (shouldShow) {
                if (year && year !== 'all-years') {
                    shouldShow = shouldShow && regionData.year === year;
                }

                if (type && type !== 'all-types') {
                    shouldShow = shouldShow && regionData.type === type;
                }

                if (region && region !== 'all-regions') {
                    shouldShow = shouldShow && regionId === region;
                }
            }


            const marker = svg.querySelector(`.region-marker[data-region="${regionId}"]`);


            if (shouldShow) {
                regionElement.setAttribute('fill', '#5e524e');
                regionElement.setAttribute('stroke', '#e2dad2');
                regionElement.setAttribute('stroke-width', '1');
                regionElement.style.cursor = 'pointer';
                regionElement.setAttribute('pointer-events', 'auto');
                regionElement.style.opacity = '1';


                if (marker) {
                    marker.style.display = 'block';
                }
            } else {
                regionElement.setAttribute('fill', '#cfc3b7');
                regionElement.setAttribute('stroke', '#e2dad2');
                regionElement.setAttribute('stroke-width', '2');
                regionElement.style.cursor = 'default';
                regionElement.setAttribute('pointer-events', 'none');
                regionElement.style.opacity = '0.5';


                if (marker) {
                    marker.style.display = 'none';
                }
            }
        });
    };
});
