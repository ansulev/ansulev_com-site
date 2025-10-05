/**
 * Cookie Banner Module
 * Handles cookie consent banner, modal, and preference management
 */

class CookieManager {
    constructor() {
        this.banner = document.getElementById('cookie-banner');
        this.modal = document.getElementById('cookie-modal');
        this.cookieAccept = document.getElementById('cookie-accept');
        this.cookieReject = document.getElementById('cookie-reject');
        this.cookieSettings = document.getElementById('cookie-settings');
        this.modalClose = document.getElementById('cookie-modal-close');
        this.savePreferences = document.getElementById('save-preferences');
        this.acceptAllModal = document.getElementById('accept-all-modal');
        this.analyticsToggle = document.getElementById('analytics-toggle');
        this.marketingToggle = document.getElementById('marketing-toggle');

        this.init();
    }

    init() {
        this.checkExistingConsent();
        this.setupEventListeners();
    }

    checkExistingConsent() {
        // Check if user has already made a choice
        const cookieConsent = localStorage.getItem('cookieConsent');
        
        if (!cookieConsent) {
            this.banner?.classList.remove('hidden');
        } else {
            // Load saved preferences
            const preferences = JSON.parse(cookieConsent);
            this.loadCookiePreferences(preferences);
        }
    }

    setupEventListeners() {
        // Accept all cookies
        this.cookieAccept?.addEventListener('click', () => {
            const preferences = {
                essential: true,
                analytics: true,
                marketing: true
            };
            this.saveCookiePreferences(preferences);
            this.banner?.classList.add('hidden');
        });

        // Reject non-essential cookies
        this.cookieReject?.addEventListener('click', () => {
            const preferences = {
                essential: true,
                analytics: false,
                marketing: false
            };
            this.saveCookiePreferences(preferences);
            this.banner?.classList.add('hidden');
        });

        // Open settings modal
        this.cookieSettings?.addEventListener('click', () => {
            this.banner?.classList.add('hidden');
            this.modal?.classList.remove('hidden');
        });

        // Close modal
        this.modalClose?.addEventListener('click', () => {
            this.modal?.classList.add('hidden');
        });

        // Save custom preferences
        this.savePreferences?.addEventListener('click', () => {
            const preferences = {
                essential: true,
                analytics: this.analyticsToggle?.checked || false,
                marketing: this.marketingToggle?.checked || false
            };
            this.saveCookiePreferences(preferences);
            this.modal?.classList.add('hidden');
        });

        // Accept all from modal
        this.acceptAllModal?.addEventListener('click', () => {
            const preferences = {
                essential: true,
                analytics: true,
                marketing: true
            };
            this.saveCookiePreferences(preferences);
            this.modal?.classList.add('hidden');
        });

        // Close modal when clicking outside
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.classList.add('hidden');
            }
        });
    }

    saveCookiePreferences(preferences) {
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        this.loadCookiePreferences(preferences);
    }

    loadCookiePreferences(preferences) {
        if (preferences.analytics) {
            // Initialize Google Analytics or your analytics tool
            // Example: gtag('consent', 'update', { 'analytics_storage': 'granted' });
            console.log('Analytics cookies enabled');
        }
        
        if (preferences.marketing) {
            // Initialize marketing cookies
            console.log('Marketing cookies enabled');
        }
    }
}

// Initialize cookie manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CookieManager();
});

export default CookieManager;
