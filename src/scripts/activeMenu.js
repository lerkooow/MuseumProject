document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    const menuLinks = document.querySelectorAll(
        '.menu__nav .nav__link, .menu__nav--mobile .nav__link'
    );

    menuLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (href === currentPage) {
            link.classList.add('nav__link--active');
        }
    });
});