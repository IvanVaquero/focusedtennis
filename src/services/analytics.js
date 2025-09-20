// Google Analytics Service
import { ANALYTICS_CONFIG } from '../config/analytics'

class AnalyticsService {
  constructor() {
    this.measurementId = ANALYTICS_CONFIG.MEASUREMENT_ID
    this.enabled = ANALYTICS_CONFIG.ENABLED
    this.isInitialized = false
    this.initialize()
  }

  initialize() {
    if (!this.enabled) {
      console.log('Analytics disabled in development mode')
      return
    }

    if (typeof window !== 'undefined' && window.gtag) {
      this.isInitialized = true
      if (ANALYTICS_CONFIG.DEBUG) {
        console.log('Google Analytics initialized with ID:', this.measurementId)
      }
    } else {
      console.warn('Google Analytics not loaded')
    }
  }

  // Track page views
  trackPageView(pageData) {
    if (!this.isInitialized || !this.enabled) return

    if (ANALYTICS_CONFIG.DEBUG) {
      console.log('Analytics Page View:', pageData)
    }

    window.gtag('config', this.measurementId, {
      page_title: pageData.page_title,
      page_location: pageData.page_location,
      page_path: pageData.page_path || window.location.pathname
    })
  }

  // Track custom events
  trackEvent(event) {
    if (!this.isInitialized || !this.enabled) return

    if (ANALYTICS_CONFIG.DEBUG) {
      console.log('Analytics Event:', event)
    }

    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value
    })
  }

  // Track form submissions
  trackFormSubmission(formName, success = true) {
    this.trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'form',
      label: formName
    })
  }

  // Track waitlist signups
  trackWaitlistSignup(step) {
    this.trackEvent({
      action: 'waitlist_signup',
      category: 'engagement',
      label: step
    })
  }

  // Track language changes
  trackLanguageChange(language) {
    this.trackEvent({
      action: 'language_change',
      category: 'user_preference',
      label: language
    })
  }

  // Track button clicks
  trackButtonClick(buttonName, location) {
    this.trackEvent({
      action: 'button_click',
      category: 'interaction',
      label: `${buttonName}_${location}`
    })
  }

  // Track section views (for scroll tracking)
  trackSectionView(sectionName) {
    this.trackEvent({
      action: 'section_view',
      category: 'engagement',
      label: sectionName
    })
  }

  // Track admin login attempts
  trackAdminLogin(success) {
    this.trackEvent({
      action: success ? 'admin_login_success' : 'admin_login_failed',
      category: 'admin',
      label: 'admin_panel'
    })
  }

  // Track cookie consent
  trackCookieConsent(accepted, preferences) {
    this.trackEvent({
      action: 'cookie_consent',
      category: 'privacy',
      label: accepted ? 'accepted' : 'rejected',
      value: preferences ? preferences.length : 0
    })
  }
}

// Create singleton instance
export const analytics = new AnalyticsService()

// Declare gtag function for global access
if (typeof window !== 'undefined') {
  window.gtag = window.gtag || function() {
    (window.gtag.q = window.gtag.q || []).push(arguments)
  }
}
