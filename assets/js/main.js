/**
 * Main JavaScript Entry Point
 * Imports and initializes all modules
 */

// Import modules
import Navigation from './modules/navigation.js';
import CookieManager from './modules/cookies.js';
import Analytics from './modules/analytics.js';
import BackToTop from './modules/back-to-top.js';

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // All modules are self-initializing
    console.log('🚀 All JavaScript modules loaded successfully');
});

// Export modules for potential external use
export { Navigation, CookieManager, Analytics, BackToTop };
  