/**
 * Back to Top Button Module
 * Handles the back to top functionality
 */

class BackToTop {
    constructor() {
        this.button = document.getElementById('back-to-top');
        this.init();
    }

    init() {
        if (this.button) {
            this.setupScrollListener();
            this.setupClickHandler();
        }
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.button.style.opacity = '1';
                this.button.style.pointerEvents = 'auto';
            } else {
                this.button.style.opacity = '0';
                this.button.style.pointerEvents = 'none';
            }
        });
    }

    setupClickHandler() {
        // Smooth scroll to top
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize back to top when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BackToTop();
});

export default BackToTop;
