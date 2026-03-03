/**
 * Theme & Animation Logic
 */
document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle Logic --- */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');

    // Check initial preference from localStorage or system theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'ri-sun-line';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'ri-moon-line';
    }

    // Toggle event listener
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';

        if (currentTheme === 'light') {
            newTheme = 'dark';
            themeIcon.className = 'ri-sun-line';
        } else {
            newTheme = 'light';
            themeIcon.className = 'ri-moon-line';
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /* --- Fade-In Animation Observer --- */
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('visible');
                observer.unobserve(el);

                // Cleanup delays so hover states and other transforms aren't hindered post-animation
                setTimeout(() => {
                    el.style.transitionDelay = '0s';
                }, 800);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        sectionObserver.observe(el);
    });

    // Remove delay for the initial top elements immediately on load
    setTimeout(() => {
        const initialElements = document.querySelectorAll('.hero-section, .top-nav');
        initialElements.forEach(el => el.classList.add('visible'));
    }, 50);
});
