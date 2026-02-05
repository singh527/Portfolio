// Custom Cursor Animation
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.followerX = 0;
        this.followerY = 0;

        this.init();
    }

    init() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Animate cursor
        this.animate();

        // Add hover effects
        this.addHoverEffects();

        // Add click effects
        this.addClickEffects();
    }

    animate() {
        // Smoother cursor following with better interpolation
        const smoothingFactor = 0.25; // Increased for smoother movement
        const followerSmoothing = 0.12; // Slower follower for better trail effect

        this.cursorX += (this.mouseX - this.cursorX) * smoothingFactor;
        this.cursorY += (this.mouseY - this.cursorY) * smoothingFactor;

        this.followerX += (this.mouseX - this.followerX) * followerSmoothing;
        this.followerY += (this.mouseY - this.followerY) * followerSmoothing;

        // Use transform3d for hardware acceleration
        this.cursor.style.transform = `translate3d(${this.cursorX}px, ${this.cursorY}px, 0)`;
        this.follower.style.transform = `translate3d(${this.followerX}px, ${this.followerY}px, 0)`;

        requestAnimationFrame(() => this.animate());
    }

    addHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .project-card, .tech-item');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.follower.style.transform = `translate3d(${this.followerX}px, ${this.followerY}px, 0) scale(1.8)`;
            });

            el.addEventListener('mouseleave', () => {
                this.follower.style.transform = `translate3d(${this.followerX}px, ${this.followerY}px, 0) scale(1)`;
            });
        });
    }

    addClickEffects() {
        document.addEventListener('click', (e) => {
            // Create particle effect on click
            this.createParticles(e.clientX, e.clientY);
        });
    }

    createParticles(x, y) {
        const colors = ['#00F7FF', '#FF10F0', '#7C3AED'];
        const particleCount = 8;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9998';
            particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;

            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            let posX = 0;
            let posY = 0;
            let opacity = 1;
            let frame = 0;
            const maxFrames = 60; // Smoother animation over 60 frames

            const animateParticle = () => {
                frame++;
                const progress = frame / maxFrames;
                const easing = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

                posX += vx * 0.015 * (1 - easing);
                posY += vy * 0.015 * (1 - easing);
                opacity = 1 - easing;

                particle.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
                particle.style.opacity = opacity;

                if (frame < maxFrames) {
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            };

            animateParticle();
        }
    }
}

// Initialize cursor when DOM is loaded
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', () => {
        new CustomCursor();
    });
}
