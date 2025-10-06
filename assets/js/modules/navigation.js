/**
 * Navigation Module
 * Handles mobile menu, scroll behavior, and navigation interactions
 */

class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollBehavior();
        this.setupSmoothScroll();
        this.setupIntersectionObserver();
        this.setupParallaxEffect();
        this.setupNavbarScrollHide();
        this.setupDynamicCursor();
        this.setupPageTransitions();
        this.setupBackToTop();
        this.setupCopyLink();
    }

    setupMobileMenu() {
        const mobileMenuButton = document.querySelector('[data-mobile-menu-toggle]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.contains('hidden');
                mobileMenu.classList.toggle('hidden', !isHidden);
                
                // Update button icon with smooth transition
                const icon = mobileMenuButton.querySelector('svg');
                icon.style.transform = 'rotate(90deg)';
                setTimeout(() => {
                    if (isHidden) {
                        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
                    } else {
                        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
                    }
                    icon.style.transform = 'rotate(0deg)';
                }, 150);
            });
        }
    }

    setupScrollBehavior() {
        // Navbar background change on scroll
        const navbar = document.querySelector('nav');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('backdrop-blur-md', 'bg-blue-900', 'shadow-lg');
                navbar.classList.remove('bg-white');
            } else {
                navbar.classList.remove('backdrop-blur-md', 'bg-blue-900', 'shadow-lg');
                navbar.classList.add('bg-slate-900');
            }
            
            // Hide/show navbar on scroll
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollY = window.scrollY;
        });
    }

    setupSmoothScroll() {
        // Smooth scroll for anchor links
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

    setupIntersectionObserver() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);
        
        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    setupParallaxEffect() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            const speed = 0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    setupNavbarScrollHide() {
        // Hide navbar on scroll down (legacy support)
        let lastScrollY = window.scrollY;
        const nav = document.querySelector('.nav-scroll');

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // User scrolling down
                nav?.classList.add('hidden');
            } else {
                // User scrolling up
                nav?.classList.remove('hidden');
            }

            lastScrollY = currentScrollY;
        });
    }

    setupDynamicCursor() {
        // Dynamic cursor effect (only on desktop)
        if (window.innerWidth > 768) {
            const cursor = document.createElement('div');
            cursor.classList.add('fixed', 'w-4', 'h-4', 'bg-primary-500/30', 'rounded-full', 'pointer-events-none', 'z-50', 'transition-transform', 'duration-150', 'ease-out');
            cursor.style.mixBlendMode = 'difference';
            document.body.appendChild(cursor);
            
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX - 8 + 'px';
                cursor.style.top = e.clientY - 8 + 'px';
            });
            
            document.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(2)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                });
            });
        }
    }

    setupPageTransitions() {
        // Loading animation for page transitions
        const pageLinks = document.querySelectorAll('a[href^="/"]');
        pageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.hostname === window.location.hostname) {
                    document.body.style.opacity = '0';
                    setTimeout(() => {
                        window.location.href = this.href;
                    }, 200);
                }
            });
        });
    }

    setupBackToTop() {
        // Back to top button functionality
        const backToTopBtn = document.getElementById('back-to-top');

        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupCopyLink() {
        // Copy link functionality
        document.querySelectorAll('[data-copy-link]').forEach(btn => {
            btn.addEventListener('click', function() {
                const link = this.getAttribute('data-copy-link');
                navigator.clipboard.writeText(link).then(() => {
                    // Optional: Show feedback
                    console.log('Link copied to clipboard');
                }).catch(err => {
                    console.error('Failed to copy link: ', err);
                });
            });
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
