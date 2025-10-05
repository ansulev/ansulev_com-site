/**
 * Analytics Module
 * Handles Google Analytics and other tracking scripts
 */

class Analytics {
    constructor(config = {}) {
        this.gaId = config.gaId || '';
        this.init();
    }

    init() {
        if (this.gaId) {
            this.loadGoogleAnalytics();
        }
        
        // Page load animation
        this.setupPageLoadAnimation();
    }

    loadGoogleAnalytics() {
        // Load Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', this.gaId);
        
        // Make gtag globally available
        window.gtag = gtag;
    }

    setupPageLoadAnimation() {
        // Page load animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.3s ease-in';
        });
    }

    // Method to update consent (for cookie integration)
    updateConsent(preferences) {
        if (window.gtag && this.gaId) {
            window.gtag('consent', 'update', {
                'analytics_storage': preferences.analytics ? 'granted' : 'denied',
                'ad_storage': preferences.marketing ? 'granted' : 'denied'
            });
        }
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get GA ID from Hugo template if available
    const gaId = document.querySelector('meta[name="ga-id"]')?.getAttribute('content');
    if (gaId) {
        new Analytics({ gaId });
    }
});

export default Analytics;
