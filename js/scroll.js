// Scroll Reveal Animations using Intersection Observer
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        // Create intersection observer
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class
                    entry.target.classList.add('aos-animate');

                    // Optional: unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with data-aos attribute
        this.animatedElements.forEach(el => {
            observer.observe(el);
        });

        // Add parallax effect to sections
        this.addParallaxEffect();
    }

    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.section');

            parallaxElements.forEach((el, index) => {
                const speed = 0.5;
                const yPos = -(scrolled * speed * (index % 2 === 0 ? 1 : -1));
                el.style.transform = `translateY(${yPos * 0.1}px)`;
            });
        });
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    initSmoothScroll();
});
