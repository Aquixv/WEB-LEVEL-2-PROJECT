if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1500,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false
    });


    sr.reveal('.hero-text-content', { delay: 300, origin: 'left' });
    sr.reveal('.program-section', { delay: 500, origin: 'bottom' });
    sr.reveal('call-to-action-mid', { delay: 500, origin: 'bottom' });

    sr.reveal('impact-inner', { delay: 500, origin: 'bottom' });

    sr.reveal('.hero-image-container', { delay: 600, origin: 'right', distance: '100px' });

    sr.reveal('.hero-buttons', { delay: 800, interval: 200 });
}